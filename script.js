// Akbenli Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scrolling for Anchor Links
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

    // Form Handling
    const generalInquiryForm = document.getElementById('generalInquiryForm');
    const quoteForm = document.getElementById('quoteForm');
    
    if (generalInquiryForm) {
        generalInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'General Inquiry');
        });
    }
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Quote Request');
        });
    }

    // Modal Handling
    const sizeGuideModal = document.getElementById('sizeGuideModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            sizeGuideModal.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    if (sizeGuideModal) {
        sizeGuideModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    }

    // Product Filter Simulation
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterProducts();
        });
    });

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to various elements
    document.querySelectorAll('.product-card, .commitment-card, .excellence-card').forEach(el => {
        el.classList.add('fade-in');
    });

    // Language Switcher (placeholder functionality)
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', function() {
            // Placeholder for language switching functionality
            alert('Language switching functionality would be implemented here');
        });
    }

    // Quick View Buttons
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Placeholder for quick view functionality
            alert('Quick view functionality would be implemented here');
        });
    });

    // Quote Request Buttons
    const quoteButtons = document.querySelectorAll('.btn-primary');
    quoteButtons.forEach(button => {
        if (button.textContent.includes('Request Quote')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroll to quote form or show modal
                const quoteForm = document.getElementById('quoteForm');
                if (quoteForm) {
                    quoteForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
});

// Form Submit Handler
function handleFormSubmit(form, formType) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        // Remove loading state
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
        
        // Show success message
        showNotification(`${formType} sent successfully! We'll get back to you within 24 hours.`, 'success');
        
        // Reset form
        form.reset();
    }, 2000);
}

// Filter Products Function
function filterProducts() {
    const products = document.querySelectorAll('.product-card');
    const category = document.querySelector('select').value; // Simplified for demo
    
    products.forEach(product => {
        // Simple filtering logic - would be more complex in real implementation
        if (category === '' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : '#E67E22'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Utility Functions
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

// Performance Optimization - Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', category, action, label);
}

// Add tracking to important buttons
document.addEventListener('DOMContentLoaded', function() {
    const trackableButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Button Click', this.textContent.trim(), window.location.pathname);
        });
    });
});