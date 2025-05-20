// Handle header scroll effects
export function initHeaderScroll() {
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');
  
  // Update header appearance based on scroll position
  function updateHeaderOnScroll() {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 500; // Fallback value if no hero
    
    // Add or remove the scrolled class based on scroll position
    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Optional: Adjust header transparency when scrolling through hero
    if (heroSection) {
      const opacity = Math.min(scrollPosition / (heroHeight * 0.5), 1);
      
      if (scrollPosition < heroHeight) {
        header.style.backgroundColor = `rgba(250, 250, 250, ${opacity})`;
        
        // Adjust text color for better contrast during transition
        if (opacity > 0.7) {
          header.querySelectorAll('a, button, .header__logo').forEach(el => {
            el.style.color = 'var(--color-black)';
          });
          
          header.querySelectorAll('.menu-btn span').forEach(span => {
            span.style.backgroundColor = 'var(--color-black)';
          });
        } else {
          header.querySelectorAll('a, button, .header__logo').forEach(el => {
            el.style.color = '';  // Reset to CSS default
          });
          
          header.querySelectorAll('.menu-btn span').forEach(span => {
            span.style.backgroundColor = '';  // Reset to CSS default
          });
        }
      }
    }
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav a');
    
    const scrollPosition = window.scrollY + header.offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding navigation link
        const correspondingLink = document.querySelector(`.header__nav a[href="#${sectionId}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
    
    // Special case for hero section (home)
    if (scrollPosition < sections[0].offsetTop) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.header__nav a[href="#home"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }
  
  // Attach scroll event handlers
  window.addEventListener('scroll', () => {
    updateHeaderOnScroll();
    updateActiveNavLink();
  });
  
  // Initialize header state
  updateHeaderOnScroll();
  updateActiveNavLink();
}