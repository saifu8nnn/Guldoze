// Guldoze - Main JavaScript File with Enhanced Animations and Parallax Effects

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize everything after page load
  initPage();
});

// Initialize all functionality
function initPage() {
  // Initialize GSAP and ScrollTrigger first
  initGSAP();
  
  // Initialize parallax effects
  initParallax();
  
  // Initialize carousel
  initCarousel();
  
  // Initialize loading screen
  initLoadingScreen();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize shop filters
  initShopFilters();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize micro-interactions
  initMicroInteractions();
}

// Loading Screen Animation
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide loading screen after a delay
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      
      // Show hero content with staggered animation
      animateHeroContent();
    }, 500);
  }, 2000);
}

// Animate Hero Content
function animateHeroContent() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const ctaButton = document.querySelector('.cta-button');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const stitchedText = document.querySelector('.stitched-text');
  const brandName = document.querySelector('.brand-name');
  
  // Set initial states
  if (stitchedText) {
    stitchedText.style.opacity = '0';
    stitchedText.style.transform = 'translateY(20px)';
  }
  
  if (brandName) {
    brandName.style.opacity = '0';
    brandName.style.transform = 'translateY(30px)';
  }
  
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
  }
  
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(30px)';
  }
  
  if (ctaButton) {
    ctaButton.style.opacity = '0';
    ctaButton.style.transform = 'translateY(30px)';
  }
  
  if (scrollIndicator) {
    scrollIndicator.style.opacity = '0';
  }
  
  // Use GSAP to animate in
  if (stitchedText) {
    gsap.to(stitchedText, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.1
    });
  }
  
  if (brandName) {
    gsap.to(brandName, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.2
    });
  }
  
  if (heroTitle) {
    gsap.to(heroTitle, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.3
    });
  }
  
  if (heroSubtitle) {
    gsap.to(heroSubtitle, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.6
    });
  }
  
  if (ctaButton) {
    gsap.to(ctaButton, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.9
    });
  }
  
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      duration: 1,
      opacity: 1,
      delay: 1.2
    });
  }
}



// Navigation
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Change navbar style on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '20px 0';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Initialize parallax effects
function initParallax() {
  // Get all elements with data-speed attribute
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed');
      const yPos = -(scrollPosition * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Initialize micro-interactions
function initMicroInteractions() {
  // Add bounce effect to add-to-cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Add the 'added' class for animation
      this.classList.add('added');
      
      // Remove the class after animation completes
      setTimeout(() => {
        this.classList.remove('added');
      }, 500);
      
      // Show notification
      showNotification('Item added to cart!');
    });
  });
  
  // Add hover effects to product images
  const productImages = document.querySelectorAll('.product-image img');
  
  productImages.forEach(img => {
    // Store original src
    const originalSrc = img.src;
    
    // Create alternate image src (this would be different in a real implementation)
    // For demo purposes, we'll just add a filter effect
    img.addEventListener('mouseenter', function() {
      this.style.filter = 'brightness(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.filter = 'brightness(1)';
    });
  });
  
  // Add functionality for View Details buttons
  const viewProductButtons = document.querySelectorAll('.view-product');
  
  viewProductButtons.forEach(button => {
    button.addEventListener('click', function() {
      // In a real implementation, you would get the product ID from the button
      // For now, we'll use a placeholder and fetch product data from the backend
      const productId = this.closest('.product-card') ? 
        this.closest('.product-card').dataset.productId || 
        this.closest('.shop-item').dataset.productId : null;
      
      // If we can't determine the product ID, show an error
      if (!productId) {
        showNotification('Product information not available');
        return;
      }
      
      // Fetch product details from backend
      fetchProductDetails(productId);
    });
  });
  
  // Modal functionality
  const modal = document.getElementById('product-modal');
  const closeModal = document.querySelector('.close');
  
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Quantity selector functionality
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityDisplay = document.getElementById('quantity');
  
  if (decreaseBtn && increaseBtn && quantityDisplay) {
    decreaseBtn.addEventListener('click', function() {
      let quantity = parseInt(quantityDisplay.textContent);
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      let quantity = parseInt(quantityDisplay.textContent);
      // In a real implementation, you would check against stock
      if (quantity < 10) {
        quantity++;
        quantityDisplay.textContent = quantity;
      }
    });
  }
  
  // Add to cart functionality
  const addToCartBtn = document.getElementById('modal-add-to-cart');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const productId = this.dataset.productId;
      const quantity = parseInt(document.getElementById('quantity').textContent);
      
      if (productId) {
        addToCart(productId, quantity);
      }
    });
  }
}

