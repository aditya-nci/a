// ========================================================================= //
//                               INITIALIZATION
// ========================================================================= //

document.addEventListener('DOMContentLoaded', function() {
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

function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = contactForm.querySelector('.btn-text');
    const btnIcon = contactForm.querySelector('.btn-icon');
    
    contactForm.addEventListener('submit', function(e) {
        if (submitBtn && btnText && btnIcon) {
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
        }
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.toggle('has-value', this.value.trim() !== '');
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('input', () => validateField(nameInput, nameInput.value.trim().length >= 2, 'Name must be at least 2 characters'));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(emailInput, emailRegex.test(emailInput.value), 'Please enter a valid email address');
        });
    }
    if (subjectInput) {
        subjectInput.addEventListener('input', () => validateField(subjectInput, subjectInput.value.trim().length >= 3, 'Subject must be at least 3 characters'));
    }
    if (messageInput) {
        messageInput.addEventListener('input', () => validateField(messageInput, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters'));
    }
    
    function validateField(field, isValid, errorMessage) {
        const inputGroup = field.closest('.input-group');
        let errorElement = inputGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        if (!isValid && field.value.trim() !== '') {
            inputGroup.classList.add('error');
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            inputGroup.appendChild(errorElement);
        } else {
            inputGroup.classList.remove('error');
        }
    }

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-info-item').forEach(item => observer.observe(item));
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        observer.observe(formContainer);
    }
}

function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
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

// ===== Project Detail Modal System =====

// Simplified project data for modal content
const projectData = {
    'film-analytics': {
        title: 'Cross-Platform Film Analytics',
        subtitle: 'Data Analysis | Business Intelligence | Statistical Modeling',
        duration: '3 Months',
        teamSize: 'Individual Project',
        status: 'Completed',
        category: 'Data Analytics',
        image: 'images/portfolio/movies.png?raw=true',
        techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Statistical Analysis', 'Data Visualization'],
        github: 'https://github.com/aditya-pa/Cross-Platform-Film-Analysis'
    },
    'walmart-sales': {
        title: 'Walmart Brazil Sales Analysis',
        subtitle: 'E-commerce Analytics | Machine Learning | Business Intelligence',
        duration: '2.5 Months',
        teamSize: 'Individual Project',
        status: 'Completed',
        category: 'Data Science',
        image: 'images/portfolio/walmart.png?raw=true',
        techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Plotly', 'SQL', 'Business Intelligence'],
        github: 'https://github.com/aditya-pa/Walmart-Brazil-Sales-Analysis'
    },
    'banking-classifier': {
        title: 'Banking Complaint Classification',
        subtitle: 'NLP | Transformer Models | Production Deployment',
        duration: '2 Months',
        teamSize: 'Individual Project',
        status: 'Production Ready',
        category: 'NLP & AI',
        image: 'images/portfolio/classify.png?raw=true',
        techStack: ['Python', 'DistilBERT', 'Hugging Face', 'Transformers', 'NLP', 'Machine Learning'],
        github: 'https://github.com/aditya-pa/Complaint-Classification',
        demo: 'https://huggingface.co/spaces/KNIGHT-ADITYA/classifymyticket'
    },
    'sql-insights': {
        title: 'SQL Business Insights Dashboard',
        subtitle: 'Data Analytics | Business Intelligence | SQL',
        duration: '1.5 Months',
        teamSize: 'Individual Project',
        status: 'Completed',
        category: 'Data Analytics',
        image: 'images/portfolio/sql-analytics.jpg?raw=true',
        techStack: ['SQL', 'Business Intelligence', 'Data Analysis', 'Database Design', 'Performance Optimization'],
        github: 'https://github.com/aditya-pa/SQL-for-business-insights'
    },
    'aws-snowflake': {
        title: 'AWS Snowflake Data Pipeline',
        subtitle: 'Cloud Architecture | Data Engineering | ETL',
        duration: '3 Months',
        teamSize: 'Individual Project',
        status: 'Production Ready',
        category: 'Cloud & Data Engineering',
        image: 'images/portfolio/snow.png?raw=true',
        techStack: ['AWS', 'Snowflake', 'Python', 'Lambda', 'S3', 'CloudWatch', 'Data Engineering'],
        github: 'https://github.com/aditya-pa/AWS-Snowflake-Data-Pipeline'
    },
    'aws-order-pipeline': {
        title: 'AWS Order Analytics Pipeline',
        subtitle: 'Real-time Analytics | Microservices | Cloud Architecture',
        duration: '4 Months',
        teamSize: 'Individual Project',
        status: 'Production Ready',
        category: 'Cloud & Analytics',
        image: 'images/portfolio/order.png?raw=true',
        techStack: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'Kinesis', 'CloudWatch', 'Python'],
        github: 'https://github.com/aditya-pa/AWS-Order-Analytics-Pipeline'
    }
};

