// Import modules
import { initProducts } from './products.js';
import { initTestimonials } from './testimonials.js';
import { initHeaderScroll } from './header.js';
import { initNewsletterForm } from './newsletter.js';
import { initCart } from './cart.js';
import { setupMobileMenu } from './mobileMenu.js';
import { initScrollAnimations } from './scroll.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initHeaderScroll();
  initProducts();
  initTestimonials();
  initNewsletterForm();
  initCart();
  setupMobileMenu();
  initScrollAnimations();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.querySelector('.menu-btn').classList.remove('active');
      }
    });
  });
});