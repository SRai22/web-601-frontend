$(document).ready(function() {
    $("td").click(function () { //user select a table data cell
        var content = $(this).text(); //get content of cell

        if (content != "Not Available" && !$(this).is(':first-child')) { //check if content does not contain "Not Available" and not first column
            $(this).toggleClass("tdhighlight"); //add or remove class when cell is selected

            if ($(this).hasClass("tdhighlight")) { //check if selected cell has class
                // Get the column index of the clicked cell
                var columnIndex = $(this).index();

                // Get the cliff site name from the header row using eq() method
                var cliffSite = $('thead th').eq(columnIndex).text();

                // Create display text with styled cliff site
                var displayText = content + " at <span class='cliff-site'>" + cliffSite + "</span>";

                $('#result').append("<p>"+displayText+"</p>"); //add child element with contents including cliff site

                // Show the modal
                var modal = new bootstrap.Modal(document.getElementById('activitiesModal'));
                modal.show();

            } else { //if selected cell doesn't have class
                // Get the column index and cliff site for removal
                var columnIndex = $(this).index();
                var cliffSite = $('thead th').eq(columnIndex).text();

                // Find and remove the specific activity item
                $('#result p').each(function() {
                    var activityText = $(this).text();
                    var expectedText = content + " at " + cliffSite;
                    if (activityText === expectedText) {
                        $(this).remove();
                        return false; // Break out of the loop
                    }
                });

                // If no more selections, hide the modal if it's open
                if ($('#result').has('p').length == false) {
                    var modal = bootstrap.Modal.getInstance(document.getElementById('activitiesModal'));
                    if (modal) {
                        modal.hide();
                    }
                }
            }
        }
    });
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