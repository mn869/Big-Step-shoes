// Cart functionality
export function initCart() {
  // Get cart elements
  const cartBtn = document.querySelector('.cart-btn');
  const cartCount = document.querySelector('.cart-count');
  
  // Initialize cart if it doesn't exist in localStorage
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  
  // Update cart count
  updateCartCount();
  
  // Add event listener to cart button
  cartBtn.addEventListener('click', toggleCart);
  
  // Create cart modal if it doesn't exist
  let cartModal = document.querySelector('.cart-modal');
  if (!cartModal) {
    createCartModal();
    cartModal = document.querySelector('.cart-modal');
    
    // Add event listener to close button
    const closeBtn = cartModal.querySelector('.cart-modal__close');
    closeBtn.addEventListener('click', toggleCart);
    
    // Add event listener to checkout button
    const checkoutBtn = cartModal.querySelector('.cart-modal__checkout');
    checkoutBtn.addEventListener('click', checkout);
  }
  
  // Listen for add to cart events from product page
  document.addEventListener('add-to-cart', updateCartCount);
  
  // Create cart modal
  function createCartModal() {
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
      <div class="cart-modal__content">
        <div class="cart-modal__header">
          <h2>Your Cart</h2>
          <button class="cart-modal__close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="cart-modal__items">
          <!-- Cart items will be populated here -->
        </div>
        <div class="cart-modal__empty">
          <p>Your cart is empty.</p>
          <a href="#products" class="btn btn-secondary">Shop Now</a>
        </div>
        <div class="cart-modal__footer">
          <div class="cart-modal__total">
            <span>Total:</span>
            <span class="cart-modal__total-price">$0.00</span>
          </div>
          <button class="cart-modal__checkout btn btn-primary">Checkout</button>
        </div>
      </div>
    `;
    document.body.appendChild(cartModal);
    
    // Add style for cart modal
    const style = document.createElement('style');
    style.textContent = `
      .cart-modal {
        position: fixed;
        top: 0;
        right: -400px;
        width: 100%;
        max-width: 400px;
        height: 100vh;
        background-color: var(--color-white);
        box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: right var(--transition-medium);
      }
      
      .cart-modal.active {
        right: 0;
      }
      
      .cart-modal__content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--space-3);
      }
      
      .cart-modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: var(--space-3);
        border-bottom: 1px solid var(--color-gray-200);
      }
      
      .cart-modal__close {
        color: var(--color-gray-600);
        transition: color var(--transition-fast);
      }
      
      .cart-modal__close:hover {
        color: var(--color-black);
      }
      
      .cart-modal__items {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-2) 0;
      }
      
      .cart-modal__item {
        display: flex;
        padding: var(--space-2) 0;
        border-bottom: 1px solid var(--color-gray-200);
      }
      
      .cart-modal__item-image {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-right: var(--space-2);
      }
      
      .cart-modal__item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .cart-modal__item-details {
        flex: 1;
      }
      
      .cart-modal__item-name {
        font-weight: 500;
        margin-bottom: var(--space-1);
      }
      
      .cart-modal__item-price {
        color: var(--color-gray-700);
        font-size: 0.875rem;
      }
      
      .cart-modal__item-quantity {
        display: flex;
        align-items: center;
        margin-top: var(--space-1);
      }
      
      .cart-modal__item-quantity button {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-gray-100);
        border-radius: var(--radius-sm);
      }
      
      .cart-modal__item-quantity span {
        padding: 0 var(--space-1);
      }
      
      .cart-modal__item-remove {
        color: var(--color-error);
        font-size: 0.75rem;
        margin-top: var(--space-1);
        cursor: pointer;
      }
      
      .cart-modal__empty {
        display: none;
        text-align: center;
        padding: var(--space-4) 0;
      }
      
      .cart-modal__empty p {
        margin-bottom: var(--space-2);
        color: var(--color-gray-600);
      }
      
      .cart-modal__footer {
        padding-top: var(--space-3);
        border-top: 1px solid var(--color-gray-200);
      }
      
      .cart-modal__total {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--space-2);
        font-weight: 700;
      }
      
      .cart-modal__checkout {
        width: 100%;
      }
      
      /* Backdrop for mobile */
      .cart-backdrop {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
      
      .cart-backdrop.active {
        display: block;
      }
      
      @media (max-width: 480px) {
        .cart-modal {
          max-width: 300px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Toggle cart visibility
  function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    const backdrop = document.querySelector('.cart-backdrop') || createBackdrop();
    
    cartModal.classList.toggle('active');
    backdrop.classList.toggle('active');
    
    // Render cart items when opening
    if (cartModal.classList.contains('active')) {
      renderCartItems();
    }
  }
  
  // Create backdrop for mobile view
  function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cart-backdrop';
    backdrop.addEventListener('click', toggleCart);
    document.body.appendChild(backdrop);
    return backdrop;
  }
  
  // Update cart count in the header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }
  
  // Render cart items
  function renderCartItems() {
    const cartItems = document.querySelector('.cart-modal__items');
    const emptyCart = document.querySelector('.cart-modal__empty');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear current items
    cartItems.innerHTML = '';
    
    // Show empty cart message if no items
    if (cart.length === 0) {
      cartItems.style.display = 'none';
      emptyCart.style.display = 'block';
      document.querySelector('.cart-modal__footer').style.display = 'none';
      return;
    }
    
    // Hide empty cart message and show items + footer
    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';
    document.querySelector('.cart-modal__footer').style.display = 'block';
    
    // Render each item
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-modal__item';
      cartItem.innerHTML = `
        <div class="cart-modal__item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-modal__item-details">
          <div class="cart-modal__item-name">${item.name}</div>
          <div class="cart-modal__item-price">$${item.price}</div>
          <div class="cart-modal__item-quantity">
            <button class="quantity-decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-increase" data-index="${index}">+</button>
          </div>
          <div class="cart-modal__item-remove" data-index="${index}">Remove</div>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-decrease').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.index), -1));
    });
    
    document.querySelectorAll('.quantity-increase').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.index), 1));
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-modal__item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.index)));
    });
    
    // Update total
    updateTotal();
  }
  
  // Update item quantity
  function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
      cart[index].quantity = Math.max(1, cart[index].quantity + change);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
    }
  }
  
  // Remove item from cart
  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Update total price
  function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElement = document.querySelector('.cart-modal__total-price');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Checkout function (simplified)
  function checkout() {
    alert('Checkout functionality would connect to a payment processor in a real application.');
    // Clear cart after checkout
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    renderCartItems();
  }
}