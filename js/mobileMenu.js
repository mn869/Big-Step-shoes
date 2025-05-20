// Mobile menu functionality
export function setupMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const header = document.querySelector('.header');
  
  // If there's already a mobile menu, don't create another one
  if (document.querySelector('.mobile-menu')) return;
  
  // Create the mobile menu element
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <div class="mobile-menu__content">
      <nav class="mobile-menu__nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#about">Our Story</a></li>
          <li><a href="#size-guide">Size Guide</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div class="mobile-menu__social">
        <a href="#" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </a>
      </div>
    </div>
  `;
  
  // Add styles for mobile menu
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .mobile-menu {
      position: fixed;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100vh;
      background-color: var(--color-black);
      z-index: 99;
      transition: left var(--transition-medium);
    }
    
    .mobile-menu.active {
      left: 0;
    }
    
    .mobile-menu__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: var(--space-4);
    }
    
    .mobile-menu__nav {
      margin-bottom: var(--space-4);
    }
    
    .mobile-menu__nav ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      text-align: center;
    }
    
    .mobile-menu__nav ul li a {
      color: var(--color-white);
      font-size: 1.5rem;
      font-weight: 500;
      transition: color var(--transition-fast);
      display: inline-block;
      padding: var(--space-1) 0;
      position: relative;
    }
    
    .mobile-menu__nav ul li a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--color-gold);
      transition: width var(--transition-medium), left var(--transition-medium);
    }
    
    .mobile-menu__nav ul li a:hover,
    .mobile-menu__nav ul li a.active {
      color: var(--color-gold);
    }
    
    .mobile-menu__nav ul li a:hover::after,
    .mobile-menu__nav ul li a.active::after {
      width: 100%;
      left: 0;
    }
    
    .mobile-menu__social {
      display: flex;
      gap: var(--space-3);
    }
    
    .mobile-menu__social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--color-gray-800);
      color: var(--color-white);
      transition: all var(--transition-fast);
    }
    
    .mobile-menu__social a:hover {
      background-color: var(--color-gold);
      color: var(--color-black);
      transform: translateY(-3px);
    }
    
    /* Menu button animation */
    .menu-btn {
      z-index: 100;
    }
    
    .menu-btn.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    .menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-btn.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  `;
  document.head.appendChild(styleElement);
  
  // Append mobile menu to body
  document.body.appendChild(mobileMenu);
  
  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Update active link in mobile menu
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    
    const scrollPosition = window.scrollY + header.offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        mobileLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding navigation link
        const correspondingLink = mobileMenu.querySelector(`a[href="#${sectionId}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
    
    // Special case for hero section (home)
    if (scrollPosition < sections[0].offsetTop) {
      mobileLinks.forEach(link => link.classList.remove('active'));
      const homeLink = mobileMenu.querySelector('a[href="#home"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }
  
  // Update active link on scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Initialize active link
  updateActiveLink();
}