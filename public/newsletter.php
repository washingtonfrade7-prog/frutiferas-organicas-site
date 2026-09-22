<?php
/**
 * Endpoint de captura de newsletter (Hostinger + Brevo).
 * Recebe POST JSON { "email": "...", "origem": "..." } e cadastra o contato no Brevo.
 * A chave da API fica em _brevo-key.php (fora do repositorio).
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

$config = @include __DIR__ . '/_brevo-key.php';
if (!is_array($config) || empty($config['api_key'])) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'integracao nao configurada']);
    exit;
}

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
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code >= 200 && $code < 300) {
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(502);
echo json_encode(['ok' => false, 'erro' => 'brevo', 'status' => $code]);
