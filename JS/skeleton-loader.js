// Skeleton Loader for Project Detail Pages
// Creates an animated loading skeleton with theme-aware styling

(function() {
    'use strict';
    
    // Only run if page is loaded in iframe (modal)
    if (window.parent === window) return;
    
    // Create skeleton loader styles
    function createSkeletonStyles() {
        const styles = `
            /* Immediate iframe mode hiding - critical first rule */
            body.iframe-mode {
                visibility: hidden !important;
                opacity: 0 !important;
            }
            
            /* Loading Skeleton Animation */
            .skeleton-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: var(--bg-primary);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                opacity: 1;
                transition: opacity 0.4s ease;
            }
            
            .skeleton-loader.fade-out {
                opacity: 0;
                pointer-events: none;
            }
            
            .skeleton-header {
                background: var(--primary-gradient);
                height: 300px;
                position: relative;
                overflow: hidden;
            }
            
            .skeleton-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--bg-overlay);
                backdrop-filter: blur(0.5px);
            }
            
            .skeleton-content {
                padding: 2rem;
                max-width: 1200px;
                margin: 0 auto;
                width: 100%;
                flex: 1;
            }
            
            .skeleton-title {
                height: 60px;
                background: linear-gradient(90deg, 
                    var(--bg-secondary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-secondary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 8px;
                margin: 2rem auto;
                width: 60%;
            }
            
            .skeleton-meta {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 2rem 0;
                flex-wrap: wrap;
            }
            
            .skeleton-meta-item {
                height: 40px;
                width: 120px;
                background: linear-gradient(90deg, 
                    var(--bg-secondary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-secondary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 20px;
            }
            
            .skeleton-section {
                background: var(--bg-secondary);
                border-radius: 20px;
                padding: 2rem;
                margin-bottom: 2rem;
                border: 1px solid var(--border-color);
            }
            
            .skeleton-section-title {
                height: 32px;
                background: linear-gradient(90deg, 
                    var(--bg-primary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-primary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 6px;
                margin-bottom: 1.5rem;
                width: 40%;
            }
            
            .skeleton-text {
                height: 16px;
                background: linear-gradient(90deg, 
                    var(--bg-primary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-primary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 4px;
                margin-bottom: 0.8rem;
            }
            
            .skeleton-text:nth-child(2) { width: 90%; }
            .skeleton-text:nth-child(3) { width: 85%; }
            .skeleton-text:nth-child(4) { width: 75%; }
            .skeleton-text:nth-child(5) { width: 80%; }
            
            .skeleton-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin: 2rem 0;
            }
            
            .skeleton-card {
                background: var(--bg-primary);
                border-radius: 15px;
                padding: 1.5rem;
                border: 1px solid var(--border-color);
            }
            
            .skeleton-card-title {
                height: 24px;
                background: linear-gradient(90deg, 
                    var(--bg-secondary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-secondary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 4px;
                margin-bottom: 1rem;
                width: 70%;
            }
            
            .skeleton-chart {
                height: 200px;
                background: linear-gradient(90deg, 
                    var(--bg-secondary) 25%, 
                    var(--border-color) 50%, 
                    var(--bg-secondary) 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 8px;
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
            /* Dark mode skeleton adjustments */
            body.dark .skeleton-title,
            body.dark .skeleton-meta-item {
                background: linear-gradient(90deg, 
                    rgba(255,255,255,0.05) 25%, 
                    rgba(255,255,255,0.1) 50%, 
                    rgba(255,255,255,0.05) 75%);
                background-size: 200% 100%;
            }
            
            body.dark .skeleton-text,
            body.dark .skeleton-section-title,
            body.dark .skeleton-card-title,
            body.dark .skeleton-chart {
                background: linear-gradient(90deg, 
                    rgba(255,255,255,0.03) 25%, 
                    rgba(255,255,255,0.08) 50%, 
                    rgba(255,255,255,0.03) 75%);
                background-size: 200% 100%;
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
                .skeleton-content { padding: 1rem; }
                .skeleton-title { width: 80%; height: 40px; }
                .skeleton-meta { flex-direction: column; align-items: center; }
                .skeleton-grid { grid-template-columns: 1fr; gap: 1rem; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Create skeleton loader HTML
    function createSkeletonHTML() {
        return `
            <div id="skeletonLoader" class="skeleton-loader">
                <div class="skeleton-header">
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-meta">
                            <div class="skeleton-meta-item"></div>
                            <div class="skeleton-meta-item"></div>
                            <div class="skeleton-meta-item"></div>
                            <div class="skeleton-meta-item"></div>
                        </div>
                    </div>
                </div>
                <div class="skeleton-content">
                    <div class="skeleton-section">
                        <div class="skeleton-section-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                    </div>
                    <div class="skeleton-section">
                        <div class="skeleton-section-title"></div>
                        <div class="skeleton-grid">
                            <div class="skeleton-card">
                                <div class="skeleton-card-title"></div>
                                <div class="skeleton-chart"></div>
                            </div>
                            <div class="skeleton-card">
                                <div class="skeleton-card-title"></div>
                                <div class="skeleton-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize skeleton loader
    function initSkeletonLoader() {
        let themeApplied = false;
        
        // Create and inject styles
        createSkeletonStyles();
        
        // Create and inject skeleton HTML
        const skeletonHTML = createSkeletonHTML();
        document.body.insertAdjacentHTML('afterbegin', skeletonHTML);
        const skeletonLoader = document.getElementById('skeletonLoader');
        
        // Remove iframe-mode class to show skeleton
        document.body.classList.remove('iframe-mode');
        
        // Request theme from parent window
        window.parent.postMessage({ action: 'getTheme' }, '*');
        
        // Listen for theme updates from parent
        window.addEventListener('message', function(event) {
            if (event.data.action === 'setTheme') {
                const { isDark, activeStyle } = event.data;
                
                // Apply dark mode
                if (isDark) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
                
                // Apply color theme
                const alternateStyles = document.querySelectorAll('.alternate-style');
                alternateStyles.forEach(style => {
                    if (style.getAttribute('title') === activeStyle) {
                        style.removeAttribute('disabled');
                    } else {
                        style.setAttribute('disabled', 'true');
                    }
                });
                
                // Hide skeleton and show content after theme is applied
                if (!themeApplied) {
                    themeApplied = true;
                    // Small delay to ensure all styles are processed
                    setTimeout(() => {
                        skeletonLoader.classList.add('fade-out');
                        // Remove skeleton completely after transition
                        setTimeout(() => {
                            skeletonLoader.remove();
                        }, 400);
                    }, 100);
                }
            }
        });
        
        // Fallback: Hide skeleton after 1 second if no theme response
        setTimeout(() => {
            if (!themeApplied) {
                skeletonLoader.classList.add('fade-out');
                setTimeout(() => {
                    skeletonLoader.remove();
                }, 400);
            }
        }, 1000);
        
        // Handle back to portfolio button click
        document.addEventListener('DOMContentLoaded', function() {
            const backButton = document.querySelector('a[href="../index.html"]');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.parent.postMessage({ action: 'closeModal' }, '*');
                });
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkeletonLoader);
    } else {
        initSkeletonLoader();
    }
})();
