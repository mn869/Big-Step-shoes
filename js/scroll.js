// Scroll animations
export function initScrollAnimations() {
  // Elements to animate when they come into view
  const animatableElements = document.querySelectorAll('.about__content, .featured-item, .product-card, .testimonial, .newsletter__content');
  
  // Observer options
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // 15% of the element visible
  };
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);
  
  // Add CSS for animations
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Base animation styles */
    .about__content, .featured-item, .product-card, .testimonial, .newsletter__content {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    /* Animation for elements coming into view */
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Stagger animations for grid items */
    .featured-item.animate-in:nth-child(1) {
      transition-delay: 0.1s;
    }
    
    .featured-item.animate-in:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .featured-item.animate-in:nth-child(3) {
      transition-delay: 0.3s;
    }
    
    /* Stagger product cards */
    .product-card.animate-in:nth-child(1) { transition-delay: 0.1s; }
    .product-card.animate-in:nth-child(2) { transition-delay: 0.15s; }
    .product-card.animate-in:nth-child(3) { transition-delay: 0.2s; }
    .product-card.animate-in:nth-child(4) { transition-delay: 0.25s; }
    .product-card.animate-in:nth-child(5) { transition-delay: 0.3s; }
    .product-card.animate-in:nth-child(6) { transition-delay: 0.35s; }
    .product-card.animate-in:nth-child(7) { transition-delay: 0.4s; }
    .product-card.animate-in:nth-child(8) { transition-delay: 0.45s; }
    
    /* About section animations */
    .about__content .about__text {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .about__content .about__image {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
      transition-delay: 0.2s;
    }
    
    .about__content.animate-in .about__text,
    .about__content.animate-in .about__image {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(styleElement);
  
  // Start observing elements
  animatableElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add animation to about section elements
  const aboutContent = document.querySelector('.about__content');
  if (aboutContent) {
    observer.observe(aboutContent);
  }
}