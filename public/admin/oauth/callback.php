<?php
/**
 * Recebe o retorno do GitHub, troca o codigo pelo token e autentica o painel.
 *
 * Estrategia principal: grava o usuario direto no localStorage do painel
 * (mesma origem) e recarrega — metodo testado e confiavel.
 * Fallback: protocolo de postMessage do Decap.
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

  function mostrar(titulo, texto) {
    document.getElementById('titulo').textContent = titulo;
    document.getElementById('msg').textContent = texto;
  }

  // 1) METODO PRINCIPAL: grava o login direto no painel (mesma origem) e recarrega
  if (token && window.opener) {
    try {
      var usuario = JSON.stringify({ token: token, backendName: 'github' });
      window.opener.localStorage.setItem('decap-cms-user', usuario);
      mostrar('✅ Autorizado com sucesso!', 'Abrindo o painel…');
      try { window.opener.location.replace('/cms'); } catch (e) { window.opener.location.reload(); }
      setTimeout(function () { window.close(); }, 800);
      return;
    } catch (e) {
      // segue para o fallback
    }
  }

  // 2) FALLBACK: protocolo de postMessage do Decap
  var mensagem = token
    ? 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider })
    : 'authorization:' + provider + ':error:' + JSON.stringify({ message: detalhe || 'erro desconhecido' });

  function enviar() {
    if (!window.opener) return;
    try { window.opener.postMessage(mensagem, '*'); } catch (e) {}
  }
  enviar();
  window.addEventListener('message', function () { enviar(); }, false);
  var n = 0;
  var t = setInterval(function () { enviar(); if (++n >= 6) clearInterval(t); }, 700);

  mostrar(token ? '✅ Autorizado com sucesso!' : '❌ Não autorizado', token ? 'Pode fechar esta janela.' : ('Detalhe: ' + detalhe));
})();
</script>
</body>
</html>
