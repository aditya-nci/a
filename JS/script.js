// Remove navigation styles if they exist (for smooth transitions from project pages)
function removeNavigationStyles() {
    const styleTag = document.getElementById('navigation-styles');
    if (styleTag) {
        styleTag.remove();
    }
    
    // Make body visible again with a fast fade-in
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "1";
}

// Also modify the section's initial visibility for direct navigation
function setSectionVisibility() {
    const directNavigation = localStorage.getItem('directNavigation');
    if (directNavigation === 'true') {
        // Add the no-transition class to prevent any animations
        document.documentElement.classList.add('no-transition');
        document.body.classList.add('no-transition');
        
        // Add smooth-navigation class to initially hide the content
        document.body.classList.add('smooth-navigation');
        
        // Hide all sections except the target one
        const targetSection = localStorage.getItem('targetSection');
        if (targetSection) {
            document.querySelectorAll(".section").forEach(section => {
                // Add direct-navigation class to all sections to prevent slide animation
                section.classList.add('direct-navigation');
                
                if (section.id !== targetSection) {
                    section.style.display = "none";
                }
            });
        }
    }
}

// Call this function early in the page load process
document.addEventListener('DOMContentLoaded', setSectionVisibility, { once: true });

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    // First, check if this is a direct navigation from a project page
    const isDirectNavigation = localStorage.getItem('directNavigation');
    if (isDirectNavigation === 'true') {
        // First thing to do is to disable all animations/transitions immediately
        document.documentElement.classList.add('no-transition');
        document.body.classList.add('no-transition');
        document.body.classList.add('smooth-navigation');

        // Set up the target section early on
        setSectionVisibility();
    }
    
    // Call these functions in the correct order
    var typed = new Typed(".typing", {
        strings: ["Data Analyst", "Data Engineer", ".NET Developer", "SSIS Developer", "Data Scientist"],
        typeSpeed: 100,
        BackSpeed: 60,
        loop: true
    });
    
    // Check if there's a target section in localStorage (for navigation from project detail pages)
    const targetSection = localStorage.getItem('targetSection');
    const directNavigation = localStorage.getItem('directNavigation');
    const navigationStartTime = localStorage.getItem('navigationStartTime');
    
    if (targetSection) {
        // Find the section and activate it
        const section = document.getElementById(targetSection);
        if (section) {
            // Apply special handling for direct navigation from project pages
            if (directNavigation === 'true') {
                // Calculate how long the navigation has taken
                const navigationDuration = navigationStartTime ? (Date.now() - parseInt(navigationStartTime)) : 0;
                
                // Completely disable all transitions and animations
                document.body.classList.add('no-transition');
                
                // Hide all sections immediately
                const allSections = document.querySelectorAll(".section");
                for (let i = 0; i < allSections.length; i++) {
                    allSections[i].classList.remove("active");
                    allSections[i].classList.remove("back-section");
                    // Add direct-navigation class to prevent slide animation
                    allSections[i].classList.add("direct-navigation");
                }
                
                // Activate the target section without animation
                section.classList.add("active");
                
                // Update the navigation links
                const navLinks = document.querySelectorAll(".nav li a");
                for (let i = 0; i < navLinks.length; i++) {
                    navLinks[i].classList.remove("active");
                    if (navLinks[i].getAttribute("href") === "#" + targetSection) {
                        navLinks[i].classList.add("active");
                    }
                }
                
                // Fade in the body after everything is set up
                setTimeout(() => {
                    // Make all sections visible again but keep them properly activated
                    for (let i = 0; i < allSections.length; i++) {
                        if (allSections[i].style.display === "none") {
                            allSections[i].style.display = "";
                        }
                    }
                    
                    // Remove the no-transition class after the section is activated
                    document.documentElement.classList.remove('no-transition');
                    document.body.classList.remove('no-transition');
                    document.body.classList.remove('smooth-navigation');
                    
                    // Add fade-in class for smooth appearance
                    document.body.classList.add('fade-in');
                    
                    // Clear the navigation flags
                    localStorage.removeItem('directNavigation');
                    localStorage.removeItem('navigationStartTime');
                }, 50); // Small delay to ensure DOM is ready
                
            } else {
                // Standard section activation for normal navigation
                const allSections = document.querySelectorAll(".section");
                for (let i = 0; i < allSections.length; i++) {
                    allSections[i].classList.remove("active");
                }
                
                // Activate the target section
                section.classList.add("active");
                
                // Update the navigation
                const navLinks = document.querySelectorAll(".nav li a");
                for (let i = 0; i < navLinks.length; i++) {
                    navLinks[i].classList.remove("active");
                    if (navLinks[i].getAttribute("href") === "#" + targetSection) {
                        navLinks[i].classList.add("active");
                    }
                }
            }
            
            // Clear the stored target section
            localStorage.removeItem('targetSection');
        }
    }
    
    // Make the page visible after all the setup is done
    removeNavigationStyles();
});

