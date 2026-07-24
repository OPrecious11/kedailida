document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('navWrap');
    if (!btn || !nav) return;
  
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    });
  
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  });