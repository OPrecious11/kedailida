const portfolioData = [
  { name: "Abel", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/abel-illustration-detail.webp", thumbnail: "assets/optimized/abel-illustration-thumb.webp" },
  { name: "M_ralda", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/m-ralda-illustration-detail.webp", thumbnail: "assets/optimized/m-ralda-illustration-thumb.webp" },
  { name: "M_ralda", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/new-keyframe-detail.webp", thumbnail: "assets/optimized/new-keyframe-thumb.webp" },
  { name: "Jyamelah and Jha'kendr", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/new-keyframe2-detail.webp", thumbnail: "assets/optimized/new-keyframe2-thumb.webp" },
  { name: "Jyamelah and Jha'kendr", tag: "Promotional", category: "promotional", image: "assets/optimized/new-keyframe2-detail.webp", thumbnail: "assets/optimized/new-keyframe2-thumb.webp" },
  { name: "M_ralda", tag: "Promotional", category: "promotional", image: "assets/optimized/new-keyframe-detail.webp", thumbnail: "assets/optimized/new-keyframe-thumb.webp" },
  { name: "Jyamelah", tag: "Promotional", category: "promotional", image: "assets/optimized/jyamelah-pin-up-detail.webp", thumbnail: "assets/optimized/jyamelah-pin-up-thumb.webp" },
  { name: "Dailida", tag: "Character Design", category: "character", image: "assets/optimized/characterdesign-06-dailida-detail.webp", thumbnail: "assets/optimized/characterdesign-06-dailida-thumb.webp" },
  { name: "Abel", tag: "Character Design", category: "character", image: "assets/optimized/abel-detailed-detail.webp", thumbnail: "assets/optimized/abel-detailed-thumb.webp" },
  { name: "J'yamelah", tag: "Character Design", category: "character", image: "assets/optimized/j-yamelah-detailed-detail.webp", thumbnail: "assets/optimized/j-yamelah-detailed-thumb.webp" },
  { name: "Devil Hunter", tag: "Character Design", category: "character", image: "assets/optimized/characterdesign-02-detail.webp", thumbnail: "assets/optimized/characterdesign-02-thumb.webp" },
  { name: "Devil Hunter", tag: "Character Design", category: "character", image: "assets/optimized/characterdesign-03-detail.webp", thumbnail: "assets/optimized/characterdesign-03-thumb.webp" },
  { name: "Abel", tag: "Character Design", category: "character", image: "assets/optimized/abel2-0-detail.webp", thumbnail: "assets/optimized/abel2-0-thumb.webp" },
  { name: "M_ralda", tag: "Character Design", category: "character", image: "assets/optimized/characterdesign-08-detail.webp", thumbnail: "assets/optimized/characterdesign-08-thumb.webp" },
  { name: "M_ralda", tag: "Character Design", category: "character", image: "assets/optimized/characterdesign-07-detail.webp", thumbnail: "assets/optimized/characterdesign-07-thumb.webp" },
  { name: "Councilman", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/character-councilman-detail.webp", thumbnail: "assets/optimized/character-councilman-thumb.webp" },
  { name: "Angel", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/angel-ascension-copy-detail.webp", thumbnail: "assets/optimized/angel-ascension-copy-thumb.webp" },
  { name: "Goddess", tag: "Character Design", category: "character", image: "assets/optimized/newcharacter-detail.webp", thumbnail: "assets/optimized/newcharacter-thumb.webp" },
  { name: "Goddess", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/water-goddess-exclusive-detail.webp", thumbnail: "assets/optimized/water-goddess-exclusive-thumb.webp" },
  { name: "Mercenary", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/optimized/painting-study-25-06-23-copy-detail.webp", thumbnail: "assets/optimized/painting-study-25-06-23-copy-thumb.webp" },
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
      <img src="${item.thumbnail}" alt="${item.name}" loading="lazy" decoding="async">
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