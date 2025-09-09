// ========================================================================= //
//                               INITIALIZATION
// ========================================================================= //

console.log('Script loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired!');
    
    // TEMPORARY: Disable all transitions during initialization to prevent flicker
    document.body.classList.add('no-transition');
    
    // 1. Initialize Typed.js for the typing animation
    if (typeof Typed !== 'undefined') {
        new Typed(".typing", {
            strings: ["Data Analyst", "Data Engineer", ".NET Developer", "SSIS Developer", "Data Scientist", "Software Developer", "Business Intelligence Developer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // 2. Initialize all navigation logic
    initializeNavigation();

    // 3. Smart section loading - only change if needed
    const currentHash = window.location.hash.substring(1);
    const currentActiveSection = document.querySelector('.section.active');
    const targetSectionId = currentHash && document.getElementById(currentHash) ? currentHash : 'home';
    
    // Only change sections if the current active section is not the target
    if (!currentActiveSection || currentActiveSection.id !== targetSectionId) {
        showSection(targetSectionId);
        updateNav(targetSectionId);
    } else {
        // Just update navigation to match the current active section
        updateNav(targetSectionId);
    }

    // 4. Initialize all modern website enhancements
    initPreloader();
    initAnimations();
    initScrollAnimations();
    initModernInteractions();
    initThemeToggle();
    initLazyLoading();
    
    // 5. Initialize contact form enhancements
    initializeContactForm();
    
    // 6. Initialize project card enhancements
    initializeProjectCards();
    
    // Re-enable transitions after everything is loaded
    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 100);
});

// Listen for postMessage from iframes to close the modal
window.addEventListener('message', function(event) {
    if (event.data === 'closeProjectModal') {
        closeProjectModal();
    }
});

// ========================================================================= //
//                                 NAVIGATION
// ========================================================================= //

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav a');

function showSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateNav(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.nav a[href="#${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function initializeNavigation() {
    const contactButtons = document.querySelectorAll('.btn[href="#contact"], .hire-me[href="#contact"]');
    const navTogglerBtn = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            updateNav(targetId);
            showSection(targetId);

            if (window.innerWidth < 1200 && aside.classList.contains("open")) {
                asideSectionTogglerBtn();
            }
        });
    });

    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            updateNav(targetId);
            showSection(targetId);
        });
    });

    if (navTogglerBtn) {
        navTogglerBtn.addEventListener("click", () => {
            asideSectionTogglerBtn();
        });
    }
}

function asideSectionTogglerBtn() {
    const aside = document.querySelector(".aside");
    const navTogglerBtn = document.querySelector(".nav-toggler");
    const mainContent = document.querySelector(".main-content");

    if (aside) {
        aside.classList.toggle("open");
    }
    if (navTogglerBtn) {
        navTogglerBtn.classList.toggle("open");
    }
    if (mainContent) {
        mainContent.classList.toggle("open");
    }
}

// ========================================================================= //
//                         MODERN WEBSITE ENHANCEMENTS
// ========================================================================= //

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Hide preloader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }, 500);
        });
    }
}

function initAnimations() {
    // Add stagger animation to elements
    const animateElements = document.querySelectorAll('.skills .skill-item, .service .service-item, .portfolio-item');
    animateElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.skill-item, .service-item, .portfolio-item, .timeline-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function initModernInteractions() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.shadow-dark, .skill-item-inner, .service-item-inner, .portfolio-item-inner');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to clickable elements
    addRippleEffect();
}

function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .nav li a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('data-tooltip', 'Toggle Dark Mode');
    document.body.appendChild(themeToggle);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Send theme update to iframe if modal is open
        const modalIframe = document.querySelector('#modalBody iframe');
        if (modalIframe && modalIframe.contentWindow) {
            const activeStyleLink = document.querySelector('link[class="alternate-style"]:not([disabled])');
            const activeStyle = activeStyleLink ? activeStyleLink.getAttribute('title') : 'color-3';
            
            modalIframe.contentWindow.postMessage({
                action: 'setTheme',
                isDark: isDark,
                activeStyle: activeStyle
            }, '*');
        }
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    if (!submitBtn) return;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Clear any existing messages
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';

        try {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Get form ID and construct URL
            const formId = form.getAttribute('data-form-id');
            const formspreeUrl = `https://formspree.io/f/${formId}`;

            // Send the form data
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success message
            btnText.textContent = 'Sent!';
            btnIcon.innerHTML = '<i class="fa fa-check"></i>';
            submitBtn.classList.add('success');

            const successMsg = document.createElement('div');
            successMsg.className = 'form-message form-success';
            successMsg.innerHTML = '<i class="fa fa-check-circle"></i> Message sent successfully!';
            form.appendChild(successMsg);

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fa fa-paper-plane"></i>';
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                successMsg.remove();
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);

            // Show error message
            btnText.textContent = 'Error!';
            btnIcon.innerHTML = '<i class="fa fa-exclamation-circle"></i>';

            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-message form-error';
            errorMsg.innerHTML = '<i class="fa fa-exclamation-circle"></i> Failed to send message. Please try again.';
            form.appendChild(errorMsg);

            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fa fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========================================================================= //
