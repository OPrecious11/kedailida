const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 1) {
  setInterval(() => {
    let nextSlide = (currentHeroSlide + 1) % heroSlides.length;
    while (nextSlide !== currentHeroSlide && heroSlides[nextSlide].complete && !heroSlides[nextSlide].naturalWidth) {
      nextSlide = (nextSlide + 1) % heroSlides.length;
    }
    if (nextSlide === currentHeroSlide || !heroSlides[nextSlide].complete) return;
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = nextSlide;
    heroSlides[currentHeroSlide].classList.add('active');
  }, 6000);
}
