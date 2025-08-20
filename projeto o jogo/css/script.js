const cells = document.querySelector('[data-cell]');
cells.forEach(cell => {
    cell.addEventListener('click',() => {
        cell.textContent = 'x';
    });
});
console.lof('JAvaScript funcionando!')


