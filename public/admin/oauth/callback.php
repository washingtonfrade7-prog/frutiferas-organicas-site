<?php
/**
 * Recebe o retorno do GitHub, troca o codigo pelo token e devolve ao painel
 * (protocolo do Decap CMS). Envia o token imediatamente e mostra o status na tela.
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
<h3 id="titulo">Processando…</h3>
<p id="msg"></p>
<script>
(function () {
  var token = <?php echo json_encode($token); ?>;
  var detalhe = <?php echo json_encode($detalhe); ?>;
  var provider = 'github';

  var sucesso = 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider });
  var falha = 'authorization:' + provider + ':error:' + JSON.stringify({ message: detalhe || 'erro desconhecido' });
  var mensagem = token ? sucesso : falha;

  function enviar() {
    if (!window.opener) return false;
    try { window.opener.postMessage(mensagem, '*'); } catch (e) {}
    return true;
  }

  // 1) envia imediatamente
  enviar();
  // 2) e responde ao handshake do painel
  window.addEventListener('message', function () { enviar(); }, false);
  // 3) e reenvia algumas vezes por seguranca
  var tentativas = 0;
  var timer = setInterval(function () {
    enviar();
    if (++tentativas >= 6) clearInterval(timer);
  }, 700);

  document.getElementById('titulo').textContent = token ? '✅ Autorizado com sucesso!' : '❌ Não autorizado';
  document.getElementById('msg').textContent = token
    ? 'Pode fechar esta janela — o painel já deve estar aberto.'
    : ('Detalhe: ' + (detalhe || 'erro desconhecido'));

  if (window.opener && token) {
    setTimeout(function () { window.close(); }, 1500);
  }
})();
</script>
</body>
</html>
