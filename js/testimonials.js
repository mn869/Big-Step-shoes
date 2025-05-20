// Initialize and control testimonials slider
export function initTestimonials() {
  const slider = document.getElementById('testimonials-slider');
  const slides = slider.querySelectorAll('.testimonials__slide');
  const dots = document.getElementById('testimonial-dots').querySelectorAll('.dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Set up autoplay timer
  let autoplayTimer;
  const autoplayDelay = 5000; // 5 seconds
  
  // Show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected slide
    slides[index].classList.add('active');
    
    // Activate the corresponding dot
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Navigate to the next slide
  function nextSlide() {
    let next = currentSlide + 1;
    
    // Wrap around to the first slide if we're at the end
    if (next >= totalSlides) {
      next = 0;
    }
    
    showSlide(next);
  }
  
  // Navigate to the previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    
    // Wrap around to the last slide if we're at the beginning
    if (prev < 0) {
      prev = totalSlides - 1;
    }
    
    showSlide(prev);
  }
  
  // Start autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }
  
  // Stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }
  
  // Set up event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    
    // Reset autoplay timer when manually navigating
    stopAutoplay();
    startAutoplay();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    
    // Reset autoplay timer when manually navigating
    stopAutoplay();
    startAutoplay();
  });
  
  // Set up dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      
      // Reset autoplay timer when manually navigating
      stopAutoplay();
      startAutoplay();
    });
  });
  
  // Pause autoplay on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  
  // Start with the first slide and begin autoplay
  showSlide(0);
  startAutoplay();
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
  });
  
  // Add swipe support for touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    // Detect swipe direction
    if (touchEndX < touchStartX - 50) {
      // Swipe left - go to next slide
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right - go to previous slide
      prevSlide();
    }
    
    // Reset autoplay timer when swiping
    stopAutoplay();
    startAutoplay();
  }
}