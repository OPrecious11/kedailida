const tiles = document.querySelectorAll('.team-tile');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    tiles.forEach(t => t.classList.remove('expanded'));
    tile.classList.add('expanded');
  });
});