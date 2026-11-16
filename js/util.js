function ehDigito(caractere) {
  return caractere >= "0" && caractere <= "9";
}

function ehLetraMinuscula(caractere) {
  return caractere >= "a" && caractere <= "z";
}

function ehLetraMaiuscula(caractere) {
  return caractere >= "A" && caractere <= "Z";
}

function somenteDigitos(texto) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    if (ehDigito(texto[i])) {
      resultado = resultado + texto[i];
    }
  }
  return resultado;
}

function validarNome(nome) {
  const texto = nome.trim();
  if (texto.length < 3) {
    return "O nome deve ter pelo menos 3 caracteres.";
  }
  const partes = texto.split(" ");
  let quantidadeDePalavras = 0;
  for (let i = 0; i < partes.length; i++) {
    if (partes[i] !== "") {
      quantidadeDePalavras = quantidadeDePalavras + 1;
    }
  }
  if (quantidadeDePalavras < 2) {
    return "Informe nome e sobrenome.";
  }
  return "";
}

function validarFormatoEmail(email) {
  const texto = email.trim();
  if (texto === "") {
    return "Informe o e-mail.";
  }
  const formatoDeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoDeEmail.test(texto)) {
    return "Informe um e-mail válido, como maria@exemplo.com.";
  }
  return "";
}

function validarTelefone(telefone) {
  const texto = telefone.trim();
  if (texto === "") {
    return "Informe o telefone.";
  }
  for (let i = 0; i < texto.length; i++) {
    if (!ehDigito(texto[i])) {
      return "O telefone deve ter somente números.";
    }
  }
  if (texto.length !== 11) {
    return "O telefone deve ter 11 números: DDD + celular.";
  }
  return "";
}

function validarSenha(senha) {
  if (senha === "") {
    return "Informe a senha.";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }
  let temLetra = false;
  let temNumero = false;
  for (let i = 0; i < senha.length; i++) {
    if (ehLetraMinuscula(senha[i]) || ehLetraMaiuscula(senha[i])) {
      temLetra = true;
    }
    if (ehDigito(senha[i])) {
      temNumero = true;
    }
  }
  if (!temLetra || !temNumero) {
    return "A senha deve ter letras e números.";
  }
  return "";
}

function validarConfirmacaoSenha(senha, confirmacao) {
  if (confirmacao === "") {
    return "Repita a senha.";
  }
  if (senha !== confirmacao) {
    return "As senhas não conferem.";
  }
  return "";
}

function calcularForcaSenha(senha) {
  if (senha === "") {
    return "";
  }
  let temMinuscula = false;
  let temMaiuscula = false;
  let temNumero = false;
  let temSimbolo = false;
  for (let i = 0; i < senha.length; i++) {
    const caractere = senha[i];
    if (ehLetraMinuscula(caractere)) {
      temMinuscula = true;
    } else if (ehLetraMaiuscula(caractere)) {
      temMaiuscula = true;
    } else if (ehDigito(caractere)) {
      temNumero = true;
    } else {
      temSimbolo = true;
    }
  }
  let pontos = 0;
  if (senha.length >= 8) {
    pontos = pontos + 1;
  }
  if (senha.length >= 12) {
    pontos = pontos + 1;
  }
  if (temMinuscula && temMaiuscula) {
    pontos = pontos + 1;
  }
  if (temNumero) {
    pontos = pontos + 1;
  }
  if (temSimbolo) {
    pontos = pontos + 1;
  }
  if (pontos <= 2) {
    return "Fraca";
  }
  if (pontos === 3) {
    return "Média";
  }
  return "Forte";
}

function formatarCpf(texto) {
  let digitos = somenteDigitos(texto);
  if (digitos.length > 11) {
    digitos = digitos.substring(0, 11);
  }
  let resultado = "";
  for (let i = 0; i < digitos.length; i++) {
    if (i === 3 || i === 6) {
      resultado = resultado + ".";
    }
    if (i === 9) {
      resultado = resultado + "-";
    }
    resultado = resultado + digitos[i];
  }
  return resultado;
}

function calcularDigitoVerificadorCpf(digitos, quantidadeDeDigitos) {
  let soma = 0;
  let peso = quantidadeDeDigitos + 1;
  for (let i = 0; i < quantidadeDeDigitos; i++) {
    soma = soma + Number(digitos[i]) * peso;
    peso = peso - 1;
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) {
    resto = 0;
  }
  return resto;
}

function validarCpf(cpf) {
  const digitos = somenteDigitos(cpf);
  if (digitos === "") {
    return "Informe o CPF.";
  }
  if (digitos.length !== 11) {
    return "O CPF deve ter 11 números.";
  }
  let todosIguais = true;
  for (let i = 1; i < digitos.length; i++) {
    if (digitos[i] !== digitos[0]) {
      todosIguais = false;
    }
  }
  if (todosIguais) {
    return "CPF inválido.";
  }
  const primeiroDigito = calcularDigitoVerificadorCpf(digitos, 9);
  const segundoDigito = calcularDigitoVerificadorCpf(digitos, 10);
  if (primeiroDigito !== Number(digitos[9]) || segundoDigito !== Number(digitos[10])) {
    return "CPF inválido.";
  }
  return "";
}

function formatarIdCliente(numero) {
  return "C" + String(numero).padStart(3, "0");
}

function converterBytesParaHexadecimal(bytes) {
  let resultado = "";
  for (let i = 0; i < bytes.length; i++) {
    resultado = resultado + bytes[i].toString(16).padStart(2, "0");
  }
  return resultado;
}

function gerarSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return converterBytesParaHexadecimal(bytes);
}

async function gerarHashSenha(senha, salt) {
  const textoEmBytes = new TextEncoder().encode(salt + senha);
  const resultado = await crypto.subtle.digest("SHA-256", textoEmBytes);
  return converterBytesParaHexadecimal(new Uint8Array(resultado));
}
