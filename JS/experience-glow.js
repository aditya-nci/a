// ========================================================================= //
//                     EXPERIENCE CARD GLOW EFFECT
// ========================================================================= //

document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience .experience-card');
    
    experienceCards.forEach(card => {
        // Mouse move handler for glow effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            
            // Calculate angle (in degrees)
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            
            // Calculate distance from center as percentage
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const distancePercent = (distance / maxDistance) * 100;
            
            // Set CSS custom properties
            card.style.setProperty('--pointer-°', `${angle}deg`);
            card.style.setProperty('--pointer-d', distancePercent);
        });
        
        // Mouse enter handler - add animating class
        card.addEventListener('mouseenter', () => {
            card.classList.add('animating');
        });
        
        // Mouse leave handler - remove animating class
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animating');
            // Reset the custom properties after transition
            setTimeout(() => {
                card.style.removeProperty('--pointer-°');
                card.style.removeProperty('--pointer-d');
            }, 750);
        });
    });
});
