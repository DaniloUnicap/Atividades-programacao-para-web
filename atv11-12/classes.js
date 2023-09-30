class Transacao {
    constructor(tipo, valor) {
        this.tipo = tipo;
        this.valor = valor;
        this.data = new Date();
    }
}

class ContaBancaria {
    #saldo = 0;

    constructor(agencia, numero, tipo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.historicoTransacoes = [];
    }

    getSaldo() {
        return this.#saldo;
    }

    setSaldo(novoSaldo) {
        this.#saldo = novoSaldo;
    }

    sacar(valor) {
        if (valor <= 0) {
            console.error("O valor do saque deve ser maior que zero.");
        } else if (valor > this.#saldo) {
            console.error("Saldo insuficiente para realizar o saque.");
        } else {
            this.#saldo -= valor;
            console.log(`Saque de R$${valor} realizado. Saldo atual: R$${this.#saldo}`);
            this.historicoTransacoes.push(new Transacao("Saque", valor));
        }
    }

    depositar(valor) {
        if (valor <= 0) {
            console.error("O valor do depósito deve ser maior que zero.");
        } else {
            this.#saldo += valor;
            console.log(`Depósito de R$${valor} realizado. Saldo atual: R$${this.#saldo}`);
            this.historicoTransacoes.push(new Transacao("Depósito", valor));
        }
    }
}

class ContaCorrente extends ContaBancaria {
    cartaoCredito = 0;

    constructor(agencia, numero) {
        super(agencia, numero, "Conta Corrente");
    }

    setCartaoCredito(novoLimite) {
        this.cartaoCredito = novoLimite;
        console.log(`Seu novo limite de crédito é de R$${novoLimite}`);
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero) {
        super(agencia, numero, "Conta Poupança");
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero) {
        super(agencia, numero, "Conta Universitária");
    }

    sacar(valor) {
        if (valor > 500) {
            console.error("Você não pode sacar um valor acima de R$500 em uma conta universitária.");
        } else {
            super.sacar(valor);
        }
    }
}

