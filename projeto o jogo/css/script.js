const cells = document.querySelectorAll('[data-cell]');
cells.forEach(cell => {
    });
let xTurn = true;
    cells.forEach(cell => {
        cell.addEventListener('click',() => {
            const currentClass = xTurn ? 'X' : 'O';
            cell.textContent = currentClass;
            xTurn = !xTurn;
        }, {once: true});
    });


