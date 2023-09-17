//Danilo Fernandes Rodrigues da Silva

function verificarPalavra(texto) {
    let verTexto = texto.replace(/ /g, '').toLowerCase()
    let reversoTexto = verTexto.split('').reverse().join('')

    if (verTexto === reversoTexto) {
        console.log("Palíndromo")
    } else {
        console.log("Não é um palíndromo")
    }
}

verificarPalavra("socorram me subi no onibus em marrocos")