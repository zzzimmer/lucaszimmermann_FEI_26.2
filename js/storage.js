const CHAVE_CLIENTES = "loja:clientes";
const CHAVE_CONTADORES = "loja:contadores";
const CHAVE_SESSAO = "loja:sessao";

function lerDados(chave, valorPadrao) {
  try {
    const texto = localStorage.getItem(chave);
    if (texto === null) {
      return valorPadrao;
    }
    return JSON.parse(texto);
  } catch (erro) {
    console.error("Não foi possível ler a chave " + chave, erro);
    return valorPadrao;
  }
}

function salvarDados(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch (erro) {
    console.error("Não foi possível salvar a chave " + chave, erro);
    return false;
  }
}

function removerDados(chave) {
  try {
    localStorage.removeItem(chave);
    return true;
  } catch (erro) {
    console.error("Não foi possível remover a chave " + chave, erro);
    return false;
  }
}
