document.addEventListener('DOMContentLoaded', function() {
    // Handle project card clicks
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button or link
            if (e.target.closest('.btn-view-project') || e.target.closest('.btn-github')) {
                return;
            }
            
            // Get the project ID and trigger the modal open
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                // Find and click the view details button
                const viewButton = this.querySelector('.btn-view-project');
                if (viewButton) {
                    viewButton.click();
                }
            }
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const viewButton = this.querySelector('.btn-view-project');
                if (viewButton) {
                    viewButton.click();
                }
            }
        });
    });
});
