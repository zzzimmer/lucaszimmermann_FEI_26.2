function mostrarErro(campo, mensagem) {
  const paragrafoDeErro = document.getElementById("erro-" + campo.id);
  paragrafoDeErro.textContent = mensagem;
  campo.classList.add("campo-invalido");
}

function limparErro(campo) {
  const paragrafoDeErro = document.getElementById("erro-" + campo.id);
  paragrafoDeErro.textContent = "";
  campo.classList.remove("campo-invalido");
}

function exibirValidacao(campo, mensagem) {
  if (mensagem === "") {
    limparErro(campo);
    return true;
  }
  mostrarErro(campo, mensagem);
  return false;
}

function mostrarForcaSenha(paragrafo, senha) {
  const forca = calcularForcaSenha(senha);
  if (forca === "") {
    paragrafo.textContent = "";
  } else {
    paragrafo.textContent = "Força da senha: " + forca;
  }
}

function focarPrimeiroInvalido(camposInvalidos) {
  if (camposInvalidos.length > 0) {
    camposInvalidos[0].focus();
    return false;
  }
  return true;
}
