<?php
/**
 * Inicia o login com o GitHub para o painel (/admin).
 * Requer public/admin/_oauth-config.php com client_id e client_secret.
 */
$config = @include dirname(__DIR__) . '/_oauth-config.php';
if (!is_array($config) || empty($config['client_id']) || strpos($config['client_id'], 'COLE_') === 0) {
    http_response_code(200);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Painel</title></head>'
        . '<body style="font-family:Arial;padding:40px;max-width:600px;margin:auto">'
        . '<h2>Painel ainda não configurado</h2>'
        . '<p>Falta criar o <b>GitHub OAuth App</b> e preencher <code>public/admin/_oauth-config.php</code> '
        . 'com o <b>client_id</b> e o <b>client_secret</b>.</p>'
        . '<p>Veja o passo a passo no arquivo do projeto.</p>'
        . '</body></html>';
    exit;
}

$scope = isset($_GET['scope']) ? $_GET['scope'] : 'repo';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'frutiferasorganicas.com.br';
$redirect = 'https://' . $host . '/admin/oauth/callback';

$state = bin2hex(random_bytes(16));
setcookie('decap_state', $state, [
    'expires' => time() + 600,
    'path' => '/admin/oauth',
    'secure' => true,
    'samesite' => 'Lax',
]);

$url = 'https://github.com/login/oauth/authorize?' . http_build_query([
    'client_id' => $config['client_id'],
    'redirect_uri' => $redirect,
    'scope' => $scope,
    'state' => $state,
]);

header('Location: ' . $url);
