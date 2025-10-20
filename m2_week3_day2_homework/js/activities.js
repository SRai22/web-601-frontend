$(document).ready(function() {
    $("td").click(function () {
        var content = $(this).text();

        if (content != "Not Available" && !$(this).is(':first-child')) {
            $(this).toggleClass("tdhighlight");

            if ($(this).hasClass("tdhighlight")) {
                var columnIndex = $(this).index();
                var cliffSite = $('thead th').eq(columnIndex).text();
                var displayText = content + " at <span class='cliff-site'>" + cliffSite + "</span>";

                $('#result').append("<p>"+displayText+"</p>");

                var modal = new bootstrap.Modal(document.getElementById('activitiesModal'));
                modal.show();

            } else {
                var columnIndex = $(this).index();
                var cliffSite = $('thead th').eq(columnIndex).text();

                $('#result p').each(function() {
                    var activityText = $(this).text();
                    var expectedText = content + " at " + cliffSite;
                    if (activityText === expectedText) {
                        $(this).remove();
                        return false;
                    }
                });

                if ($('#result').has('p').length == false) {
                    var modal = bootstrap.Modal.getInstance(document.getElementById('activitiesModal'));
                    if (modal) {
                        modal.hide();
                    }
                }
            }
        }
    });

    function initializeActivitySelection() {
        $('tbody td').each(function() {
            var cellText = $(this).text().trim().toLowerCase();

            if (!cellText.includes('not available') && !$(this).is(':first-child')) {
                $(this).addClass('selectable');
            }
        });

        $('.selectable').on('click', function() {
            $(this).toggleClass('selected');
        });

        $('thead th, tbody td:first-child').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    initializeActivitySelection();
});