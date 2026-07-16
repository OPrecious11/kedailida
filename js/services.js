const chapterTrack = document.getElementById('chapterTrack');
const chapters = document.querySelectorAll('.chapter');
const dotsContainer = document.getElementById('chapterDots');
const navItems = document.querySelectorAll('.chapter-nav-item');
const navIndicator = document.getElementById('navIndicator');
const total = chapters.length;
let current = 0;

chapters.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

function moveNavIndicator(activeItem) {
  navIndicator.style.width = activeItem.offsetWidth + 'px';
  navIndicator.style.transform = `translateX(${activeItem.offsetLeft - 6}px)`;
}

function goTo(index) {
  current = Math.max(0, Math.min(index, total - 1));
  chapterTrack.style.transform = `translateY(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  navItems.forEach((n, i) => n.classList.toggle('active', i === current));
  moveNavIndicator(navItems[current]);
}

navItems.forEach(item => {
  item.addEventListener('click', () => goTo(parseInt(item.dataset.index)));
});

moveNavIndicator(navItems[0]);
goTo(0);