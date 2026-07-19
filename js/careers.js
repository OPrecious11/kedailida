const listEl = document.getElementById('careersList');

if (openings.length === 0) {
  listEl.innerHTML = `
    <div class="careers-empty">
      <h3>No Open Roles Right Now</h3>
      <p>We're not actively hiring at the moment, but we're always happy to hear from talented artists. Send us your portfolio and we'll keep you in mind for future opportunities.</p>
      <a href="contact.html" class="career-apply-btn">Get in Touch</a>
    </div>
  `;
} else {
  listEl.innerHTML = openings.map(job => `
    <div class="career-card">
      <div class="career-card-info">
        <h3>${job.title}</h3>
        <div class="career-card-meta">
          <span class="career-tag">${job.type}</span>
          <span class="career-tag">${job.location}</span>
          <span class="career-tag">${job.commitment}</span>
        </div>
      </div>
      <a href="role-detail.html?role=${job.slug}" class="career-apply-btn">Apply Now</a>
    </div>
  `).join('');
}