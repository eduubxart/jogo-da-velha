const cells = document.querySelectorAll('[data-cell]');// pega todas as células
let xTurn = true;// indica de quem é a vez, x começa

// para cada célula do tabuleiro
    cells.forEach(cell => {
        cell.addEventListener('click',() => { // quando clicar na célula
            const currentClass = xTurn ? 'X' : 'O'; // escolhe X ou O
            cell.textContent = currentClass;// coloca o X ou O na célula
            xTurn = !xTurn;// troca a vez
        }, {once: true}); // só permite clicar uma vez na célula
    });
    // combinações possíveis de vitória
    const winningCombinations = [
        [0, 1, 2],// linha de cima
        [3, 4, 5],// linha do meio
        [6, 7, 8],// linha de baixo
        [0, 3, 6],// coluna da esquerda
        [1, 4, 7],// coluna do meio
        [2, 5, 8],// coluna da direita
        [0, 4, 8],// diagonal principal
        [2, 4, 6]// diagonal secundária
    ];
    // funçãoque verifica se algué, ganhou
    function checkWin(currentClass) { // currentClass = 'X' ou 'O'
        return winningCombinations.some(combination => { // some() reotrna true se pelo menos a combinão for verdadeira
            return combination,every(index => { // every() retorna true se todos os índices da combinação tiverem o mesmo símbulo
                return cells[index].textContent === currentClass; // verifica se a célula tem X ou O
            });
        });
    }


