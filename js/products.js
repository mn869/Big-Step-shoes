// Products data - in a real application, this would come from an API or database
const productsData = [
  {
    id: 1,
    name: 'Classic Oxford Wingtip',
    category: 'Formal',
    price: 199,
    sizes: [10, 11, 12, 13, 14, 15],
    colors: ['black', 'brown', 'burgundy'],
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Urban Runner',
    category: 'Athletic',
    price: 179,
    sizes: [10, 11, 12, 13, 14, 15, 16],
    colors: ['black', 'navy', 'gray'],
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    tag: 'New'
  },
  {
    id: 3,
    name: 'Executive Loafer',
    category: 'Formal',
    price: 229,
    sizes: [10, 11, 12, 13, 14],
    colors: ['black', 'brown'],
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
  },
  {
    id: 4,
    name: 'Leather Chelsea Boot',
    category: 'Boots',
    price: 249,
    sizes: [10, 11, 12, 13, 14, 15, 16],
    colors: ['black', 'brown', 'burgundy'],
    image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg',
    tag: 'Premium'
  },
  {
    id: 5,
    name: 'Weekend Casual',
    category: 'Casual',
    price: 159,
    sizes: [10, 11, 12, 13, 14, 15],
    colors: ['navy', 'gray', 'brown'],
    image: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg'
  },
  {
    id: 6,
    name: 'Hiking Trail Boot',
    category: 'Boots',
    price: 189,
    sizes: [10, 11, 12, 13, 14, 15, 16, 17],
    colors: ['brown', 'black'],
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
  },
  {
    id: 7,
    name: 'Formal Cap Toe',
    category: 'Formal',
    price: 219,
    sizes: [10, 11, 12, 13, 14, 15],
    colors: ['black', 'brown'],
    image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg'
  },
  {
    id: 8,
    name: 'Comfort Walker',
    category: 'Casual',
    price: 149,
    sizes: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    colors: ['black', 'brown', 'navy'],
    image: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg',
    tag: 'Extended Sizes'
  }
];

// Initialize and manage product display
export function initProducts() {
  const productsGrid = document.getElementById('products-grid');
  const styleFilter = document.getElementById('style-filter');
  const sizeFilter = document.getElementById('size-filter');
  const colorFilter = document.getElementById('color-filter');
  const loadMoreBtn = document.getElementById('load-more');
  
  let visibleProducts = 4; // Initial number of products to show
  
  // Create and append product cards
  function renderProducts(products, limit) {
    productsGrid.innerHTML = ''; // Clear current products
    
    // Get products to display based on current limit
    const productsToShow = products.slice(0, limit);
    
    // Create product cards
    productsToShow.forEach(product => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });
    
    // Show/hide load more button based on whether there are more products
    if (products.length <= limit) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }
  
  // Create a product card element
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add color options HTML
    let colorOptionsHTML = '';
    product.colors.forEach(color => {
      colorOptionsHTML += `<span class="color-option color-${color}" data-color="${color}"></span>`;
    });
    
    // Add size options as a string
    const sizeOptions = product.sizes.join(', ');
    
    // Create card HTML
    card.innerHTML = `
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}">
        ${product.tag ? `<div class="product-card__tag">${product.tag}</div>` : ''}
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${product.name}</h3>
        <div class="product-card__category">${product.category} • Sizes ${sizeOptions}</div>
        <div class="product-card__price">$${product.price}</div>
        <div class="product-card__colors">
          ${colorOptionsHTML}
        </div>
        <button class="btn btn-add-cart" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;
    
    // Add event listener to the "Add to Cart" button
    card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-product-id');
      addToCart(productId);
    });
    
    return card;
  }
  
  // Filter products based on selected criteria
  function filterProducts() {
    const selectedStyle = styleFilter.value;
    const selectedSize = sizeFilter.value;
    const selectedColor = colorFilter.value;
    
    let filteredProducts = [...productsData];
    
    // Filter by style
    if (selectedStyle !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === selectedStyle.toLowerCase()
      );
    }
    
    // Filter by size
    if (selectedSize !== 'all') {
      const [minSize, maxSize] = selectedSize.split('-').map(Number);
      
      if (maxSize) {
        // Range like 10-11
        filteredProducts = filteredProducts.filter(product => 
          product.sizes.some(size => size >= minSize && size <= maxSize)
        );
      } else if (selectedSize === '16+') {
        // 16+ (sizes 16 and above)
        filteredProducts = filteredProducts.filter(product => 
          product.sizes.some(size => size >= 16)
        );
      }
    }
    
    // Filter by color
    if (selectedColor !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.colors.includes(selectedColor)
      );
    }
    
    // Reset visible products count when filters change
    visibleProducts = 4;
    
    // Render the filtered products
    renderProducts(filteredProducts, visibleProducts);
  }
  
  // Add product to cart (simplified - in a real app this would update a cart state/database)
  function addToCart(productId) {
    const product = productsData.find(p => p.id === parseInt(productId));
    
    if (product) {
      // Get current cart or initialize empty array
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Add product to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show notification
      showNotification(`${product.name} added to cart!`);
    }
  }
  
  // Update cart count in the header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }
  
  // Show notification when product is added to cart
  function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    
    // Set message and show
    notification.textContent = message;
    notification.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('active');
    }, 3000);
  }
  
  // Set up event listeners
  styleFilter.addEventListener('change', filterProducts);
  sizeFilter.addEventListener('change', filterProducts);
  colorFilter.addEventListener('change', filterProducts);
  
  loadMoreBtn.addEventListener('click', () => {
    visibleProducts += 4; // Show 4 more products
    
    // Apply current filters to updated count
    filterProducts();
  });
  
  // Initial render of products
  renderProducts(productsData, visibleProducts);
  
  // Initial cart count update
  updateCartCount();
  
  // Add CSS for the notification
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
    .notification {
      position: fixed;
      bottom: -100px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--color-black);
      color: var(--color-white);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      z-index: 1000;
      opacity: 0;
      transition: bottom 0.3s ease, opacity 0.3s ease;
    }
    
    .notification.active {
      bottom: 20px;
      opacity: 1;
    }
  `;
  document.head.appendChild(notificationStyle);
}