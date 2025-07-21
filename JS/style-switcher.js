// Enhanced Style Switcher with improved error handling and reduced duplication
(function() {
    'use strict';
    
    // Cache DOM elements
    const styleSwitcher = document.querySelector(".style-switcher");
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
    const dayNight = document.querySelector(".day-night");
    const alternateStyles = document.querySelectorAll(".alternate-style");
    
    // Toggle Style Switcher
    function toggleStyleSwitcher() {
        if (styleSwitcher) {
            styleSwitcher.classList.toggle("open");
        }
    }
    
    // Hide style switcher on scroll
    function hideStyleSwitcherOnScroll() {
        if (styleSwitcher && styleSwitcher.classList.contains("open")) {
            styleSwitcher.classList.remove("open");
        }
    }
    
    // Set active color theme
    function setActiveStyle(color) {
        if (!color) return;
        
        // Store the selected color in localStorage
        localStorage.setItem('selectedColor', color);
        
        // Apply to alternate style sheets
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute("title")) {
                style.removeAttribute("disabled");
            } else {
                style.setAttribute("disabled", "true");
            }
        });
        
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(new CustomEvent('colorChange', { detail: { color } }));
    }
    
    // Toggle dark/light mode
    function toggleDarkMode() {
        if (!dayNight) return;
        
        const isDark = document.body.classList.toggle("dark");
        const icon = dayNight.querySelector("i");
        
        if (icon) {
            icon.classList.toggle("fa-sun", isDark);
            icon.classList.toggle("fa-moon", !isDark);
        }
        
        // Store dark mode preference
        localStorage.setItem('darkMode', isDark);
        localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
        
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark } }));
    }
    
    // Initialize theme and color preferences
    function initializePreferences() {
        // Apply dark mode preference
        const darkModePref = localStorage.getItem('darkMode');
        const isDark = darkModePref === 'true';
        
        if (isDark) {
            document.body.classList.add("dark");
            if (dayNight) {
                const icon = dayNight.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-sun");
                    icon.classList.remove("fa-moon");
                }
            }
        } else {
            document.body.classList.remove("dark");
            if (dayNight) {
                const icon = dayNight.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-moon");
                    icon.classList.remove("fa-sun");
                }
            }
        }
        
        // Apply previously selected color or default
        const savedColor = localStorage.getItem('selectedColor') || 'color-1';
        setActiveStyle(savedColor);
    }
    
    // Event listeners
    function initializeEventListeners() {
        // Style switcher toggle
        if (styleSwitcherToggle) {
            styleSwitcherToggle.addEventListener("click", toggleStyleSwitcher);
        }
        
        // Hide style switcher on scroll
        window.addEventListener("scroll", hideStyleSwitcherOnScroll);
        
        // Dark mode toggle
        if (dayNight) {
            dayNight.addEventListener("click", toggleDarkMode);
        }
        
        // Cross-tab synchronization
        window.addEventListener('storage', function(e) {
            if (e.key === 'selectedColor' && e.newValue) {
                setActiveStyle(e.newValue);
            } else if (e.key === 'darkMode') {
                initializePreferences();
            }
        });
    }
    
    // Initialize when DOM is loaded
    function initialize() {
        initializePreferences();
        initializeEventListeners();
    }
    
    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Expose setActiveStyle globally for onclick handlers
    window.setActiveStyle = setActiveStyle;
    
})();
