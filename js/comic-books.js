const discipline = "comic";

const packages = [
  {
    title: "BASIC COMIC PACKAGE",
    dropdownValue: "Basic Comic Package",
    image: "assets/comic-basic.jpg",
    includes: [
      "1 Fully Illustrated Comic Page",
      "Basic Panel Layout",
      "Character Focus",
      "Simple Inking & Shading",
      "1 Revision Round"
    ],
    deliverables: "High resolution JPG/PNG · Print-ready export",
    bestFor: [
      "Short comics",
      "Web comics",
      "Indie creators",
      "Concept previews"
    ]
  },
  {
    title: "STANDARD COMIC PACKAGE",
    dropdownValue: "Standard Comic Package",
    image: "assets/comic-standard.jpg",
    includes: [
      "3 Fully Illustrated Comic Pages",
      "Dynamic Panel Layout",
      "Character & Background Integration",
      "Full Inking, Shading & Color",
      "Lettering Placement Guide",
      "2 Revision Rounds"
    ],
    deliverables: "High resolution JPG/PNG · Print-ready export · Layered PSD",
    bestFor: [
      "Comic issues",
      "Anthology submissions",
      "Crowdfunding previews",
      "Publisher pitches"
    ]
  },
  {
    title: "PREMIUM COMIC PACKAGE",
    dropdownValue: "Premium Comic Package",
    image: "assets/comic-premium.jpg",
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