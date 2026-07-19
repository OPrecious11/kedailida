const params = new URLSearchParams(window.location.search);
const slug = params.get('role');
const job = openings.find(o => o.slug === slug);

const section = document.getElementById('roleDetailSection');

if (!job) {
  section.innerHTML = `
    <div class="role-not-found">
      <h1>Role Not Found</h1>
      <p>This position may no longer be open.</p>
      <a href="careers.html" class="about-btn-outline">Back to Careers</a>
    </div>
  `;
} else {
  const subject = encodeURIComponent(`Application: ${job.title}`);
  const mailtoLink = `mailto:${applyEmail}?subject=${subject}`;

  section.innerHTML = `
    <a href="careers.html" class="role-back-link">← Back to Careers</a>

    <span class="about-tag">${job.type} · ${job.location} · ${job.commitment}</span>
    <h1>${job.title}</h1>
    <p class="role-description">${job.description}</p>

    <div class="role-requirements-glass">
      <h4>What We're Looking For</h4>
      <ul>
        ${job.requirements.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>

    <div class="role-apply-glass">
      <h4>How to Apply</h4>
      <p>Send your portfolio and a short note about yourself to <strong>${applyEmail}</strong>. Include the role title in your subject line so it reaches the right inbox.</p>
      <a href="${mailtoLink}" class="about-btn-solid">Email Your Portfolio</a>
    </div>
  `;
}