// Aside
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        // Get the currently active section before removing classes
        let currentActiveIndex = -1;
        for (let k = 0; k < totalSection; k++) {
            if (allSection[k].classList.contains("active")) {
                currentActiveIndex = k;
                break;
            }
        }
        
        // Remove active class from all nav items
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        
        // Add active class to clicked nav item
        this.classList.add("active");
        
        // Show the target section
        showSection(this);
        
        // Add back-section class to the previously active section
        removeBackSection();
        if (currentActiveIndex >= 0) {
            allSection[currentActiveIndex].classList.add("back-section");
        }
        
        if (window.innerWidth < 1200) {
            asideSectionTogglerBTn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function showSection(element) {
    // Remove active class from all sections
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    
    // Get the target section and add active class
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

function updateNav(element) {
    // Remove active class from all nav items
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
    }
    
    // Get the target section id
    const target = element.getAttribute("href").split("#")[1];
    
    // Find and activate the corresponding nav item
    for (let i = 0; i < totalNavList; i++) {
        const navTarget = navList[i].querySelector("a").getAttribute("href").split("#")[1];
        if (target === navTarget) {
            navList[i].querySelector("a").classList.add("active");
            break;
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function() {
    // Get the currently active section before switching
    let currentActiveIndex = -1;
    for (let i = 0; i < totalSection; i++) {
        if (allSection[i].classList.contains("active")) {
            currentActiveIndex = i;
            break;
        }
    }
    
    // Show the contact section
    showSection(this);
    updateNav(this);
    
    // Add back-section class to the previously active section
    removeBackSection();
    if (currentActiveIndex >= 0) {
        allSection[currentActiveIndex].classList.add("back-section");
    }
});

// Add event listener for Contact Me button
document.querySelector(".home-info .btn").addEventListener("click", function() {
    // Get the currently active section before switching
    let currentActiveIndex = -1;
    for (let i = 0; i < totalSection; i++) {
        if (allSection[i].classList.contains("active")) {
            currentActiveIndex = i;
            break;
        }
    }
    
    // Show the contact section
    showSection(this);
    updateNav(this);
    
    // Add back-section class to the previously active section
    removeBackSection();
    if (currentActiveIndex >= 0) {
        allSection[currentActiveIndex].classList.add("back-section");
    }
    
    if (window.innerWidth < 1200) {
        asideSectionTogglerBTn();
    }
});

const navTogglerBTn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBTn.addEventListener("click", () => {
    asideSectionTogglerBTn();
});

function asideSectionTogglerBTn() {
    aside.classList.toggle("open");
    navTogglerBTn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Simple modern enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.shadow-dark');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Contact Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    
    if (contactForm) {
        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
        });
        
        // Form validation and styling
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add floating label animation
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Name validation
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                validateField(this, this.value.trim().length >= 2, 'Name must be at least 2 characters');
            });
        }
        
        // Email validation
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                validateField(this, emailRegex.test(this.value), 'Please enter a valid email address');
            });
        }
        
        // Subject validation
        if (subjectInput) {
            subjectInput.addEventListener('input', function() {
                validateField(this, this.value.trim().length >= 3, 'Subject must be at least 3 characters');
            });
        }
        
        // Message validation
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                validateField(this, this.value.trim().length >= 10, 'Message must be at least 10 characters');
            });
        }
    }
    
    function validateField(field, isValid, errorMessage) {
        const inputGroup = field.closest('.input-group');
        let errorElement = inputGroup.querySelector('.error-message');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        
        if (!isValid && field.value.trim() !== '') {
            // Add error styling
            inputGroup.classList.add('error');
            
            // Create error message
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            inputGroup.appendChild(errorElement);
        } else {
            // Remove error styling
            inputGroup.classList.remove('error');
        }
    }
    
    // Contact info items animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe contact info items
    document.querySelectorAll('.contact-info-item').forEach(item => {
        observer.observe(item);
    });
    
    // Form container animation
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        observer.observe(formContainer);
    }
});

// Add CSS for animations
const contactAnimationStyles = `
.contact-info-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.contact-info-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.contact-form-container {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.contact-form-container.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.input-group.error input,
.input-group.error textarea {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
    display: block;
    animation: slideInError 0.3s ease;
}

@keyframes slideInError {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.input-group.focused .input-border {
    width: 100%;
}

.has-value + label {
    top: -8px;
    left: 15px;
    font-size: 12px;
    color: var(--skin-color);
    font-weight: 600;
}
`;

// Inject the animation styles
if (!document.querySelector('#contact-animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'contact-animation-styles';
    styleSheet.textContent = contactAnimationStyles;
    document.head.appendChild(styleSheet);
}
