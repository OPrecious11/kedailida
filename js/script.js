const track = document.getElementById('snapTrack');
let onSecondScreen = false;

document.querySelectorAll('.scroll-indicator').forEach(arrow => {
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    onSecondScreen = !onSecondScreen;
    track.style.transform = onSecondScreen ? 'translateY(-50%)' : 'translateY(0)';
  });
});