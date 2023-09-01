//Danilo Fernandes Rodrigues da Silva

const dados = require('readline')

const lerDados = dados.createInterface ({
    input: process.stdin,
    output: process.stdout
})

const produtos = []
const pessoas = []

function cadastrarProduto() {
    lerDados.question('Digite o nome do novo produto: ', (novoProduto) => {
        produtos.push(novoProduto)
        console.log(`Produto ${novoProduto} cadastrado com sucesso.`)
        menu()
    })
}

function cadastrarPessoa() {
    lerDados.question('Digite o nome da pessoa: ', (novaPessoa) => {
        pessoas.push(novaPessoa)
        console.log(`A pessoa ${novaPessoa} foi cadastrada com sucesso.`)
        menu()
    })
}

function sortear() {
    if (pessoas.length === 0 || produtos.length === 0) {
        console.log('Nenhuma pessoa ou nenhum prodruto foi cadastrado para o sorteio')
        menu()
        return
    }

    const numeroSorteadoPessoa = Math.floor(Math.random() * pessoas.length);
    const pessoaSorteada = pessoas[numeroSorteadoPessoa];
  
    const numeroSorteadoProduto = Math.floor(Math.random() * produtos.length);
    const produtoSorteado = produtos[numeroSorteadoProduto];

    console.log(`A pessoa sorteada foi ${pessoaSorteada} e ganhou o produto ${produtoSorteado}`)
    menu()
}

function menu () {
    console.log('=== Menu ===')
    console.log('1. Cadastrar Produto')
    console.log('2. Cadastrar Pessoa')
    console.log('3. Sortear')
    console.log('4. Sair')

    lerDados.question('Digite a opção desejada: ', (opcao) => {
        switch (opcao) {
            case '1': 
                cadastrarProduto()
            break
            case '2':
                cadastrarPessoa()
                break
            case '3': 
                sortear()
                break

            case '4':
                console.log("Programa encerrado!")
                lerDados.close()
                break
            default:
                console.log("Opcão inválida, tente novamente!")
                menu()
        }
    } )

}

menu()