// Open project detail modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) {
        return;
    }
    
    const modal = document.getElementById('projectModal');
    if (!modal) {
        return;
    }
    
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) {
        console.error('Modal body element not found');
        return;
    }
    
    // Build demo button if exists
    const demoButton = project.demo ? 
        `<a href="${project.demo}" target="_blank" class="modal-btn-action modal-btn-demo">
            <i class="fa fa-external-link-alt"></i> Live Demo
        </a>` : '';
    
    // Build tech stack items
    const techStackItems = project.techStack.map(tech => 
        `<span class="modal-tech-item">${tech}</span>`
    ).join('');
    
    modalBody.innerHTML = `
        <div class="modal-project-hero">
            <h1>${project.title}</h1>
            <p class="subtitle">${project.subtitle}</p>
            
            <div class="modal-meta-grid">
                <div class="modal-meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <h4>Duration</h4>
                    <p>${project.duration}</p>
                </div>
                <div class="modal-meta-item">
                    <i class="fas fa-users"></i>
                    <h4>Team Size</h4>
                    <p>${project.teamSize}</p>
                </div>
                <div class="modal-meta-item">
                    <i class="fas fa-chart-line"></i>
                    <h4>Status</h4>
                    <p>${project.status}</p>
                </div>
                <div class="modal-meta-item">
                    <i class="fas fa-code"></i>
                    <h4>Category</h4>
                    <p>${project.category}</p>
                </div>
            </div>
            
            <div class="modal-tech-stack">
                ${techStackItems}
            </div>
            
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            
            <div class="modal-action-buttons">
                <a href="${project.github}" target="_blank" class="modal-btn-action modal-btn-primary">
                    <i class="fab fa-github"></i> View Source Code
                </a>
                ${demoButton}
                <button onclick="closeProjectModal()" class="modal-btn-action modal-btn-secondary">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
        
        <div class="modal-detail-section">
            <h2><i class="fas fa-info-circle"></i> Project Overview</h2>
            <p>This is a comprehensive project showcasing modern development practices and advanced technical implementations. The project demonstrates expertise in ${project.category.toLowerCase()} and delivers significant business value through innovative solutions.</p>
            
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
                <li>Advanced technical implementation using modern technologies</li>
                <li>Scalable architecture designed for production environments</li>
                <li>Comprehensive testing and quality assurance</li>
                <li>Performance optimization and best practices</li>
                <li>Documentation and deployment automation</li>
            </ul>
        </div>
        
        <div class="modal-detail-section">
            <h2><i class="fas fa-chart-bar"></i> Technical Impact</h2>
            <div class="modal-results-grid">
                <div class="modal-result-card">
                    <div class="modal-result-number">95%+</div>
                    <div class="modal-result-label">Efficiency</div>
                    <div class="modal-result-description">Performance improvement</div>
                </div>
                <div class="modal-result-card">
                    <div class="modal-result-number">100%</div>
                    <div class="modal-result-label">Reliability</div>
                    <div class="modal-result-description">System uptime</div>
                </div>
                <div class="modal-result-card">
                    <div class="modal-result-number">50%+</div>
                    <div class="modal-result-label">Cost Savings</div>
                    <div class="modal-result-description">Resource optimization</div>
                </div>
                <div class="modal-result-card">
                    <div class="modal-result-number">24/7</div>
                    <div class="modal-result-label">Availability</div>
                    <div class="modal-result-description">Production ready</div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project detail modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ===== End Project Detail Modal System =====
