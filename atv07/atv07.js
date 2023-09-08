function Menu() {
  const menu = "Bem-vindo ao Sistema de Conta Bancária! Escolha uma opção: \n" +
    "1. Depositar \n" +
    "2. Sacar\n" +
    "3. Ver saldo\n" +
    "4. Ver Histórico de Transações \n" +
    "5. Sair";

  return prompt(menu);
}

function main() {
  let saldo = 1000; // Saldo inicial
  const historico = [];

  while (true) {
    const escolha = parseInt(Menu());

    switch (escolha) {
      case 1: // Depositar
        const deposito = parseFloat(prompt("Digite o valor a ser depositado:"));
        if (isNaN(deposito) || deposito <= 0) {
          alert("Valor de depósito inválido.");
        } else {
          saldo += deposito;
          historico.push({ tipo: "Depósito", valor: deposito, data: new Date() });
          alert(`Depósito de ${deposito} realizado com sucesso.`);
        }
        break;

      case 2: // Sacar
        const saque = parseFloat(prompt("Digite o valor a ser sacado:"));
        if (isNaN(saque) || saque <= 0) {
          alert("Valor de saque inválido.");
        } else if (saque > saldo) {
          alert("Saldo insuficiente.");
        } else {
          saldo -= saque;
          historico.push({ tipo: "Saque", valor: saque, data: new Date() });
          alert(`Saque de ${saque} realizado com sucesso.`);
        }
        break;

      case 3: // Ver saldo
        alert(`Saldo atual: ${saldo}`);
        break;

      case 4: // Histórico de transações
        if (historico.length === 0) {
          alert("Nenhuma transação registrada.");
        } else {
          let historicoText = "Histórico de Transações:\n";
          for (const transacao of historico) {
            historicoText += `Tipo: ${transacao.tipo}, Valor: ${transacao.valor}, Data: ${transacao.data.toLocaleString()}\n`;
          }
          alert(historicoText);
        }
        break;

      case 5: // Sair do programa
        return;

      default:
        alert("Opção inválida.");
    }
  }
}

main();
