$(document).ready(function() {
    $("td").click(function () { //user select a table data cell
        var content = $(this).text(); //get content of cell
        
        if (content != "Not Available") { //check if content does not contain a particular string
            $(this).toggleClass("tdhighlight"); //add or remove class when cell is selected
            
            if ($(this).hasClass("tdhighlight")) { //check if selected cell has class
                // Get the column index of the clicked cell
                var columnIndex = $(this).index();
                
                // Get the cliff site name from the header row using eq() method
                var cliffSite = $('thead th').eq(columnIndex).text();
                
                // Create display text with styled cliff site
                var displayText = content + " at <span class='cliff-site'>" + cliffSite + "</span>";
                
                $('#displaySelected').css("visibility","visible"); //make display box visible
                $('#displaySelected').css("margin-top","2em"); //add spaces above display box
                $('#result').append("<p>"+displayText+"</p>"); //add child element with contents including cliff site
                
            } else { //if selected cell don't have class
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
                
                if ($('#result').has('p').length == false) { //check if there are any child elements within parent
                    $('#displaySelected').css("visibility","hidden"); //make display box hidden
                    $('#displaySelected').css("margin-top","0"); //remove spaces above display box
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