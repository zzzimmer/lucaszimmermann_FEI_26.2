const formularioPerfil = document.getElementById("form-perfil");
const campoId = document.getElementById("id");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoCpf = document.getElementById("cpf");
const campoSenhaAtual = document.getElementById("senha-atual");
const campoSenha = document.getElementById("senha");
const campoConfirmacao = document.getElementById("senha2");
const paragrafoForcaSenha = document.getElementById("forca-senha");
const paragrafoResultado = document.getElementById("mensagem-resultado");
const botaoExcluir = document.getElementById("botao-excluir");
const dialogoExcluir = document.getElementById("dialogo-excluir");
const botaoCancelarExclusao = document.getElementById("botao-cancelar-exclusao");
const botaoConfirmarExclusao = document.getElementById("botao-confirmar-exclusao");

function preencherFormulario(cliente) {
  campoId.value = cliente.id;
  campoNome.value = cliente.nome;
  campoEmail.value = cliente.email;
  campoTelefone.value = cliente.telefone;
  campoCpf.value = formatarCpf(cliente.cpf);
}

function validarCampoNome() {
  return exibirValidacao(campoNome, validarNome(campoNome.value));
}

function validarCampoEmail() {
  let mensagem = validarFormatoEmail(campoEmail.value);
  if (mensagem === "" && emailJaCadastrado(campoEmail.value, campoId.value)) {
    mensagem = "Este e-mail já está cadastrado.";
  }
  return exibirValidacao(campoEmail, mensagem);
}

function validarCampoTelefone() {
  return exibirValidacao(campoTelefone, validarTelefone(campoTelefone.value));
}

function validarCampoCpf() {
  let mensagem = validarCpf(campoCpf.value);
  if (mensagem === "" && cpfJaCadastrado(campoCpf.value, campoId.value)) {
    mensagem = "Este CPF já está cadastrado.";
  }
  return exibirValidacao(campoCpf, mensagem);
}

function querTrocarSenha() {
  return campoSenha.value !== "" || campoConfirmacao.value !== "";
}

function validarCampoSenhaAtual() {
  let mensagem = "";
  if (querTrocarSenha() && campoSenhaAtual.value === "") {
    mensagem = "Informe a senha atual para trocar a senha.";
  }
  return exibirValidacao(campoSenhaAtual, mensagem);
}

function validarCampoSenha() {
  let mensagem = "";
  if (querTrocarSenha()) {
    mensagem = validarSenha(campoSenha.value);
  }
  return exibirValidacao(campoSenha, mensagem);
}

function validarCampoConfirmacao() {
  let mensagem = "";
  if (querTrocarSenha()) {
    mensagem = validarConfirmacaoSenha(campoSenha.value, campoConfirmacao.value);
  }
  return exibirValidacao(campoConfirmacao, mensagem);
}

function validarFormularioPerfil() {
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
  if (!validarCampoSenhaAtual()) {
    camposInvalidos.push(campoSenhaAtual);
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

async function salvarPerfil(evento) {
  evento.preventDefault();
  paragrafoResultado.textContent = "";

  if (!validarFormularioPerfil()) {
    return;
  }

  const cliente = buscarClienteLogado();
  const novoNome = campoNome.value.trim();
  const novoEmail = campoEmail.value.trim().toLowerCase();
  const novoTelefone = campoTelefone.value.trim();
  const novoCpf = somenteDigitos(campoCpf.value);
  const trocarSenha = querTrocarSenha();

  let houveAlteracao = false;
  if (novoNome !== cliente.nome) {
    houveAlteracao = true;
  }
  if (novoEmail !== cliente.email) {
    houveAlteracao = true;
  }
  if (novoTelefone !== cliente.telefone) {
    houveAlteracao = true;
  }
  if (novoCpf !== cliente.cpf) {
    houveAlteracao = true;
  }
  if (trocarSenha) {
    houveAlteracao = true;
  }

  if (!houveAlteracao) {
    paragrafoResultado.textContent = "Nenhuma alteração para salvar.";
    return;
  }

  if (trocarSenha) {
    const hashSenhaAtual = await gerarHashSenha(campoSenhaAtual.value, cliente.salt);
    if (hashSenhaAtual !== cliente.hashSenha) {
      mostrarErro(campoSenhaAtual, "Senha atual incorreta.");
      campoSenhaAtual.focus();
      return;
    }
    cliente.salt = gerarSalt();
    cliente.hashSenha = await gerarHashSenha(campoSenha.value, cliente.salt);
  }

  cliente.nome = novoNome;
  cliente.email = novoEmail;
  cliente.telefone = novoTelefone;
  cliente.cpf = novoCpf;

  if (!atualizarCliente(cliente)) {
    paragrafoResultado.textContent = "Não foi possível salvar. Tente novamente.";
    return;
  }

  campoSenhaAtual.value = "";
  campoSenha.value = "";
  campoConfirmacao.value = "";
  paragrafoForcaSenha.textContent = "";
  paragrafoResultado.textContent = "Dados atualizados com sucesso.";
}

function abrirDialogoExclusao() {
  dialogoExcluir.showModal();
}

function fecharDialogoExclusao() {
  dialogoExcluir.close();
}

function confirmarExclusao() {
  excluirCliente(campoId.value);
  encerrarSessao();
  window.location.href = "../index.html";
}

function iniciarPaginaPerfil() {
  const cliente = buscarClienteLogado();
  if (cliente === null) {
    window.location.href = "login.html";
    return;
  }
  preencherFormulario(cliente);

  campoNome.addEventListener("input", validarCampoNome);
  campoEmail.addEventListener("input", validarCampoEmail);
  campoTelefone.addEventListener("input", validarCampoTelefone);
  campoCpf.addEventListener("input", aplicarMascaraCpf);
  campoCpf.addEventListener("input", validarCampoCpf);
  campoSenhaAtual.addEventListener("input", validarCampoSenhaAtual);
  campoSenha.addEventListener("input", atualizarForcaSenha);
  campoSenha.addEventListener("input", validarCampoSenha);
  campoConfirmacao.addEventListener("input", validarCampoConfirmacao);
  formularioPerfil.addEventListener("submit", salvarPerfil);
  botaoExcluir.addEventListener("click", abrirDialogoExclusao);
  botaoCancelarExclusao.addEventListener("click", fecharDialogoExclusao);
  botaoConfirmarExclusao.addEventListener("click", confirmarExclusao);
}

iniciarPaginaPerfil();
