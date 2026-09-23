<?php
/**
 * Recebe o retorno do GitHub, troca o codigo pelo token e devolve ao painel
 * (protocolo do Decap CMS). Mostra o resultado na tela para facilitar o diagnostico.
 */
$config = @include dirname(__DIR__) . '/_oauth-config.php';
$code = isset($_GET['code']) ? $_GET['code'] : '';
$erroGithub = isset($_GET['error']) ? $_GET['error'] : '';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'frutiferasorganicas.com.br';
$redirect = 'https://' . $host . '/admin/oauth/callback';

$token = '';
$detalhe = '';

if ($erroGithub !== '') {
    $detalhe = 'O GitHub recusou o acesso: ' . $erroGithub;
} elseif (!is_array($config) || empty($config['client_id']) || strpos($config['client_id'], 'COLE_') === 0) {
    $detalhe = 'OAuth nao configurado (public/admin/_oauth-config.php).';
} elseif ($code === '') {
    $detalhe = 'Codigo de autorizacao ausente na URL.';
} else {
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
    if (is_array($resp) && !empty($resp['access_token'])) {
        $token = $resp['access_token'];
    } else {
        $detalhe = 'Falha ao obter o token: ' . substr(json_encode($resp), 0, 200);
    }
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8" /><title>Autorizando...</title></head>
<body style="font-family:Arial;padding:30px">
<p id="msg">Autorizando…</p>
<script>
(function () {
  var token = <?php echo json_encode($token); ?>;
  var detalhe = <?php echo json_encode($detalhe); ?>;
  var provider = 'github';

  function responder(e) {
    if (!window.opener) return;
    if (token) {
      window.opener.postMessage(
        'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider }),
        (e && e.origin) ? e.origin : '*'
      );
    } else {
      window.opener.postMessage(
        'authorization:' + provider + ':error:' + JSON.stringify({ message: detalhe || 'erro desconhecido' }),
        (e && e.origin) ? e.origin : '*'
      );
    }
  }

  window.addEventListener('message', responder, false);

  if (window.opener) {
    window.opener.postMessage('authorizing:' + provider, '*');
    document.getElementById('msg').textContent = 'Autorizado! Pode fechar esta janela.';
  } else {
    document.getElementById('msg').textContent =
      token ? 'Autorizado! Volte para a aba do painel (/cms).' : ('Erro: ' + detalhe);
  }
})();
</script>
</body>
</html>
