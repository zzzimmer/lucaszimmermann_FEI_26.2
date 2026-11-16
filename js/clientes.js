function listarClientes() {
  return lerDados(CHAVE_CLIENTES, []);
}

function salvarClientes(clientes) {
  return salvarDados(CHAVE_CLIENTES, clientes);
}

function buscarClientePorId(id) {
  const clientes = listarClientes();
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].id === id) {
      return clientes[i];
    }
  }
  return null;
}

function buscarClientePorEmail(email) {
  const emailProcurado = email.trim().toLowerCase();
  const clientes = listarClientes();
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].email === emailProcurado) {
      return clientes[i];
    }
  }
  return null;
}

function emailJaCadastrado(email, idIgnorado) {
  const cliente = buscarClientePorEmail(email);
  if (cliente === null) {
    return false;
  }
  return cliente.id !== idIgnorado;
}

function cpfJaCadastrado(cpf, idIgnorado) {
  const cpfProcurado = somenteDigitos(cpf);
  const clientes = listarClientes();
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cpf === cpfProcurado && clientes[i].id !== idIgnorado) {
      return true;
    }
  }
  return false;
}

function gerarIdCliente() {
  const contadores = lerDados(CHAVE_CONTADORES, { clientes: 0 });
  contadores.clientes = contadores.clientes + 1;
  salvarDados(CHAVE_CONTADORES, contadores);
  return formatarIdCliente(contadores.clientes);
}

function adicionarCliente(cliente) {
  const clientes = listarClientes();
  clientes.push(cliente);
  return salvarClientes(clientes);
}

function atualizarCliente(clienteAtualizado) {
  const clientes = listarClientes();
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].id === clienteAtualizado.id) {
      clientes[i] = clienteAtualizado;
    }
  }
  return salvarClientes(clientes);
}

function excluirCliente(id) {
  const clientes = listarClientes();
  const clientesRestantes = [];
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].id !== id) {
      clientesRestantes.push(clientes[i]);
    }
  }
  return salvarClientes(clientesRestantes);
}

function iniciarSessao(idCliente) {
  return salvarDados(CHAVE_SESSAO, { idCliente: idCliente });
}

function encerrarSessao() {
  return removerDados(CHAVE_SESSAO);
}

function buscarClienteLogado() {
  const sessao = lerDados(CHAVE_SESSAO, null);
  if (sessao === null) {
    return null;
  }
  return buscarClientePorId(sessao.idCliente);
}
