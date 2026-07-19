document.addEventListener('DOMContentLoaded', () => {
    const pageScroll = document.querySelector('.page-scroll');
    if (!pageScroll) return;
  
    // Every direct section/footer inside .page-scroll gets the effect,
    // except the very first one (the hero) — that should always be
    // visible immediately on load, not waiting to be scrolled into view.
    const sections = pageScroll.querySelectorAll(':scope > section, :scope > footer');
  
    sections.forEach((section, index) => {
      if (index === 0) return; // skip the hero
      section.classList.add('reveal-section');
    });
  
    if (!('IntersectionObserver' in window)) {
      // Fallback for very old browsers: just show everything immediately
      sections.forEach(s => s.classList.add('is-visible'));
      return;
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // only reveal once, don't re-hide on scroll up
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });
  
    sections.forEach(section => observer.observe(section));
  });