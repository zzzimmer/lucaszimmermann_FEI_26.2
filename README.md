# Tralharia

## Descrição

A Tralharia é uma loja virtual fictícia que vende vestuário (camisetas, calças, jaquetas, bonés), eletrônicos (fone, mouse, teclado, telefone) e acessórios (mochila, relógio).

O site é feito com HTML, CSS e JavaScript puro, sem servidor nem banco de dados: os dados ficam no `localStorage` do navegador. Tem catálogo de produtos por categoria, páginas de produto, login, cadastro, contato, perfil do cliente com tabela de pedidos e relatórios de clientes e compras.

Para a senha ser protegida com `crypto.subtle`, abra o site por um servidor local (por exemplo, a extensão Live Server do VS Code) em vez de abrir o arquivo direto.

## Mapa de chaves do localStorage

Todas as chaves usam o prefixo `loja:`. Os valores são guardados em JSON.

| Chave | O que guarda | Formato |
|---|---|---|
| `loja:clientes` | Clientes cadastrados | Lista de `{ id, nome, email, telefone, cpf, salt, hashSenha }`. `id` no formato `C001`; `email` em minúsculas; `telefone` com 11 números; `cpf` só com os 11 números; `salt` e `hashSenha` em hexadecimal (SHA-256 de `salt + senha`). A senha nunca é guardada. |
| `loja:contadores` | Último número usado em cada tipo de ID | `{ clientes: 3 }`. Só aumenta, nunca diminui, para um ID não ser reaproveitado. |
| `loja:sessao` | Cliente logado | `{ idCliente: "C001" }`. Removida ao excluir a conta. |

## Estrutura de pastas

```
.
├── README.md
├── acessorios.html
├── bone.html
├── cadastro.html
├── calca.html
├── camiseta.html
├── contato.html
├── css
│   ├── base.css
│   ├── componentes.css
│   ├── layout.css
│   ├── relatorios.css
│   └── responsivo.css
├── eletronicos.html
├── fone.html
├── img
│   ├── banner.svg
│   ├── bone.svg
│   ├── calca.jpg
│   ├── camiseta.jpg
│   ├── fone.svg
│   ├── jaqueta.svg
│   ├── logo.svg
│   ├── loja-equipe.svg
│   ├── loja-fachada.svg
│   ├── mochila.svg
│   ├── mouse.svg
│   ├── relogio.svg
│   ├── teclado.jpg
│   └── telefone.jpg
├── index.html
├── jaqueta.html
├── login.html
├── loja.html
├── mochila.html
├── mouse.html
├── perfil.html
├── relatorios.html
├── relogio.html
├── sobre.html
├── teclado.html
├── telefone.html
└── vestuario.html
```

- `css/`: estilos (base, layout, componentes, relatórios e responsivo)
- `img/`: imagens e logos
