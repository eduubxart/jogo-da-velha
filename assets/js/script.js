// ==============================
// SELEÇÃO DE ELEMENTOS
// ==============================
const cells = document.querySelectorAll('[data-cell]'); // Todas as células do tabuleiro
const reiniciarBtn = document.getElementById('reiniciar'); // Botão de reiniciar
const resultadoDiv = document.getElementById('resultado'); // Onde aparece o resultado

let xTurn = true; // true = X, false = O (quem joga)
let gameActive = true; // Se o jogo está ativo ou acabou

// Combinações possíveis de vitória
const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8], // Linhas
  [0,3,6],[1,4,7],[2,5,8], // Colunas
  [0,4,8],[2,4,6]           // Diagonais
];

// ================== RESET DO TABULEIRO ==================
function resetBoard() {
  cells.forEach(cell => cell.textContent = ""); // Limpa todas as células
  gameActive = true; // Reativa o jogo
  xTurn = true; // X sempre começa
  resultadoDiv.textContent = ""; // Limpa mensagem de resultado
  // Adiciona evento de clique em cada célula
  cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
}

// ================== CLICK NA CÉLULA ==================
function handleClick(e) {
  if(!gameActive) return; // Se o jogo acabou, não faz nada

  const cell = e.target; // Célula clicada
  const currentClass = xTurn ? 'X' : 'O'; // Define X ou O
  cell.textContent = currentClass; // Coloca X ou O na célula

  if(checkWin(currentClass)) { // Checa vitória
    resultadoDiv.textContent = xTurn ? "X venceu!" : "O venceu!";
    gameActive = false; // Para o jogo
    return;
  }

  if(isDraw()) { // Checa empate
    resultadoDiv.textContent = "Empate!";
    gameActive = false; // Para o jogo
    return;
  }

  xTurn = !xTurn; // Troca jogador
}

// ================== CHECAR VITÓRIA ==================
function checkWin(currentClass) {
  // Checa todas as combinações
  return winningCombinations.some(combination => 
    combination.every(index => cells[index].textContent === currentClass)
  );
}

// ================== CHECAR EMPATE ==================
function isDraw() {
  return [...cells].every(cell => cell.textContent); // Todas células preenchidas?
}

// ================== BOTÃO REINICIAR ==================
reiniciarBtn.addEventListener('click', resetBoard); // Ao clicar, reseta o jogo

// ================== INICIALIZAÇÃO ==================
resetBoard(); // Começa o jogo
