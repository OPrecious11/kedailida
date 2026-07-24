const packagesByDiscipline = {
    character: ["Single Character Package", "Standard Character Package", "Premium Character Package"],
    keyframe: ["Basic Storyboard Package", "Standard Keyframe Package", "Premium Cinematic Package"],
    promotional: ["Basic Illustration Package", "Standard Illustration Package", "Premium Illustration Package"],
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

  const fileInput = document.getElementById('attachment');
const fileNameDisplay = document.getElementById('fileUploadName');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);

    if (file.size > 10 * 1024 * 1024) {
      fileNameDisplay.textContent = 'File too large (max 10MB)';
      fileNameDisplay.style.color = '#D97070';
      fileInput.value = '';
    } else {
      fileNameDisplay.textContent = `${file.name} (${sizeMB}MB)`;
      fileNameDisplay.style.color = 'rgba(255,255,255,0.85)';
    }
  } else {
    fileNameDisplay.textContent = 'No file selected';
    fileNameDisplay.style.color = 'rgba(255,255,255,0.55)';
  }
});
  
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
        fileNameDisplay.textContent = 'No file selected';
        fileNameDisplay.style.color = 'rgba(255,255,255,0.55)';
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