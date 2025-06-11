// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    const isActive = mobileNavOverlay.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Close mobile menu when clicking on overlay
  mobileNavOverlay.addEventListener('click', function(e) {
    if (e.target === mobileNavOverlay) {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu when clicking on nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  function openMobileMenu() {
    mobileNavOverlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  }
  
  function closeMobileMenu() {
    mobileNavOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Smooth scrolling for anchor links (if any are added later)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add fade-in animation to sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  const sections = document.querySelectorAll('.features, .articles');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Add hover effects to articles
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    article.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-0.5rem)';
    });
    
    article.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add active state to navigation links based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Throttled scroll handler
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);
  
  // Button click handlers for CTA buttons
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Here you would typically handle the actual request invite functionality
      // For now, we'll just show an alert
      setTimeout(() => {
        alert('Thank you for your interest! Request Invite functionality would be implemented here.');
      }, 200);
    });
  });
  
  // Add loading state to buttons
  function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.opacity = '1';
    }, 2000);
  }
  
  // Handle form submission (if forms are added later)
  document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) {
        addLoadingState(submitBtn);
      }
    }
  });
  
  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Performance optimization: Lazy load images when they come into view
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(e) {
  // Handle any single-page app navigation if implemented
});

// Add error handling for failed image loads
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    e.target.style.display = 'none';
    console.warn('Image failed to load:', e.target.src);
  }
}, true);

// Add accessibility improvements
function enhanceAccessibility() {
  // Add aria-labels to social links
  const socialLinks = document.querySelectorAll('.social-link');
  const socialPlatforms = ['Facebook', 'YouTube', 'Twitter', 'Pinterest', 'Instagram'];
  
  socialLinks.forEach((link, index) => {
    if (socialPlatforms[index]) {
      link.setAttribute('aria-label', `Visit our ${socialPlatforms[index]} page`);
    }
  });
  
  // Add aria-expanded to mobile menu button
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
  }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);