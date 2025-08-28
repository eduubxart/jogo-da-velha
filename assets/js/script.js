// ============================
// SELEÇÃO DE ELEMENTOS DO DOM
// ============================
const cells = document.querySelectorAll('[data-cell]');
const reiniciarBtn = document.getElementById('reiniciar');
const resultadoDiv = document.getElementById('resultado');
const btnJogar = document.getElementById('btn-jogar');
const usuario1Input = document.getElementById('usuario-1');
const usuario2Input = document.getElementById('usuario-2');
const proximoJogadorSpan = document.getElementById('proximo-jogador');

// ============================
// VARIÁVEIS DE CONTROLE
// ============================
let xTurn = true;
let gameActive = false;
let player1 = "";
let player2 = "";
const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// ============================
// INÍCIO DO JOGO
// ============================
btnJogar.addEventListener('click', () => {
  player1 = usuario1Input.value || "Player 1";
  player2 = usuario2Input.value || "Player 2";

  document.getElementById('nome-player1').textContent = player1;
  document.getElementById('nome-player2').textContent = player2;

  document.querySelector('.painel-opcoes').classList.remove('esconder');
  document.querySelector('.opcoes-jogo').classList.add('esconder');

  resultadoDiv.textContent = "";
  xTurn = true;
  gameActive = true;

  cells.forEach(cell => cell.textContent = "");
  updateProximoJogador();
  addCellListeners();
});

// ============================
// ADICIONAR EVENTO DE CLIQUE NAS CÉLULAS
// ============================
function addCellListeners() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
}

// ============================
// MANIPULA CLIQUE NAS CÉLULAS
// ============================
function handleClick(e) {
  if(!gameActive) return;

  const cell = e.target;
  const currentClass = xTurn ? 'X' : 'O';
  cell.textContent = currentClass;

  if(checkWin(currentClass)) {
    const winnerName = xTurn ? player1 : player2;
    resultadoDiv.textContent = `${winnerName} venceu!`; // mostra apenas o jogador
    gameActive = false;
    return;
  }

  if(isDraw()) {
    resultadoDiv.textContent = "Empate!";
    gameActive = false;
    return;
  }

  xTurn = !xTurn;
  updateProximoJogador();
}

// ============================
// VERIFICA SE HOUVE VITÓRIA
// ============================
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === currentClass);
  });
}

// ============================
// VERIFICA SE HOUVE EMPATE
// ============================
function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

// ============================
// ATUALIZA PAINEL PRÓXIMO JOGADOR
// ============================
function updateProximoJogador() {
  if (xTurn) {
    proximoJogadorSpan.textContent = player1;
    proximoJogadorSpan.classList.add('player1-turn', 'pulse');
    proximoJogadorSpan.classList.remove('player2-turn');
  } else {
    proximoJogadorSpan.textContent = player2;
    proximoJogadorSpan.classList.add('player2-turn', 'pulse');
    proximoJogadorSpan.classList.remove('player1-turn');
  }
}

// ============================
// BOTÃO REINICIAR
// ============================
reiniciarBtn.addEventListener('click', () => {
  gameActive = true;
  xTurn = true;
  resultadoDiv.textContent = "";
  cells.forEach(cell => cell.textContent = "");
  updateProximoJogador();
  addCellListeners();
});
