// Handle newsletter form submission
export function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const confirmation = document.getElementById('newsletter-confirmation');
  
  if (form && confirmation) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // Basic email validation
      if (email && isValidEmail(email)) {
        // Simulate API call for newsletter subscription
        // In a real application, this would call an API to store the email
        simulateAPICall(email)
          .then(response => {
            // Show confirmation message
            form.style.display = 'none';
            confirmation.style.display = 'block';
            
            // Save to local storage to remember subscription
            localStorage.setItem('newsletter_subscribed', 'true');
          })
          .catch(error => {
            alert('There was an error subscribing. Please try again.');
            console.error('Newsletter subscription error:', error);
          });
      } else {
        // Show error if email is invalid
        emailInput.classList.add('error');
        
        // Add shake animation
        emailInput.classList.add('shake');
        setTimeout(() => {
          emailInput.classList.remove('shake');
        }, 500);
      }
    });
    
    // Remove error class when typing again
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        this.classList.remove('error');
      });
    }
    
    // Check if user already subscribed and show appropriate view
    if (localStorage.getItem('newsletter_subscribed') === 'true') {
      form.style.display = 'none';
      confirmation.style.display = 'block';
    }
    
    // Add CSS for error and animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .newsletter__form input.error {
        border: 2px solid var(--color-error);
      }
      
      .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }
        20%, 80% {
          transform: translate3d(2px, 0, 0);
        }
        30%, 50%, 70% {
          transform: translate3d(-3px, 0, 0);
        }
        40%, 60% {
          transform: translate3d(3px, 0, 0);
        }
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Simulate API call with Promise
  function simulateAPICall(email) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // 95% success rate for demo purposes
        if (Math.random() > 0.05) {
          resolve({ success: true, message: 'Subscription successful' });
        } else {
          reject(new Error('Subscription failed'));
        }
      }, 1000);
    });
  }
  
  // Basic email validation
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}