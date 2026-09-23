<?php
/**
 * Recebe o retorno do GitHub, troca o codigo pelo token e devolve ao painel
 * (protocolo do Decap CMS).
 */
$config = @include dirname(__DIR__) . '/_oauth-config.php';
$code = isset($_GET['code']) ? $_GET['code'] : '';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'frutiferasorganicas.com.br';
$redirect = 'https://' . $host . '/admin/oauth/callback';

$token = '';
if (is_array($config) && !empty($config['client_id']) && $code !== '') {
    $ch = curl_init('https://github.com/login/oauth/access_token');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'client_id' => $config['client_id'],
            'client_secret' => $config['client_secret'],
            'code' => $code,
            'redirect_uri' => $redirect,
        ]),
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
        CURLOPT_TIMEOUT => 20,
    ]);
    $resp = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if (isset($resp['access_token'])) {
        $token = $resp['access_token'];
    }
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Autorizando...</title></head>
<body>
<script>
(function () {
  var token = <?php echo json_encode($token); ?>;
  var provider = 'github';
  function receber(e) {
    if (e.data === 'authorizing:' + provider) {
      window.opener.postMessage(
        'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider }),
        e.origin
      );
      window.removeEventListener('message', receber, false);
    }
  }
  window.addEventListener('message', receber, false);
  if (window.opener) {
    window.opener.postMessage('authorizing:' + provider, '*');
  }
})();
</script>
<p>Autorizando... você pode fechar esta janela.</p>
</body>
</html>
