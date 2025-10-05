$(document).ready(function() {
    // Function to initialize activity cell selection functionality
    function initializeActivitySelection() {
        // Add selectable class and pointer cursor to selectable cells
        $('tbody td').each(function() {
            var cellText = $(this).text().trim().toLowerCase();
            
            // Check if cell is not "not available" and not in first column (activity names)
            if (!cellText.includes('not available') && !$(this).is(':first-child')) {
                $(this).addClass('selectable');
            }
        });
        
        // Add click event handler for selectable cells
        $('.selectable').on('click', function() {
            $(this).toggleClass('selected');
        });
        
        // Prevent selection of header cells and first column cells
        $('thead th, tbody td:first-child').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }
    
    // Initialize when document is ready
    initializeActivitySelection();
});