const packages = [
    {
      title: "BASIC STORYBOARD PACKAGE",
      image: "assets/keyframe-basic.jpg",
      includes: [
        "20 Rough Storyboard Frames",
        "Basic Camera Composition",
        "Scene Blocking",
        "Strict Direction Notes",
        "Black & White Layouts",
        "1 Revision Round"
      ],
      deliverables: "PDF storyboard sheets · JPG/PNG exports",
      bestFor: [
        "Early Planning",
        "Short sequences",
        "Indie productions",
        "Concept development"
      ]
    },
    {
      title: "STANDARD KEYFRAME PACKAGE",
      image: "assets/keyframe-standard.jpg",
      includes: [
        "20 Rough cinematic storyboard keyframe illustrations",
        "Shot composition development",
        "Lighting & Mood direction",
        "Character and environment integration",
        "Color development",
        "2 Revision Rounds"
      ],
      deliverables: "High-resolution keyframes · Organized PDF package",
      bestFor: [
        "Animation Pitches",
        "Game Development",
        "Vision-setting presentations",
        "Trailer concepts"
      ]
    },
    {
      title: "PREMIUM CINEMATIC PACKAGE",
      image: "assets/keyframe-premium.jpg",
      includes: [
        "20 fully rendered cinematic keyframe sequence",
        "Advanced storyboarding",
        "Scene continuity planning",
        "Camera & composition direction",
        "Atmosphere & lighting setup",
        "Character acting & emotion beats",
        "Visual narrative development",
        "3 Revision Rounds"
      ],
      deliverables: "Full-resolution PDF · PSD source files · High-res exports",
      bestFor: [
        "Films",
        "Cinematic trailers",
        "Animation pitch decks",
        "AAA game pitches",
        "Narrative campaigns"
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