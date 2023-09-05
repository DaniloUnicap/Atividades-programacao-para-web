//Danilo Fernandes Rodrigues da Silva

const biblioteca = []

function Menu() {
  const menu = "Menu Principal:\n" +
    "1. Cadastrar Livro\n" +
    "2. Alterar Livro\n" +
    "3. Deletar Livro\n" +
    "4. Realizar Empréstimo de Livro\n" +
    "5. Sair"
  return prompt(menu)
}


function cadastrarLivro() {
  const titulo = prompt("Digite o título do livro:")
  const autor = prompt("Digite o autor do livro:")
  const id = biblioteca.length + 1
  const emprestado = false

  const livro = {
    id,
    titulo,
    autor,
    emprestado,
  }

  biblioteca.push(livro)
  console.log("Livro cadastrado com sucesso!")
}

// Função para alterar um livro
function alterarLivro() {
  const id = parseInt(prompt("Digite o ID do livro que deseja alterar:"))
  const livro = biblioteca.find((livro) => livro.id === id)

  if (!livro) {
    prompt("Livro não encontrado. Pressione Enter para continuar.")
    return
  }

  const novoTitulo = prompt("Digite o novo título (ou deixe em branco para manter o mesmo):")
  const novoAutor = prompt("Digite o novo autor (ou deixe em branco para manter o mesmo):")

  if (novoTitulo !== "") {
    livro.titulo = novoTitulo
  }

  if (novoAutor !== "") {
    livro.autor = novoAutor
  }

  console.log("Livro alterado com sucesso!")
}

function deletarLivro() {
  const id = parseInt(prompt("Digite o ID do livro que deseja deletar:"))
  const index = biblioteca.findIndex((livro) => livro.id === id)

  if (index === -1) {
    prompt("Livro não encontrado. Pressione Enter para continuar.")
    return
  }

  biblioteca.splice(index, 1)
  console.log("Livro deletado com sucesso!")
}

function realizarEmprestimo() {
  const id = parseInt(prompt("Digite o ID do livro que deseja emprestar:"))
  const livro = biblioteca.find((livro) => livro.id === id)

  if (!livro) {
    prompt("Livro não encontrado. Pressione Enter para continuar.")
    return
  }

  if (livro.emprestado) {
    console.log("Este livro já está emprestado.")
  } else {
    livro.emprestado = true
    console.log("Empréstimo realizado com sucesso!")
  }
}

let opcao
do {
  opcao = Menu()

  switch (opcao) {
    case "1":
      cadastrarLivro()
      break
    case "2":
      alterarLivro()
      break
    case "3":
      deletarLivro()
      break
    case "4":
      realizarEmprestimo()
      break
    case "5":
      console.log("Saindo do sistema.")
      break
    default:
      prompt("[ERRO] Opção inválida. Pressione Enter para tentar novamente.")
  }
} while (opcao !== "5")
