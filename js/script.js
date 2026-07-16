// ============================================
// Homepage slide navigation (hero <-> triptych)
// ============================================
const track = document.getElementById('snapTrack');
let onSecondScreen = false;

document.querySelectorAll('.scroll-indicator').forEach(arrow => {
  arrow.addEventListener('click', (e) => {
    e.preventDefault();
    onSecondScreen = !onSecondScreen;
    track.style.transform = onSecondScreen ? 'translateY(-50%)' : 'translateY(0)';
  });
});

// ============================================
// Hero card — shared reference + capability check
// ============================================
const heroCard = document.getElementById('heroCard');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ============================================
// Hero card — auto-advancing carousel
// ============================================
const heroCharacters = [
  { name: "Abel", image: "assets/Abel Illustration.jpg" },
  { name: "The Water Goddess", image: "assets/Water Goddess Exclusive .jpg" },
  { name: "M'ralda", image: "assets/M_ralda Illustration.jpg" }
];

let heroIndex = 0;
const heroImgEl = document.getElementById('heroCardImg');
const heroNameEl = document.getElementById('heroCardName');
const heroIndexEl = document.getElementById('heroCardIndex');
let heroInterval;

function updateHeroCard() {
  const char = heroCharacters[heroIndex];
  heroImgEl.style.opacity = 0;

  setTimeout(() => {
    heroImgEl.src = char.image;
    heroNameEl.textContent = char.name;
    heroIndexEl.textContent = `${String(heroIndex + 1).padStart(2, '0')}/${String(heroCharacters.length).padStart(2, '0')}`;
    heroImgEl.style.opacity = 1;
  }, 400);
}

function startHeroCarousel() {
  heroInterval = setInterval(() => {
    heroIndex = (heroIndex + 1) % heroCharacters.length;
    updateHeroCard();
  }, 4000);
}

function stopHeroCarousel() {
  clearInterval(heroInterval);
}

if (heroCard) {
  startHeroCarousel();
}

// ============================================
// Hero card — flip (hover/click) + mouse-tilt on desktop
// ============================================
if (heroCard) {
  if (supportsHover) {
    heroCard.addEventListener('mouseenter', () => {
      heroCard.classList.add('flipped');
      stopHeroCarousel();
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.classList.remove('flipped');
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
      startHeroCarousel();
    });

    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = -((y - centerY) / centerY) * 8;

      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  } else {
    heroCard.addEventListener('click', () => {
      heroCard.classList.toggle('flipped');
      stopHeroCarousel();
    });
  }
}