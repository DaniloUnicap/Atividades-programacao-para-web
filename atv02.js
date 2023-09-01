//Danilo Fernandes Rodrigues da Silva

function executar(fn, num1 = 0, num2 = 0) {
    if (typeof fn == 'function') {
        console.log(fn(num1, num2));
    }
}

function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multi(a, b) {
    return a * b;
}

const funcoes = [somar, subtrair, multi];
const valores = [   
     [20, 21]
    ,[20, 21]
    ,[20, 21]
];

for (let i = 0; i < funcoes.length; i++) {
    executar(funcoes[i], valores[i][0], valores[i][1]);
}
