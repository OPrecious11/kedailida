(function () {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
  
    const duration = parseInt(loader.dataset.duration, 10) || 2500;
  
    function hideLoader() {
      loader.classList.add('loader-hide');
      setTimeout(() => loader.remove(), 700);
    }
  
    setTimeout(hideLoader, duration);
  })();