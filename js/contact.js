const form = document.getElementById('contactMessageForm');
const submitBtn = document.getElementById('contactSubmitBtn');
const statusEl = document.getElementById('contactFormStatus');

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
      statusEl.textContent = "Thanks for reaching out — we'll get back to you soon.";
      statusEl.classList.add('success');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    statusEl.textContent = "Something went wrong — please try again or email us directly.";
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});