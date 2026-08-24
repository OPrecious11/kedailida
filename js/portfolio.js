const portfolioData = [
  { name: "Abel", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Abel Illustration.jpg" },
  { name: "M_ralda", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/M_ralda Illustration.jpg" },
  { name: "M_ralda", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/New Keyframe.jpg" },
  { name: "Jyamelah and Jha'kendr", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/New Keyframe2.jpg" },
  { name: "Jyamelah and Jha'kendr", tag: "Promotional", category: "promotional", image: "assets/New Keyframe2.jpg" },
  { name: "M_ralda", tag: "Promotional", category: "promotional", image: "assets/New Keyframe.jpg" },
  { name: "Jyamelah", tag: "Promotional", category: "promotional", image: "assets/Jyamelah- Pin up.jpg" },
  { name: "Dailida", tag: "Character Design", category: "character", image: "assets/CharacterDesign 06(Dailida).jpg" },
  { name: "Abel", tag: "Character Design", category: "character", image: "assets/Abel Detailed.jpg" },
  { name: "J'yamelah", tag: "Character Design", category: "character", image: "assets/J'yamelah Detailed.jpg" },
  { name: "Devil Hunter", tag: "Character Design", category: "character", image: "assets/CharacterDesign 02.jpg" },
  { name: "Devil Hunter", tag: "Character Design", category: "character", image: "assets/CharacterDesign 03.jpg" },
  { name: "Abel", tag: "Character Design", category: "character", image: "assets/Abel2.0.jpg" },
  { name: "M_ralda", tag: "Character Design", category: "character", image: "assets/CharacterDesign 08.jpg" },
  { name: "M_ralda", tag: "Character Design", category: "character", image: "assets/CharacterDesign 07.jpg" },
  { name: "Councilman", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Character Councilman .jpg" },
  { name: "Angel", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Angel Ascension copy.jpg" },
  { name: "Goddess", tag: "Character Design", category: "character", image: "assets/NewCharacter.jpg" },
  { name: "Goddess", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Water Goddess Exclusive .jpg" },
  { name: "Mercenary", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Painting Study 25-06-23 copy.jpg" },
];

const grid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const filterIndicator = document.getElementById('filterIndicator');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTag = document.getElementById('lightboxTag');
const lightboxName = document.getElementById('lightboxName');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const galleryEmptyBtn = document.getElementById('galleryEmptyBtn');

const emptyStateDisciplines = {
  bookcover: { discipline: "bookcover", package: "Basic Illustration Package" },
  comic: { discipline: "comic", package: "Basic Comic Package" }
};

let visibleIndices = portfolioData.map((_, i) => i);
let currentPos = 0;

function renderGrid() {
  grid.innerHTML = portfolioData.map((item, i) => `
    <div class="gallery-item" data-category="${item.category}" data-index="${i}">
      <img src="${item.image}" alt="${item.name}">
      <div class="gallery-item-caption">
        <span>${item.tag}</span>
        <h4>${item.name}</h4>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index)));
  });
}

function updateVisibleIndices(filter) {
  visibleIndices = portfolioData
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => filter === 'all' || item.category === filter)
    .map(({ i }) => i);
}

function showAtPos(pos) {
  currentPos = pos;
  const item = portfolioData[visibleIndices[currentPos]];
  lightboxImg.src = item.image;
  lightboxTag.textContent = item.tag;
  lightboxName.textContent = item.name;
}

function openLightbox(index) {
  currentPos = visibleIndices.indexOf(index);
  if (currentPos === -1) currentPos = 0;
  showAtPos(currentPos);
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

function nextImage() {
  showAtPos((currentPos + 1) % visibleIndices.length);
}

function prevImage() {
  showAtPos((currentPos - 1 + visibleIndices.length) % visibleIndices.length);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

function moveFilterIndicator(activeBtn) {
  filterIndicator.style.width = activeBtn.offsetWidth + 'px';
  filterIndicator.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveFilterIndicator(btn);

    const filter = btn.dataset.filter;
    updateVisibleIndices(filter);

    if (emptyStateDisciplines[filter]) {
      galleryGrid.style.display = 'none';
      galleryEmpty.classList.add('show');
      const { discipline, package: pkg } = emptyStateDisciplines[filter];
      galleryEmptyBtn.href = `start-project.html?discipline=${discipline}&package=${encodeURIComponent(pkg)}`;
    } else {
      galleryGrid.style.display = 'grid';
      galleryEmpty.classList.remove('show');

      document.querySelectorAll('.gallery-item').forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    }
  });
});

renderGrid();
moveFilterIndicator(filterBtns[0]);