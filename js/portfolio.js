const portfolioData = [
    { name: "Water Goddess", tag: "Character Design", category: "character", image: "assets/Water Goddess Exclusive .jpg", stats: { detail: 92, complexity: 80, color: 88 } },
    { name: "M_Ralda", tag: "Character Design", category: "character", image: "assets/M_ralda Illustration.jpg", stats: { detail: 88, complexity: 85, color: 90 } },
    { name: "Angel Ascension", tag: "Character Design", category: "character", image: "assets/Angel Ascension copy.jpg", stats: { detail: 90, complexity: 75, color: 82 } },
    { name: "Abel", tag: "Keyframe & Storyboard", category: "keyframe", image: "assets/Abel illustration.jpg", stats: { detail: 78, complexity: 88, color: 70 } },
    { name: "Councilman", tag: "Promotional", category: "promotional", image: "assets/Character Councilman .jpg", stats: { detail: 95, complexity: 82, color: 92 } },
    { name: "Mercenary", tag: "Book Cover", category: "bookcover", image: "assets/Painting Study 25-06-23 copy.jpg", stats: { detail: 85, complexity: 78, color: 86 } },
    { name: "Mercenary II", tag: "Comic Books", category: "comic", image: "assets/Painting Study 25-06-23 copy.jpg", stats: { detail: 80, complexity: 90, color: 75 } },
    { name: "Mercenary III", tag: "Character Design", category: "character", image: "assets/Painting Study 25-06-23 copy.jpg", stats: { detail: 93, complexity: 87, color: 89 } }
  ];
  
  let currentFilter = 'all';
  let currentIndex = 0;
  
  const filmstrip = document.getElementById('charFilmstrip');
  const previewImg = document.getElementById('previewImg');
  const previewTag = document.getElementById('previewTag');
  const previewName = document.getElementById('previewName');
  const statDetailFill = document.getElementById('statDetailFill');
  const statDetailVal = document.getElementById('statDetailVal');
  const statComplexityFill = document.getElementById('statComplexityFill');
  const statComplexityVal = document.getElementById('statComplexityVal');
  const statColorFill = document.getElementById('statColorFill');
  const statColorVal = document.getElementById('statColorVal');
  const filterButtons = document.querySelectorAll('.cs-filter-btn');
  const filterIndicator = document.getElementById('filterIndicator');

  function moveFilterIndicator(activeBtn) {
    filterIndicator.style.width = activeBtn.offsetWidth + 'px';
    filterIndicator.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
  }
  
  function getFilteredData() {
    return currentFilter === 'all'
      ? portfolioData
      : portfolioData.filter(item => item.category === currentFilter);
  }
  
  function renderFilmstrip() {
    const data = getFilteredData();
    filmstrip.innerHTML = '';
  
    data.forEach((item, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'char-thumb' + (i === currentIndex ? ' active' : '');
      thumb.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
      thumb.addEventListener('click', () => {
        currentIndex = i;
        updatePreview();
        renderFilmstrip();
      });
      filmstrip.appendChild(thumb);
    });
  }
  
  function updatePreview() {
    const data = getFilteredData();
    if (!data.length) return;
    const item = data[currentIndex] || data[0];
  
    previewImg.style.opacity = 0;
    setTimeout(() => {
      previewImg.src = item.image;
      previewTag.textContent = `${item.tag} — ${String(currentIndex + 1).padStart(2, '0')}/${String(data.length).padStart(2, '0')}`;
      previewName.textContent = item.name;
      previewImg.style.opacity = 1;
  
      statDetailFill.style.width = item.stats.detail + '%';
      statDetailVal.textContent = item.stats.detail + '%';
      statComplexityFill.style.width = item.stats.complexity + '%';
      statComplexityVal.textContent = item.stats.complexity + '%';
      statColorFill.style.width = item.stats.color + '%';
      statColorVal.textContent = item.stats.color + '%';
    }, 200);
  }
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentIndex = 0;
      renderFilmstrip();
      updatePreview();
      moveFilterIndicator(btn);
    });
  });

  const statsGlass = document.getElementById('charStatsGlass');
  const statsToggle = document.getElementById('charStatsToggle');

statsToggle.addEventListener('click', () => {
  statsGlass.classList.toggle('expanded');
});

moveFilterIndicator(filterButtons[0]);
  renderFilmstrip();
  updatePreview();