// Initialize carousel
function initCarousel() {
  const carouselSlide = document.querySelector('.carousel-slide');
  const productCards = document.querySelectorAll('.product-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!carouselSlide || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const cardWidth = productCards[0].offsetWidth + 20; // width + gap
  const totalCards = productCards.length;
  
  // Set initial position
  carouselSlide.style.transform = `translateX(0px)`;
  
  // Next button click
  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 3) {
      currentIndex++;
      carouselSlide.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
  
  // Previous button click
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      carouselSlide.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
  
  // Auto slide every 4 seconds
  setInterval(() => {
    if (currentIndex < totalCards - 3) {
      currentIndex++;
      carouselSlide.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    } else {
      // Reset to beginning
      currentIndex = 0;
      carouselSlide.style.transform = `translateX(0px)`;
    }
  }, 4000);
}

// Initialize floating particles
function initParticles() {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  
  // Create 15 particles
  for (let i = 0; i < 15; i++) {
    createParticle(particlesContainer);
  }
}

// Create a single particle
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position
  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  
  // Random size
  const size = Math.random() * 6 + 2;
  
  // Random animation duration
  const duration = Math.random() * 20 + 10;
  
  // Random color variation
  const colors = [
    'var(--primary)',
    'var(--secondary)',
    'var(--accent)'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Apply styles
  particle.style.left = `${posX}px`;
  particle.style.top = `${posY}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  
  // Add to container
  container.appendChild(particle);
  
  // Remove and recreate particle after animation completes
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
      createParticle(container);
    }
  }, duration * 1000);
}

// Show notification toast
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification-toast';
  notification.textContent = message;
  
  // Add styles
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = 'var(--primary)';
  notification.style.color = 'var(--light)';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = '30px';
  notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '9999';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(20px)';
  notification.style.transition = 'all 0.3s ease';
  notification.style.fontSize = '0.9rem';
  
  // Add to document
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Shop Filters
function initShopFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const shopItems = document.querySelectorAll('.shop-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filter = btn.getAttribute('data-filter');
      
      // Filter items
      shopItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form fields
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');
      
      // Reset errors
      clearErrors(form);
      
      // Validate fields
      let isValid = true;
      
      if (name && !name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      }
      
      if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      if (message && !message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      }
      
      // Submit if valid
      if (isValid) {
        // In a real app, you would submit the form here
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      }
    });
  });
}

// Show error message
function showError(field, message) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  error.style.color = '#FF6B6B';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '5px';
  
  field.parentNode.appendChild(error);
  field.style.borderColor = '#FF6B6B';
}

// Clear error messages
function clearErrors(form) {
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
  
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(field => {
    field.style.borderColor = '#D2B48C';
  });
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Initialize Locomotive Scroll
function initLocomotiveScroll() {
  // Locomotive Scroll integration removed for performance
  // ScrollTrigger works better without smooth scrolling library
}

// Initialize GSAP animations with ScrollTrigger
function initGSAP() {
  // Check if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Refresh ScrollTrigger after images load
      window.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
      
      // ===== Hero Section Animations =====
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const ctaButton = document.querySelector('.cta-button');
      
      if (heroTitle) {
        gsap.from(heroTitle, {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.3
        });
      }
      
      if (heroSubtitle) {
        gsap.from(heroSubtitle, {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.6
        });
      }
      
      if (ctaButton) {
        gsap.from(ctaButton, {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.9
        });
      }
      
      // ===== About Section Animations =====
      const aboutText = document.querySelector('.about-text');
      if (aboutText) {
        gsap.from(aboutText, {
          scrollTrigger: {
            trigger: aboutText,
            start: 'top center+=100',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          x: -50,
          opacity: 0,
          ease: 'power2.out'
        });
      }
      
      const aboutStats = document.querySelector('.about-stats');
      if (aboutStats) {
        gsap.from(aboutStats, {
          scrollTrigger: {
            trigger: aboutStats,
            start: 'top center+=100',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          x: 50,
          opacity: 0,
          ease: 'power2.out'
        });
      }
      
      // Stagger stat items
      gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          },
          duration: 0.6,
          y: 40,
          opacity: 0,
          ease: 'back.out',
          delay: i * 0.1
        });
      });
      
      // ===== Featured Products Animations =====
      gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          },
          duration: 0.6,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          delay: i * 0.05
        });
      });
      
      // ===== Shop Items Animations =====
      gsap.utils.toArray('.shop-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=80',
            toggleActions: 'play none none none'
          },
          duration: 0.5,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          delay: (i % 3) * 0.05
        });
      });
      
      // ===== Gallery Items Animations =====
      gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          },
          duration: 0.6,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          delay: (i % 3) * 0.05
        });
      });
      
      // ===== Section Titles Animations =====
      gsap.utils.toArray('.section-title').forEach((title, i) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top center+=100',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          y: 40,
          opacity: 0,
          ease: 'power2.out'
        });
      });
      
      // ===== Form Elements Animations =====
      gsap.utils.toArray('.form-group').forEach((group, i) => {
        gsap.from(group, {
          scrollTrigger: {
            trigger: group,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          },
          duration: 0.5,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          delay: i * 0.05
        });
      });
      
      // ===== Contact Section Animations =====
      const contactInfo = document.querySelector('.contact-info');
      if (contactInfo) {
        gsap.from(contactInfo, {
          scrollTrigger: {
            trigger: contactInfo,
            start: 'top center+=100',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          x: -50,
          opacity: 0,
          ease: 'power2.out'
        });
      }
      
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        gsap.from(contactForm, {
          scrollTrigger: {
            trigger: contactForm,
            start: 'top center+=100',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          x: 50,
          opacity: 0,
          ease: 'power2.out'
        });
      }
      
      // ===== Contact Items Stagger Animation =====
      gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          },
          duration: 0.6,
          x: -30,
          opacity: 0,
          ease: 'power2.out',
          delay: i * 0.08
        });
      });
      
      // ===== Sticky Animation for CTA Button =====
      const stickyCta = document.createElement('div');
      stickyCta.className = 'sticky-cta';
      stickyCta.innerHTML = '<button class="cta-button sticky-button">🛍️ Shop Now</button>';
      document.body.appendChild(stickyCta);
      
      // Add styles for sticky CTA
      stickyCta.style.position = 'fixed';
      stickyCta.style.bottom = '-100px';
      stickyCta.style.right = '20px';
      stickyCta.style.zIndex = '1000';
      stickyCta.style.transition = 'bottom 0.5s ease';
      
      // Show sticky CTA after scrolling past hero section
      ScrollTrigger.create({
        start: 'top top-=100',
        end: 'bottom bottom',
        onEnter: () => {
          stickyCta.style.bottom = '20px';
        },
        onLeaveBack: () => {
          stickyCta.style.bottom = '-100px';
        }
      });
      
      // Add click event to sticky button
      const stickyButton = stickyCta.querySelector('.sticky-button');
      stickyButton.addEventListener('click', () => {
        // Scroll to shop section
        const shopSection = document.getElementById('shop');
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}

// Fetch product details from backend
function fetchProductDetails(productId) {
  // Show loading state
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.style.display = 'block';
    // Show loading indicator
    document.querySelector('.modal-body').innerHTML = '<p>Loading product details...</p>';
  }
  
  // In a real implementation, you would fetch from your backend API
  // For now, we'll simulate with a delay
  setTimeout(() => {
    // Fetch product data from backend API
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        // Populate modal with product data
        populateProductModal(product);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        showNotification('Error loading product details');
        if (modal) {
          modal.style.display = 'none';
        }
      });
  }, 500);
}

// Populate product modal with data
function populateProductModal(product) {
  // Set product image
  const productImage = document.getElementById('modal-product-image');
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
  }
  
  // Set product name
  const productName = document.getElementById('modal-product-name');
  if (productName) {
    productName.textContent = product.name;
  }
  
  // Set product price
  const productPrice = document.getElementById('modal-product-price');
  if (productPrice) {
    productPrice.textContent = `$${product.price.toFixed(2)}`;
  }
  
  // Set product description
  const productDescription = document.getElementById('modal-product-description');
  if (productDescription) {
    productDescription.textContent = product.description;
  }
  
  // Set product materials
  const productMaterials = document.getElementById('modal-product-materials');
  if (productMaterials) {
    productMaterials.textContent = product.materials;
  }
  
  // Set product dimensions
  const productDimensions = document.getElementById('modal-product-dimensions');
  if (productDimensions) {
    productDimensions.textContent = product.dimensions;
  }
  
  // Set product care instructions
  const productCare = document.getElementById('modal-product-care');
  if (productCare) {
    productCare.textContent = product.careInstructions;
  }
  
  // Set product stock
  const productStock = document.getElementById('modal-product-stock');
  if (productStock) {
    productStock.textContent = `${product.stock} units available`;
    productStock.style.color = product.stock > 5 ? 'green' : 'orange';
  }
  
  // Set product ID on add to cart button
  const addToCartBtn = document.getElementById('modal-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.dataset.productId = product.id;
  }
  
  // Reset quantity
  const quantityDisplay = document.getElementById('quantity');
  if (quantityDisplay) {
    quantityDisplay.textContent = '1';
  }
}

// Add product to cart
function addToCart(productId, quantity) {
  // In a real implementation, you would send this to your backend
  // For now, we'll simulate with a notification
  showNotification(`Added ${quantity} item(s) to cart`);
  
  // Close modal after a short delay
  setTimeout(() => {
    const modal = document.getElementById('product-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }, 1500);
  
  // In a real implementation, you would make an API call like:
  /*
  fetch('/api/cart/user123/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity
    })
  })
  .then(response => response.json())
  .then(data => {
    showNotification(data.message);
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    showNotification('Error adding item to cart');
  });
  */
}