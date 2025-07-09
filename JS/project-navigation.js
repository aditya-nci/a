// Function to handle navigation from project details to main page sections
function navigateToSection(sectionId) {
    // Store the section ID in localStorage
    localStorage.setItem('targetSection', sectionId);
    // Store a flag to indicate this is a direct navigation that should be smooth
    localStorage.setItem('directNavigation', 'true');
    
    // Create a special style element that completely hides the screen during transition
    const styleTag = document.createElement('style');
    styleTag.id = 'navigation-styles';
    styleTag.innerHTML = `
        html, body {
            opacity: 0 !important;
            transition: none !important;
            animation: none !important;
        }
        * {
            transition: none !important;
            animation: none !important;
        }
        .section {
            transition: none !important;
            animation: none !important;
        }
    `;
    document.head.appendChild(styleTag);
    
    // Force a repaint to ensure the style is applied before navigation
    void document.body.offsetHeight;
    
    // Set a timestamp to calculate navigation duration
    localStorage.setItem('navigationStartTime', Date.now().toString());
    
    // Use requestAnimationFrame to ensure the styles are applied before navigation
    requestAnimationFrame(() => {
        // Navigate immediately using hash to go directly to the section
        window.location.href = '../index.html#' + sectionId;
    });
}
