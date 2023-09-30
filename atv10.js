//Danilo Fernandes Rodrigues da Silva

function quadradoMagico(matrix) {
    // Verificar se a matriz é quadrada (mesmo número de linhas e colunas)
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        if (matrix[i].length !== n) {
            return false;
        }
    }

    // Calcular a soma da primeira linha, que será usada como referência
    let sumReference = 0;
    for (let j = 0; j < n; j++) {
        sumReference += matrix[0][j];
    }

    // Verificar as somas das linhas, colunas e diagonais
    for (let i = 0; i < n; i++) {
        let sumRow = 0;
        let sumColumn = 0;
        for (let j = 0; j < n; j++) {
            sumRow += matrix[i][j];
            sumColumn += matrix[j][i];
        }
        if (sumRow !== sumReference || sumColumn !== sumReference) {
            return false;
        }
    }

    // Verificar a soma da diagonal principal
    let sumDiagonal1 = 0;
    for (let i = 0; i < n; i++) {
        sumDiagonal1 += matrix[i][i];
    }
    if (sumDiagonal1 !== sumReference) {
        return false;
    }

    // Verificar a soma da diagonal secundária
    let sumDiagonal2 = 0;
    for (let i = 0; i < n; i++) {
        sumDiagonal2 += matrix[i][n - i - 1];
    }
    if (sumDiagonal2 !== sumReference) {
        return false;
    }

    // Se todas as verificações passaram, a matriz é um Quadrado Mágico
    return true;
}

// Teste com uma matriz
const matrix = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
];

const matrix2 = [
    [1, 15, 14, 4],
    [12, 6, 7, 9],
    [8, 10, 11, 5],
    [13, 3, 2, 16]
];

const matrix3 = [
    [1,2,3],
    [1,2,3],
    [1,2,3]
]

console.log(quadradoMagico(matrix)); // Deve retornar true
console.log(quadradoMagico(matrix2)); // Deve retornar true
console.log(quadradoMagico(matrix3)); // Deve retornar false
