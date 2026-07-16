const packages = [
    {
      title: "BASIC ILLUSTRATION PACKAGE",
      image: "assets/bookcover-basic.jpg",
      includes: [
        "Single Front Cover Illustration",
        "Simple Character or Environment Composition",
        "Basic Lighting & Color Development",
        "1 Initial Concept Sketch",
        "1 Revision Round"
      ],
      deliverables: "Web-ready export · High resolution JPG/PNG",
      bestFor: [
        "E-books",
        "Indie Authors",
        "Novellas",
        "Minimalist Cover Projects"
      ]
    },
    {
      title: "STANDARD ILLUSTRATION PACKAGE",
      image: "assets/bookcover-standard.jpg",
      includes: [
        "Fully Rendered Front Cover Illustration",
        "Cinematic Composition Design",
        "Character & Environment Integration",
        "Maximum of 2 Characters",
        "Lighting & Mood Exploration",
        "Story-Based Visual Direction",
        "2 Revision Rounds"
      ],
      deliverables: "Print & web-ready export · High resolution JPG/PNG · Print-ready files",
      bestFor: [
        "Paperback Releases",
        "Fantasy, Romance, Sci-fi & Thriller Novels",
        "Self-publishing Campaigns"
      ]
    },
    {
      title: "PREMIUM ILLUSTRATION PACKAGE",
      image: "assets/bookcover-premium.jpg",
      includes: [
        "Fully Cinematic Book Cover Illustration",
        "Advanced Character Rendering",
        "Environment & Atmospheric Detailing",
        "Scene Expansion Illustration",
        "Hardcover Dust Jacket Illustration",
        "Narrative-Based Composition Design",
        "Emotional Storytelling Direction",
        "Dynamic Lighting & Color Styling and more"
      ],
      deliverables: "Promotional assets · Full resolution JPG/PNG · Social media adaptation files · Organized file package",
      bestFor: [
        "Publishing Houses",
        "Collector Editions",
        "Premium Storytelling Projects",
        "Marketing Campaigns"
      ]
    }
  ];
  
  let currentIndex = 0;
  
  const imgEl = document.getElementById('exploreImg');
  const titleEl = document.getElementById('exploreTitle');
  const includesEl = document.getElementById('exploreIncludes');
  const deliverablesEl = document.getElementById('exploreDeliverables');
  const bestForEl = document.getElementById('exploreBestFor');
  const tabs = document.querySelectorAll('.explore-tab');
  const bodyEl = document.getElementById('exploreBody');
  const tabIndicator = document.getElementById('tabIndicator');
  
  function moveIndicator(activeTab) {
    tabIndicator.style.width = activeTab.offsetWidth + 'px';
    tabIndicator.style.transform = `translateX(${activeTab.offsetLeft - 6}px)`;
  }
  
  function render() {
    const pkg = packages[currentIndex];
  
    imgEl.src = pkg.image;
    titleEl.textContent = pkg.title;
    deliverablesEl.textContent = pkg.deliverables;
    includesEl.innerHTML = pkg.includes.map(item => `<li>${item}</li>`).join('');
    bestForEl.innerHTML = pkg.bestFor.map(item => `<li>${item}</li>`).join('');
  
    tabs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentIndex = parseInt(tab.dataset.index);
      render();
      moveIndicator(tab);
    });
  });
  
  moveIndicator(tabs[0]);
  render();