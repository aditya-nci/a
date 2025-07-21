// Home page enhancements - only affects home page
(function() {
    'use strict';
    
    // Only run on home page
    if (!document.querySelector('.home.section')) return;
    
    // Animate stats counters
    function animateCounters() {
        const counters = document.querySelectorAll('.home .stat-number');
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const suffix = counter.textContent.replace(/\d/g, '');
                    let current = 0;
                    const increment = target / 30; // Faster animation
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Add subtle hover effects to social links
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('.home .social-links a');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
            
            // Handle portfolio navigation
            if (link.getAttribute('data-section')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetSection = link.getAttribute('data-section');
                    
                    // Use the site's navigation functions if available
                    if (typeof showSection === 'function' && typeof updateNav === 'function') {
                        showSection(targetSection);
                        updateNav(targetSection);
                        // Update URL hash
                        window.history.pushState(null, null, '#' + targetSection);
                    } else {
                        // Fallback to direct navigation
                        window.location.hash = targetSection;
                    }
                });
            }
        });
    }
    
    // Initialize all enhancements when DOM is ready
    function init() {
        // Wait for elements to be ready
        setTimeout(() => {
            animateCounters();
            initSocialLinks();
        }, 100);
    }
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
