// Shared JavaScript for Project Detail Pages
// This file consolidates common functionality across all project detail pages

// Theme and color synchronization
function applyThemeAndColor() {
    // Apply theme mode
    var mode = localStorage.getItem('theme-mode') || 'dark';
    document.body.classList.toggle('light', mode === 'light');
    
    // Apply color theme
    var color = localStorage.getItem('selectedColor') || localStorage.getItem('color-theme') || 'color-1';
    var links = document.querySelectorAll('.alternate-style');
    links.forEach(function(link) {
        if (link.getAttribute('title') === color) {
            link.removeAttribute('disabled');
        } else {
            link.setAttribute('disabled', 'true');
        }
    });
}

// Initialize theme synchronization
function initializeThemeSync() {
    applyThemeAndColor();
    
    // Listen for storage changes (cross-tab synchronization)
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme-mode' || e.key === 'color-theme' || e.key === 'selectedColor') {
            applyThemeAndColor();
        }
    });
    
    // Listen for custom events
    document.addEventListener('themeChange', applyThemeAndColor);
    document.addEventListener('colorChange', applyThemeAndColor);
}

// Enhanced image loading with fade-in effect
function initializeImageLoading() {
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Enhanced button interactions
function initializeButtonEnhancements() {
    const buttons = document.querySelectorAll('.btn-action');
    buttons.forEach(button => {
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.7);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe elements
    const animatedElements = document.querySelectorAll('.detail-section, .insight-section');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Back button functionality
function initializeNavigation() {
    const backButtons = document.querySelectorAll('a[href*="#portfolio"], a[href*="index.html"]');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if we came from the main page
            if (document.referrer.includes('index.html') || document.referrer.endsWith('/')) {
                e.preventDefault();
                window.history.back();
            }
        });
    });
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeSync();
    initializeImageLoading();
    initializeButtonEnhancements();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeNavigation();
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
