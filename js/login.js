const formularioLogin = document.getElementById("form-login");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const paragrafoResultado = document.getElementById("mensagem-resultado");

function validarCampoEmail() {
  return exibirValidacao(campoEmail, validarFormatoEmail(campoEmail.value));
}

function validarCampoSenha() {
  let mensagem = "";
  if (campoSenha.value === "") {
    mensagem = "Informe a senha.";
  }
  return exibirValidacao(campoSenha, mensagem);
}

function validarFormularioLogin() {
  const camposInvalidos = [];
  if (!validarCampoEmail()) {
    camposInvalidos.push(campoEmail);
  }
  if (!validarCampoSenha()) {
    camposInvalidos.push(campoSenha);
  }
  return focarPrimeiroInvalido(camposInvalidos);
}

async function entrar(evento) {
  evento.preventDefault();
  paragrafoResultado.textContent = "";

  if (!validarFormularioLogin()) {
    return;
  }

  const cliente = buscarClientePorEmail(campoEmail.value);
  if (cliente === null) {
    paragrafoResultado.textContent = "E-mail ou senha incorretos.";
    return;
  }

  const hashDigitado = await gerarHashSenha(campoSenha.value, cliente.salt);
  if (hashDigitado !== cliente.hashSenha) {
    paragrafoResultado.textContent = "E-mail ou senha incorretos.";
    return;
  }

  iniciarSessao(cliente.id);
  window.location.href = "perfil.html";
}

campoEmail.addEventListener("input", validarCampoEmail);
campoSenha.addEventListener("input", validarCampoSenha);
formularioLogin.addEventListener("submit", entrar);
