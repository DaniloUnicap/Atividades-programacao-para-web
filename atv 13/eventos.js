window.addEventListener('load', (e) => {
    const botaoCriar = document.getElementById('botaocriar');
    const botaoDeletar = document.getElementById('botaodeletar');
    const botaoVisualizar = document.getElementById('botaovisualizar');
    const limiteCartao = document.getElementById('limiteCartao');
    const formCriar = document.getElementById('formCriar');
    const formDeletar = document.getElementById('formDeletar');
    const tabela = document.getElementById('tabela');
    const formEntrar = document.getElementById('formEntrar');
    const tipo = document.getElementById('tipo');
    const agencia = document.getElementById('agencia');
    const saldo = document.getElementById('saldo');
    const numerodaconta = document.getElementById('numerodaconta');
    const limiteCartaoInput = document.getElementById('limiteCartaoInput');
    const DelNAgencia = document.getElementById('DelNAgencia');
    const DelNConta = document.getElementById('DelNConta');
    const contascriada = [];
    const valorDeposito = document.getElementById('valorDeposito');
    const botaoDeposito = document.getElementById('botaoDeposito');
    const formDeposito = document.getElementById('formDeposito');
    const valorSaque = document.getElementById('valorSaque');
    const botaoSacar = document.getElementById('botaoSacar');
    const formSacar = document.getElementById('formSacar');
    const extrato = document.getElementById('extrato');
    const divSaldo = document.getElementById('divSaldo');
    const botaoExtrato = document.getElementById('botaoExtrato');
    const tbody2 = document.getElementById('tbody2');
    const digitarconta = document.getElementById('digitarconta');
    const digitaragencia = document.getElementById('digitaragencia');
    const sejaFeliz = document.getElementById('sejaFeliz');
    const valorSaldo = document.getElementById('valorSaldo');
    const botoesOperacao = document.getElementById('botoesOperacao');
    const entrar = document.getElementById('entrar');

    let contaSelecionada = null;

    // Função para criar elementos HTML
    function createElement(tag, text) {
        const element = document.createElement(tag);
        if (text) {
            element.innerHTML = text;
        }
        return element;
    }

    // Função para atualizar a tabela de contas
    function atualizarTabela() {
        const tbody = document.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        contascriada.forEach((conta) => {
            const tr = createElement('tr');
            tr.appendChild(createElement('td', conta.agencia));
            tr.appendChild(createElement('td', conta.numero));
            tr.appendChild(createElement('td', conta.tipo));
            tr.appendChild(createElement('td', conta.getSaldo()));
            tbody.appendChild(tr);
        });
    }

    // Botão criar
    botaoCriar.addEventListener('click', (e) => {
        formCriar.classList.toggle('invisivel');
        formDeletar.classList.add('invisivel');
        tabela.classList.add('invisivel');
        formEntrar.classList.add('invisivel');
    });

    // Botão deletar
    botaoDeletar.addEventListener('click', (e) => {
        formDeletar.classList.toggle('invisivel');
        formCriar.classList.add('invisivel');
        tabela.classList.add('invisivel');
        formEntrar.classList.add('invisivel');
    });

    // Botão visualizar
    botaoVisualizar.addEventListener('click', (e) => {
        tabela.classList.toggle('invisivel');
        formCriar.classList.add('invisivel');
        formDeletar.classList.add('invisivel');
        formEntrar.classList.add('invisivel');
        document.getElementsByTagName('tbody')[0].innerHTML = '';
        atualizarTabela();
    });

    // Tipo de conta
    tipo.addEventListener('change', (e) => {
        limiteCartao.classList.toggle('invisivel', tipo.value !== 'corrente');
    });

    // Formulário de criar conta
    formCriar.addEventListener('submit', (e) => {
        e.preventDefault();

        let conta = null;

        switch (tipo.value) {
            case 'poupanca':
                conta = new ContaPoupanca();
                break;
            case 'corrente':
                conta = new ContaCorrente();
                conta.cartaoCredito = limiteCartaoInput.value;
                break;
            case 'universitaria':
                conta = new ContaUniversitaria();
                break;
        }

        if (conta) {
            conta.agencia = agencia.value;
            conta.setSaldo(parseInt(saldo.value));
            conta.numero = numerodaconta.value;
            contascriada.push(conta);
            formCriar.reset();
            formCriar.classList.add('invisivel');
            alert('Conta criada');
        }
    });

    // Formulário de deletar conta
    formDeletar.addEventListener('submit', (e) => {
        e.preventDefault();
        const agenciaParaDeletar = DelNAgencia.value;
        const numeroContaParaDeletar = DelNConta.value;

        const contaIndex = contascriada.findIndex((conta) =>
            conta.agencia === agenciaParaDeletar && conta.numero === numeroContaParaDeletar
        );

        if (contaIndex !== -1) {
            contascriada.splice(contaIndex, 1);
            alert('Conta deletada');
        } else {
            alert('Conta não existe');
        }

        formDeletar.reset();
        formDeletar.classList.add('invisivel');
    });

    // Botão entrar
    entrar.addEventListener('click', (e) => {
        formEntrar.classList.toggle('invisivel');
        formCriar.classList.add('invisivel');
        tabela.classList.add('invisivel');
        formDeletar.classList.add('invisivel');
    });

    // Formulário de entrar
    formEntrar.addEventListener('submit', (e) => {
        e.preventDefault();
        const numeroDigitado = digitarconta.value;
        const agenciaDigitada = digitaragencia.value;

        const contaEncontrada = contascriada.find((conta) =>
            conta.numero === numeroDigitado && conta.agencia === agenciaDigitada
        );

        if (contaEncontrada) {
            contaSelecionada = contaEncontrada;
            valorSaldo.innerText = `R$${contaSelecionada.getSaldo()}`;
            formEntrar.classList.toggle('invisivel');
            botoesOperacao.classList.remove('invisivel');
            divSaldo.classList.remove('invisivel');
            sejaFeliz.classList.add('invisivel');
            botaoCriar.classList.add('invisivel');
            botaoDeletar.classList.add('invisivel');
            botaoVisualizar.classList.add('invisivel');
            entrar.classList.add('invisivel');
        } else {
            alert('Conta não existente');
        }
    });

    // Botão deposito
    botaoDeposito.addEventListener('click', (e) => {
        formDeposito.classList.toggle('invisivel');
        formSacar.classList.add('invisivel');
        extrato.classList.add('invisivel');
        divSaldo.classList.remove('invisivel');
    });

    // Formulário de depósito
    formDeposito.addEventListener('submit', (e) => {
        e.preventDefault();
        contaSelecionada.depositar(parseInt(valorDeposito.value));
        valorSaldo.innerText = `R$${contaSelecionada.getSaldo()}`;
    });

    // Botão sacar
    botaoSacar.addEventListener('click', (e) => {
        formSacar.classList.toggle('invisivel');
        formDeposito.classList.add('invisivel');
        extrato.classList.add('invisivel');
        divSaldo.classList.remove('invisivel');
    });

    // Formulário de sacar
    formSacar.addEventListener('submit', (e) => {
        e.preventDefault();
        contaSelecionada.sacar(parseInt(valorSaque.value));
        valorSaldo.innerText = `R$${contaSelecionada.getSaldo()}`;
    });

    // Botão Extrato
    botaoExtrato.addEventListener('click', (e) => {
        extrato.classList.toggle('invisivel');
        divSaldo.classList.add('invisivel');
        formSacar.classList.add('invisivel');
        formDeposito.classList.add('invisivel');
        tbody2.innerHTML = '';

        contaSelecionada.historicoTransacoes.forEach((transacao) => {
            const tr = createElement('tr');
            tr.appendChild(createElement('td', transacao.tipo));
            tr.appendChild(createElement('td', transacao.valor));
            tr.appendChild(createElement('td', transacao.data));
            tbody2.appendChild(tr);
        });
    });
});
