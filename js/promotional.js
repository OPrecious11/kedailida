const discipline = "promotional";

const packages = [
  {
    title: "BASIC PROMOTIONAL PACKAGE",
    dropdownValue: "Basic Promotional Package",
    image: "assets/promotional-basic.jpg",
    includes: [
      "Single promotional illustration",
      "Basic Composition Development",
      "Character or Product Focus",
      "Simple Lighting & Atmosphere",
      "1 initial concept sketch",
      "1 Revision Round"
    ],
    deliverables: "Web ready export · High resolution JPG/PNG · Social media crop version",
    bestFor: [
      "Social media campaign",
      "Indie Launches",
      "Small Promotional Projects",
      "Online marketing"
    ]
  },
  {
    title: "STANDARD SPLASH ART PACKAGE",
    dropdownValue: "Standard Splash Art Package",
    image: "assets/promotional-standard.jpg",
    includes: [
      "Fully Rendered Splash illustration",
      "Cinematic Composition Design",
      "Character & Environment Integration",
      "Maximum of 2 characters",
      "Dynamic lighting & mood",
      "Story-Driven Visual Direction",
      "2 initial concept sketches & Revision rounds"
    ],
    deliverables: "Print & web-ready export · High resolution JPG/PNG · Presentation-ready files",
    bestFor: [
      "Game promotion",
      "Publishing campaigns",
      "Music visuals",
      "Trailer artwork",
      "Entertainment branding"
    ]
  },
  {
    title: "PREMIUM CINEMATIC CAMPAIGN PACKAGE",
    dropdownValue: "Premium Cinematic Campaign Package",
    image: "assets/promotional-premium.jpg",
    includes: [
      "Advance Cinematic Splash Artwork",
      "Large-Scale Narrative Composition",
      "Atmospheric Worldbuilding",
      "Dynamic Action & Character Acting",
      "Marketing-Oriented Visual Design",
      "Maximum of 3 Characters",
      "Campaign Adaptation Assets",
      "4 initial concept sketches & 3 Revision rounds"
    ],
    deliverables: "Banner & Promotional Adaptations · Full resolution JPG/PNG · Social media asset version · Print ready export · Organised file package",
    bestFor: [
      "Major launches",
      "AAA game campaigns",
      "Publishing promotions",
      "Collector editor campaigns",
      "Entertainment marketing"
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

  document.getElementById('getThisBtn').href =
    `start-project.html?discipline=${discipline}&package=${encodeURIComponent(pkg.dropdownValue)}`;

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