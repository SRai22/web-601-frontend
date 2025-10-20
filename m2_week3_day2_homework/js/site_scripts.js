var photos = [];
var fileNames = [];
var partnerList = [];
var image;
var openList = "<li class='partner'>";
var closeList = "</li>";

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
    photos.push("<img src='images/partners/" + partnerFiles[i] + "' alt='" + partnerAlts[i] + "'>");
    image = openList + photos[i] + closeList;
    partnerList.push(image);
}

document.getElementById("partners").innerHTML = partnerList;

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

$(document).ready(function() {
    $('.lightbox-toggle').each(function(index) {
        var img = $('<img>').attr({
            'src': cliffImages[index].src,
            'alt': cliffImages[index].alt,
            'class': 'cliff-image'
        });
        $(this).append(img);
    });

    $('.lightbox-toggle img').click(function(){
        $('.backdrop').animate({'opacity':'.50'}, 300, 'linear').css('display', 'block');
        $('.box').fadeIn();

        $('.box .description, .box .image-container').remove();

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

        var descriptionDiv = $('<div class="description">').text(description);
        $('.box').append(descriptionDiv);

        var imageContainer = $('<div class="image-container">');
        imageContainer.append(imgToClone);
        $('.box').append(imageContainer);
    });

    $('.close, .backdrop').click(function(){
        $('.backdrop').animate({'opacity':'0'}, 300, 'linear', function(){
            $('.backdrop').css('display', 'none');
        });
        $('.box').fadeOut();
    });

});

