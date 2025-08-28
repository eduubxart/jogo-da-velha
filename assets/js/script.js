// ==============================
// SELEÇÃO DE ELEMENTOS
// ==============================
const cells = document.querySelectorAll('[data-cell]');
const reiniciarBtn = document.getElementById('reiniciar');
const resultadoDiv = document.getElementById('resultado');
const painel1 = document.getElementById('painel-player1');
const painel2 = document.getElementById('painel-player2');

let xTurn = true; // true = Player1, false = Player2
let gameActive = true; // Player 1 começa por padrão

// Combinações possíveis de vitória
const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// ================== FUNÇÃO RESET DO TABULEIRO ==================
function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.replaceWith(cell.cloneNode(true));
  });
  const newCells = document.querySelectorAll('[data-cell]');
  newCells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
  gameActive = true;
  resultadoDiv.textContent = "";
  updatePlayerHighlight();
}

// ================== CLICK NA CÉLULA ==================
function handleClick(e) {
  if(!gameActive) return;

  const cell = e.target;
  const currentClass = xTurn ? 'X' : 'O';
  cell.textContent = currentClass;

  if(checkWin(currentClass)) {
    resultadoDiv.textContent = xTurn ? "Player 1 venceu!" : "Player 2 venceu!";
    gameActive = false;
    return;
  }

  if(isDraw()) {
    resultadoDiv.textContent = "Empate!";
    gameActive = false;
    return;
  }

  xTurn = !xTurn;
  updatePlayerHighlight();
}

// ================== CHECAR VITÓRIA ==================
function checkWin(currentClass) {
  return winningCombinations.some(combination => 
    combination.every(index => cells[index].textContent === currentClass)
  );
}

// ================== CHECAR EMPATE ==================
function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

// ================== DESTAQUE DO PLAYER ==================
function updatePlayerHighlight() {
  if(xTurn) {
    painel1?.classList.add('player-atual');
    painel2?.classList.remove('player-atual');
  } else {
    painel2?.classList.add('player-atual');
    painel1?.classList.remove('player-atual');
  }
}

// ================== BOTÃO REINICIAR ==================
reiniciarBtn?.addEventListener('click', resetBoard);

// ================== INICIALIZAÇÃO ==================
resetBoard(); // inicia o jogo já com Player 1 ativo
