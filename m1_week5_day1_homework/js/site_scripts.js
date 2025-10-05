var photos = []; // empty array to store image element 
var fileNames = []; // empty array to store image file names
var partnerList = []; // empty array to store html list that contain an image
var image; // empty variable to store the assembled image list codes 
var openList = "<li class='partner'>"; // variable to store open list tag 
var closeList = "</li>"; // variable to store close list tag

// Partner image filenames and alt text
var partnerFiles = [
    "partner-bustour.png",
    "partner-cabinrental.png", 
    "partner-campingadv.png",
    "partner-collegetours.png",
    "partner-rentalbike.png",
    "partner-tourgroup.png"
];

var partnerAlts = [
    "Partner Bus Tours",
    "Partner Cabin Rental",
    "Partner Camping Adventure", 
    "Partner College Tours",
    "Partner Rental Bike",
    "Partner Tour Group"
];

for(var i=0; i < partnerFiles.length; i++) {
    // Assemble file name into image element and store in an array 
    photos.push("<img src='images/partners/" + partnerFiles[i] + "' alt='" + partnerAlts[i] + "'>"); 
    // Assemble image element from the array with list elements and store in a variable.
    image = openList + photos[i] + closeList;
    partnerList.push(image); // Store the assembled image list code in an array
}

// Display all six image codes store in the array 
document.getElementById("partners").innerHTML = partnerList;

// Cliff images data
var cliffImages = [
    {
        src: "images/cliffs/cliff-west-sea.jpg",
        alt: "West Cliff",
        description: "West Cliff with ocean view and rock formations"
    },
    {
        src: "images/cliffs/cliff-north-mountain.jpg", 
        alt: "North Cliff",
        description: "North Cliff with mountain views and rocky ledges"
    },
    {
        src: "images/cliffs/cliff-east-river.jpg",
        alt: "East Cliff", 
        description: "East Cliff overlooking a river surrounded by mountains"
    },
    {
        src: "images/cliffs/cliff-south-canyon.jpg",
        alt: "South Cliff",
        description: "South Cliff with desert landscape and canyon views"
    }
];

// Create and append cliff images to lightbox-toggle divs
$(document).ready(function() {
    // Add images to the lightbox-toggle divs
    $('.lightbox-toggle').each(function(index) {
        var img = $('<img>').attr({
            'src': cliffImages[index].src,
            'alt': cliffImages[index].alt,
            'class': 'cliff-image'
        });
        $(this).append(img);
    });

    /* Open lightbox on button click */
    $('.lightbox-toggle img').click(function(){
        $('.backdrop').animate({'opacity':'.50'}, 300, 'linear').css('display', 'block');
        $('.box').fadeIn();

        //Check if lightbox has content and clear it
        $('.box .description, .box .image-container').remove();

        //Get text content in attribute
        var $altvalue = $(this).attr('alt');
        var description = '';
        var imgToClone;

        if ($altvalue=="West Cliff") {
            imgToClone = $('.cliffs-grid .cliff-section:nth-child(1) img').clone();
            description = cliffImages[0].description;
        }
        else if ($altvalue=="North Cliff") {
            imgToClone = $('.cliffs-grid .cliff-section:nth-child(2) img').clone();
            description = cliffImages[1].description;
        }
        else if ($altvalue=="East Cliff") {
            imgToClone = $('.cliffs-grid .cliff-section:nth-child(3) img').clone();
            description = cliffImages[2].description;
        }
        else if ($altvalue=="South Cliff") {
            imgToClone = $('.cliffs-grid .cliff-section:nth-child(4) img').clone();
            description = cliffImages[3].description;
        }

        // Create and append description
        var descriptionDiv = $('<div class="description">').text(description);
        $('.box').append(descriptionDiv);

        // Create image container and append cloned image
        var imageContainer = $('<div class="image-container">');
        imageContainer.append(imgToClone);
        $('.box').append(imageContainer);
    });

    /* Click to close lightbox */
    $('.close, .backdrop').click(function(){
        $('.backdrop').animate({'opacity':'0'}, 300, 'linear', function(){
            $('.backdrop').css('display', 'none');
        });
        $('.box').fadeOut();
    });

});

