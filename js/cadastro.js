const formularioCadastro = document.getElementById("form-cadastro");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoCpf = document.getElementById("cpf");
const campoSenha = document.getElementById("senha");
const campoConfirmacao = document.getElementById("senha2");
const paragrafoForcaSenha = document.getElementById("forca-senha");
const paragrafoResultado = document.getElementById("mensagem-resultado");

function validarCampoNome() {
  return exibirValidacao(campoNome, validarNome(campoNome.value));
}

function validarCampoEmail() {
  let mensagem = validarFormatoEmail(campoEmail.value);
  if (mensagem === "" && emailJaCadastrado(campoEmail.value, "")) {
    mensagem = "Este e-mail já está cadastrado.";
  }
  return exibirValidacao(campoEmail, mensagem);
}

function validarCampoTelefone() {
  return exibirValidacao(campoTelefone, validarTelefone(campoTelefone.value));
}

function validarCampoCpf() {
  let mensagem = validarCpf(campoCpf.value);
  if (mensagem === "" && cpfJaCadastrado(campoCpf.value, "")) {
    mensagem = "Este CPF já está cadastrado.";
  }
  return exibirValidacao(campoCpf, mensagem);
}

function validarCampoSenha() {
  return exibirValidacao(campoSenha, validarSenha(campoSenha.value));
}

function validarCampoConfirmacao() {
  return exibirValidacao(campoConfirmacao, validarConfirmacaoSenha(campoSenha.value, campoConfirmacao.value));
}

function validarFormularioCadastro() {
  const camposInvalidos = [];
  if (!validarCampoNome()) {
    camposInvalidos.push(campoNome);
  }
  if (!validarCampoEmail()) {
    camposInvalidos.push(campoEmail);
  }
  if (!validarCampoTelefone()) {
    camposInvalidos.push(campoTelefone);
  }
  if (!validarCampoCpf()) {
    camposInvalidos.push(campoCpf);
  }
  if (!validarCampoSenha()) {
    camposInvalidos.push(campoSenha);
  }
  if (!validarCampoConfirmacao()) {
    camposInvalidos.push(campoConfirmacao);
  }
  return focarPrimeiroInvalido(camposInvalidos);
}

function aplicarMascaraCpf() {
  campoCpf.value = formatarCpf(campoCpf.value);
}

function atualizarForcaSenha() {
  mostrarForcaSenha(paragrafoForcaSenha, campoSenha.value);
}

async function cadastrarCliente(evento) {
  evento.preventDefault();

  if (!validarFormularioCadastro()) {
    return;
  }

  const salt = gerarSalt();
  const hashSenha = await gerarHashSenha(campoSenha.value, salt);

  const novoCliente = {
    id: gerarIdCliente(),
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim().toLowerCase(),
    telefone: campoTelefone.value.trim(),
    cpf: somenteDigitos(campoCpf.value),
    salt: salt,
    hashSenha: hashSenha
  };

  if (!adicionarCliente(novoCliente)) {
    paragrafoResultado.textContent = "Não foi possível salvar. Tente novamente.";
    return;
  }

  iniciarSessao(novoCliente.id);
  window.location.href = "perfil.html";
}

campoNome.addEventListener("input", validarCampoNome);
campoEmail.addEventListener("input", validarCampoEmail);
campoTelefone.addEventListener("input", validarCampoTelefone);
campoCpf.addEventListener("input", aplicarMascaraCpf);
campoCpf.addEventListener("input", validarCampoCpf);
campoSenha.addEventListener("input", atualizarForcaSenha);
campoSenha.addEventListener("input", validarCampoSenha);
campoConfirmacao.addEventListener("input", validarCampoConfirmacao);
formularioCadastro.addEventListener("submit", cadastrarCliente);
