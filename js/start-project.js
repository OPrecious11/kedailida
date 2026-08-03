const packagesByDiscipline = {
  character: ["Single Character Package", "Standard Character Package", "Premium Character Package"],
  keyframe: ["Basic Storyboard Package", "Standard Keyframe Package", "Premium Cinematic Package"],
  promotional: ["Basic Promotional Package", "Standard Splash Art Package", "Premium Cinematic Campaign Package"],
  bookcover: ["Basic Illustration Package", "Standard Illustration Package", "Premium Illustration Package"],
  comic: ["Basic Comic Package", "Standard Comic Package", "Premium Comic Package"]
};

const disciplineLabels = {
  character: "Character Design",
  keyframe: "Keyframe & Storyboard",
  promotional: "Promotional",
  bookcover: "Book Cover",
  comic: "Comic Books"
};

const cards = document.querySelectorAll('.discipline-card');
const disciplineInput = document.getElementById('disciplineInput');
const packageSelect = document.getElementById('package');

function populatePackages(discipline) {
  packageSelect.innerHTML = '';
  packagesByDiscipline[discipline].forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg;
    opt.textContent = pkg;
    packageSelect.appendChild(opt);
  });
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const discipline = card.dataset.discipline;
    disciplineInput.value = disciplineLabels[discipline];
    populatePackages(discipline);
  });
});

populatePackages('character');

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const disciplineParam = params.get('discipline');
  const packageParam = params.get('package');

  if (disciplineParam && packagesByDiscipline[disciplineParam]) {
    const card = document.querySelector(`.discipline-card[data-discipline="${disciplineParam}"]`);
    if (card) {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      disciplineInput.value = disciplineLabels[disciplineParam];
      populatePackages(disciplineParam);

      if (packageParam) {
        const decoded = decodeURIComponent(packageParam);
        const matchExists = [...packageSelect.options].some(o => o.value === decoded);
        if (matchExists) {
          packageSelect.value = decoded;
        }
      }
    }
  }
}

applyUrlParams();

// Form submission via Formspree (AJAX, no page reload)
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusEl.textContent = "Thanks — your inquiry has been sent. We'll be in touch soon.";
      statusEl.classList.add('success');
      form.reset();
      populatePackages('character');
      cards.forEach(c => c.classList.remove('active'));
      cards[0].classList.add('active');
      disciplineInput.value = disciplineLabels.character;
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    statusEl.textContent = "Something went wrong — please try again or email us directly.";
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Inquiry';
  }
});