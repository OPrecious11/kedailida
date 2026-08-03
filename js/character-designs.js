const discipline = "character";

const packages = [
  {
    title: "SINGLE CHARACTER PACKAGE",
    dropdownValue: "Single Character Package",
    image: "assets/character-single.jpg",
    includes: [
      "1 Full Character Design",
      "Front view Character illustration",
      "Basic Outfit Design",
      "Character Personality Notes",
      "Simple Color Direction",
      "2 Facial Expression"
    ],
    deliverables: "PDF presentation sheets · High resolution JPG/PNG",
    bestFor: [
      "Early Planning",
      "Short sequences",
      "Indie productions",
      "Concept development"
    ]
  },
  {
    title: "STANDARD CHARACTER PACKAGE",
    dropdownValue: "Standard Character Package",
    image: "assets/character-standard.jpg",
    includes: [
      "Full Character Design sheet",
      "Front/Side/Back view",
      "Outfit and Custom Xploration",
      "5 facial expresion per character",
      "Personality & Archetype Breakdown",
      "Signature Props / Accessories",
      "Story aligned design note"
    ],
    deliverables: "PDF presentation sheets · High resolution JPG/PNG · Layered PSD",
    bestFor: [
      "Novel covers",
      "Publishing projects",
      "Comic development",
      "Visual storytelling pitches"
    ]
  },
  {
    title: "PREMIUM CHARACTER PACKAGE",
    dropdownValue: "Premium Character Package",
    image: "assets/character-premium.jpg",
    includes: [
      "To be updated"
    ],
    deliverables: "To be updated",
    bestFor: [
      "To be updated"
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

  const btn = document.getElementById('getThisBtn');
  if (btn) {
    btn.href = `start-project.html?discipline=${discipline}&package=${encodeURIComponent(pkg.dropdownValue)}`;
  }

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