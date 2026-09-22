<?php
/**
 * Endpoint de captura de newsletter (Hostinger).
 * - SEMPRE salva o contato em um CSV no servidor (fora do public_html).
 * - Em paralelo, tenta cadastrar no provedor configurado (Brevo ou MailerLite).
 *
 * Configuracao: public/_newsletter-config.php (nao versionado), ex.:
 *   return ['provider' => 'mailerlite', 'api_key' => '...', 'list_id' => '123456'];
 *   return ['provider' => 'brevo',      'api_key' => 'xkeysib-...', 'list_id' => 2];
 *
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

// 2) Tenta cadastrar no provedor (melhor esforco)
$config = @include __DIR__ . '/_newsletter-config.php';
if (!is_array($config)) {
    // compatibilidade com o arquivo antigo
    $antigo = @include __DIR__ . '/_brevo-key.php';
    if (is_array($antigo)) {
        $config = ['provider' => 'brevo', 'api_key' => $antigo['api_key'] ?? '', 'list_id' => $antigo['list_id'] ?? 0];
    }
}

$provedorOk = false;
$provedorStatus = null;
$provider = is_array($config) ? ($config['provider'] ?? 'brevo') : '';
$apiKey = is_array($config) ? ($config['api_key'] ?? '') : '';
$listId = is_array($config) ? ($config['list_id'] ?? '') : '';

if ($apiKey) {
    if ($provider === 'mailerlite') {
        $url = 'https://connect.mailerlite.com/api/subscribers';
        $payload = ['email' => $email];
        if ($listId !== '' && $listId !== null) {
            $payload['groups'] = [(string) $listId];
        }
        $headers = [
            'accept: application/json',
            'content-type: application/json',
            'authorization: Bearer ' . $apiKey,
        ];
    } else {
        $url = 'https://api.brevo.com/v3/contacts';
        $payload = [
            'email' => $email,
            'listIds' => [(int) $listId],
            'updateEnabled' => true,
        ];
        $headers = [
            'accept: application/json',
            'content-type: application/json',
            'api-key: ' . $apiKey,
        ];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 20,
    ]);
    curl_exec($ch);
    $provedorStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $provedorOk = ($provedorStatus >= 200 && $provedorStatus < 300);
}

if ($salvoLocal || $provedorOk) {
    echo json_encode(['ok' => true, 'local' => $salvoLocal, 'provedor' => $provedorOk, 'status' => $provedorStatus]);
    exit;
}

http_response_code(502);
echo json_encode(['ok' => false, 'erro' => 'falha ao salvar']);
