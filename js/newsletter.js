document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletterForm');
    const statusEl = document.getElementById('newsletterStatus');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = '...';
  
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
  
        if (response.ok) {
          statusEl.textContent = "You're subscribed — thanks for joining!";
          statusEl.className = 'newsletter-status success';
          form.reset();
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        statusEl.textContent = 'Something went wrong — please try again.';
        statusEl.className = 'newsletter-status error';
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  });