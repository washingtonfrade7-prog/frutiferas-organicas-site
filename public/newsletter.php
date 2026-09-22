<?php
/**
 * Endpoint de captura de newsletter.
 * - SEMPRE salva o contato em um CSV no servidor (fora do public_html), garantindo que
 *   nenhum e-mail se perca enquanto a conta do Brevo estiver suspensa ou sem configuracao.
 * - Em paralelo, tenta cadastrar no Brevo (se _brevo-key.php estiver configurado).
 * Recebe POST JSON { "email": "...", "origem": "..." }.
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'metodo nao permitido']);
    exit;
}

$raw = file_get_contents('php://input');
$dados = json_decode($raw, true);
if (!is_array($dados)) {
    $dados = $_POST;
}

$email = isset($dados['email']) ? trim((string) $dados['email']) : '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'email invalido']);
    exit;
}

$origem = isset($dados['origem']) ? substr(preg_replace('/[^a-zA-Z0-9\-_]/', '', (string) $dados['origem']), 0, 60) : 'site';
if ($origem === '') {
    $origem = 'site';
}

// 1) Salva localmente (arquivo fora do public_html, nao acessivel pela web)
$arquivo = dirname(__DIR__) . '/newsletter-lista.csv';
$salvoLocal = false;
$novo = !file_exists($arquivo);
if ($fp = @fopen($arquivo, 'a')) {
    if (flock($fp, LOCK_EX)) {
        if ($novo) {
            fwrite($fp, "data;email;origem\n");
        }
        fwrite($fp, date('c') . ';' . $email . ';' . $origem . "\n");
        flock($fp, LOCK_UN);
        $salvoLocal = true;
    }
    fclose($fp);
}

// 2) Tenta cadastrar no Brevo (melhor esforco)
$brevoOk = false;
$brevoStatus = null;
$config = @include __DIR__ . '/_brevo-key.php';
if (is_array($config) && !empty($config['api_key'])) {
    $payload = [
        'email' => $email,
        'listIds' => [(int) ($config['list_id'] ?? 0)],
        'updateEnabled' => true,
    ];
    $ch = curl_init('https://api.brevo.com/v3/contacts');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'accept: application/json',
            'content-type: application/json',
            'api-key: ' . $config['api_key'],
        ],
        CURLOPT_TIMEOUT => 20,
    ]);
    curl_exec($ch);
    $brevoStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $brevoOk = ($brevoStatus >= 200 && $brevoStatus < 300);
}

if ($salvoLocal || $brevoOk) {
    echo json_encode(['ok' => true, 'local' => $salvoLocal, 'brevo' => $brevoOk]);
    exit;
}

http_response_code(502);
echo json_encode(['ok' => false, 'erro' => 'falha ao salvar']);