//                               PROJECT DETAILS
// ========================================================================= //

function toggleProjectDetails(projectId) {
    const projectCard = document.querySelector(`[data-project="${projectId}"]`);
    const detailsSection = projectCard.querySelector('.project-details');
    const expandBtn = projectCard.querySelector('.btn-expand');
    const expandText = expandBtn.querySelector('.expand-text');
    const expandIcon = expandBtn.querySelector('i');
    
    const isVisible = detailsSection.style.display === 'block';
    
    if (isVisible) {
        detailsSection.style.display = 'none';
        expandText.textContent = 'View Details';
        expandBtn.classList.remove('expanded');
        expandIcon.style.transform = 'rotate(0deg)';
    } else {
        detailsSection.style.display = 'block';
        expandText.textContent = 'Hide Details';
        expandBtn.classList.add('expanded');
        expandIcon.style.transform = 'rotate(180deg)';
        
        // Smooth scroll to details section
        setTimeout(() => {
            detailsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

function showAllProjects() {
    // All projects are now displayed - scroll to portfolio section
    document.getElementById('portfolio').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Show a confirmation message
    const btn = document.querySelector('.btn-view-all');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>All 6 Projects Shown!</span><i class="fa fa-check-circle"></i>';
    btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    // Reset after 3 seconds
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = 'linear-gradient(135deg, var(--skin-color), #ff6b6b)';
    }, 3000);
}

// ========================================================================= //
//                               PROJECT MODAL SYSTEM
// ========================================================================= //

function openProjectModal(projectId) {
    console.log('Opening modal for project:', projectId);
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal) {
        console.error('Modal element not found!');
        alert('Modal element not found! Please check the HTML.');
        return;
    }
    
    if (!modalBody) {
        console.error('Modal body element not found!');
        alert('Modal body element not found! Please check the HTML.');
        return;
    }
    
    // Map project IDs to their detail page URLs
    const projectUrls = {
        'film-analytics': 'projects/film-analytics-detail.html',
        'walmart-sales': 'projects/walmart-sales-detail.html',
        'banking-classifier': 'projects/banking-complaint-detail.html',
        'sql-insights': 'projects/sql-insights-detail.html',
        'aws-snowflake': 'projects/aws-snowflake-detail.html',
        'aws-order-pipeline': 'projects/aws-order-detail.html',
        'tam-analysis': 'projects/TAM.html'
    };
    
    const projectUrl = projectUrls[projectId];
    if (!projectUrl) {
        console.error('Project URL not found for:', projectId);
        alert('Project not found: ' + projectId + '. Available projects: ' + Object.keys(projectUrls).join(', '));
        return;
    }
    
    console.log('Loading project URL:', projectUrl);
    
    // Show modal immediately
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Create simple iframe immediately
    modalBody.innerHTML = '<iframe src="' + projectUrl + '" style="width: 100%; height: 100%; border: none; border-radius: 0;" onload="console.log(\'Iframe loaded for ' + projectId + '\')" onerror="console.error(\'Iframe error for ' + projectId + '\')"></iframe>';
    
    console.log('Modal should now be visible for:', projectId);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear modal content after closing
        setTimeout(() => {
            const modalBody = document.getElementById('modalBody');
            if (modalBody) {
                modalBody.innerHTML = '';
            }
        }, 300);
    }
}

// Close modal when clicking outside or pressing Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Prevent modal content from closing when clicked
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        const modalBackdrop = modal.querySelector('.modal-backdrop');
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeProjectModal);
        }
        
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
});
