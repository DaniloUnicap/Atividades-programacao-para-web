class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
      this.agencia = agencia;
      this.numero = numero;
      this.tipo = tipo;
      this._saldo = saldo;
      this.historico = [];
    }
  
    get saldo() {
      return this._saldo;
    }
  
    set saldo(novoSaldo) {
      this._saldo = novoSaldo;
    }
  
    depositar(valor) {
      if (valor > 0) {
        this._saldo += valor;
        this.registrarTransacao("Depósito", valor);
        return true;
      }
      return false;
    }
  
    sacar(valor) {
      if (valor > 0 && valor <= this._saldo) {
        this._saldo -= valor;
        this.registrarTransacao("Saque", valor);
        return true;
      }
      return false;
    }
    
    registrarTransacao(tipo, valor) {
      const data = new Date();
      this.historico.push({ tipo, valor, data });
    }
  }
  
  class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
      super(agencia, numero, "Conta Corrente", saldo);
      this.cartaoCredito = cartaoCredito;
    }
  
    get cartaoCredito() {
      return this._cartaoCredito;
    }
  
    set cartaoCredito(novoCartaoCredito) {
      this._cartaoCredito = novoCartaoCredito;
    }
  }
  
  class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, "Conta Poupança", saldo);
    }
  }
  
  class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, "Conta Universitária", saldo);
    }
  
    sacar(valor) {
      if (valor > 0 && valor <= 500 && valor <= this.saldo) {
        this.saldo -= valor;
        this.registrarTransacao("Saque", valor);
        return true;
      }
      return false;
    }
  }
  
  function Menu() {
    const menu =
      "Bem-vindo ao Sistema de Conta Bancária! Escolha uma opção:\n" +
      "1. Depositar\n" +
      "2. Sacar\n" +
      "3. Ver saldo\n" +
      "4. Ver Histórico de Transações\n" +
      "5. Criar Conta Corrente\n" +
      "6. Criar Conta Poupança\n" +
      "7. Criar Conta Universitária\n" +
      "8. Sair";
  
    return parseInt(prompt(menu));
  }
  
  function criarConta(tipo) {
    const agencia = prompt("Digite o número da agência:");
    const numero = prompt("Digite o número da conta:");
    const saldoInicial = parseFloat(prompt("Digite o saldo inicial:"));
    if (isNaN(saldoInicial) || saldoInicial < 0) {
      alert("Saldo inicial inválido.");
      return null;
    }
  
    switch (tipo) {
      case 5: // Criar Conta Corrente
        const cartaoCredito = parseFloat(prompt("Digite o limite do cartão de crédito:"));
        if (isNaN(cartaoCredito) || cartaoCredito < 0) {
          alert("Limite do cartão de crédito inválido.");
          return null;
        }
        return new ContaCorrente(agencia, numero, saldoInicial, cartaoCredito);
  
      case 6: // Criar Conta Poupança
        return new ContaPoupanca(agencia, numero, saldoInicial);
  
      case 7: // Criar Conta Universitária
        return new ContaUniversitaria(agencia, numero, saldoInicial);
  
      default:
        alert("Opção inválida.");
        return null;
    }
  }
  
  function main() {
    const contas = [];
  
    while (true) {
      const escolha = Menu();
  
      switch (escolha) {
        case 1: // Depositar
          const contaDeposito = escolherConta(contas);
          if (contaDeposito) {
            const valorDeposito = parseFloat(prompt("Digite o valor a ser depositado:"));
            if (isNaN(valorDeposito) || valorDeposito <= 0) {
              alert("Valor de depósito inválido.");
            } else {
              if (contaDeposito.depositar(valorDeposito)) {
                alert(`Depósito de ${valorDeposito} realizado com sucesso.`);
              } else {
                alert("Depósito não realizado. Valor inválido.");
              }
            }
          }
          break;
  
        case 2: // Sacar
          const contaSaque = escolherConta(contas);
          if (contaSaque) {
            const valorSaque = parseFloat(prompt("Digite o valor a ser sacado:"));
            if (isNaN(valorSaque) || valorSaque <= 0) {
              alert("Valor de saque inválido.");
            } else {
              if (contaSaque.sacar(valorSaque)) {
                alert(`Saque de ${valorSaque} realizado com sucesso.`);
              } else {
                alert("Saque não realizado. Valor inválido ou saldo insuficiente.");
              }
            }
          }
          break;
  
        case 3: // Ver saldo
          const contaSaldo = escolherConta(contas);
          if (contaSaldo) {
            alert(`Saldo atual da conta ${contaSaldo.numero}: ${contaSaldo.saldo}`);
          }
          break;
  
        case 4: // Histórico de transações
          const contaHistorico = escolherConta(contas);
          if (contaHistorico) {
            const historico = contaHistorico.historico;
            if (historico.length === 0) {
              alert("Nenhuma transação registrada.");
            } else {
              let historicoText = "Histórico de Transações:\n";
              for (const transacao of historico) {
                historicoText += `Tipo: ${transacao.tipo}, Valor: ${transacao.valor}, Data: ${transacao.data.toLocaleString()}\n`;
              }
              alert(historicoText);
            }
          }
          break;
  
        case 5: // Criar Conta Corrente
        case 6: // Criar Conta Poupança
        case 7: // Criar Conta Universitária
          const novaConta = criarConta(escolha);
          if (novaConta) {
            contas.push(novaConta);
            alert(`Conta ${novaConta.tipo} criada com sucesso.`);
          }
          break;
  
        case 8: // Sair do programa
          return;
  
        default:
          alert("Opção inválida.");
      }
    }
  }
  
  function escolherConta(contas) {
    if (contas.length === 0) {
      alert("Nenhuma conta cadastrada.");
      return null;
    }
  
    const numeroConta = prompt("Digite o número da conta:");
    const conta = contas.find((c) => c.numero === numeroConta);
  
    if (!conta) {
      alert("Conta não encontrada.");
      return null;
    }
  
    return conta;
  }
  
  main();
