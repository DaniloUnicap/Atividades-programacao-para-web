//Danilo Fernandes Rodrigues da Silva

function verificarEntrada(entrada) {
    if (typeof entrada === 'number') {
        if (entrada % 2 === 0) {
            console.log('A entrada é um número par.');
        } else {
            console.log('A entrada é um número ímpar.');
        }
    } else if (typeof entrada === 'string') {
        console.log('A entrada é uma string.');
    } else {
        console.log('A entrada não é um número nem uma string.');
    }
}

const entradas = [12, 37, "Danilo", 5 > 3, { chave: 'valor' }];

for (let i = 0; i < entradas.length; i++) {
    console.log(`Entrada ${i + 1}:`);
    verificarEntrada(entradas[i]);
    console.log('===========');
}