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

