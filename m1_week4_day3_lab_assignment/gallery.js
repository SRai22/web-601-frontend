// gallery.js

// ----- Variables for open/close tags -----
var openList = "<li class='photo'>"; // using class instead of duplicate id
var closeList = "</li>";
var openCaptionTag = "<p class='caption'>";
var closeCaptionTag = "</p>";
var openDescTag = "<p class='description' tabindex='0'>"; // make focusable for accessibility
var closeDescTag = "</p>";
var closeLinkText = "Click This To Close"; // text for closing the info box

// ----- Arrays -----
var photos = [];
var fileNames = [];
var captions = [];
var descriptions = [];
var imageList = [];

// Array of witty captions for NYC winter images (heading content)
var captionTexts = [
  "When NYC turns into Narnia",
  "Frozen pizza? No, frozen Big Apple!",
  "Snow day = adult snow angels in Central Park",
  "Winter in NYC: Where hot chocolate costs more than rent",
  "Taxi! *slides past on ice* Never mind...",
  "NYC winter: Mother Nature's way of testing your MetroCard swipe skills",
  "The canopy of trees in Central Park - nature's winter art gallery",
  "Skyline covered in snow - New York's version of a winter wonderland",
  "NYC snow and rain: The ultimate test of your umbrella skills",
  "A morning run in the snow - because who needs a gym?"
];

// Array of detailed short descriptions (visible under caption on hover originally)
var descTexts = [
  "Central Park's magical winter wonderland escape",
  "NYC skyline draped in winter's embrace",
  "Families building snowmen in Central Park",
  "Hot chocolate carts warming cold New Yorkers",
  "Yellow taxis navigating snowy city streets",
  "Subway entrances providing winter refuge warmth",
  "Bare trees creating winter sky patterns",
  "Manhattan buildings peeking through winter mist",
  "Pedestrians navigating snow and slush carefully",
  "Morning joggers leaving fresh snow footprints"
];

// Extra informational text to show inside the floating info box (can be same length)
var infoTexts = [
  "Snow transforms Central Park into a serene escape from the city's constant motion. Paths become softer, sounds are muted, and the skyline peeks through frosted branches.",
  "A snowy skyline creates striking contrast—glass towers softening behind a pale winter haze while street life continues below.",
  "Parks become community hubs: kids sculpt snowmen, friends throw snowballs, and strangers share smiles braving the chill.",
  "Street vendors thrive even in the cold. Hot chocolate and roasted nuts become essential fuel for frozen commuters.",
  "Taxis and rideshares inch through slush, their yellow profiles adding warmth to the icy palette of the streets.",
  "Each subway entrance feels like a portal from Arctic gusts to subterranean warmth—until the next transfer.",
  "Bare branches create organic lacework against the muted sky, highlighting the park’s design and natural geometry.",
  "Tall buildings loom like silhouettes through drifting flakes, reminding you of the city’s scale even in stillness.",
  "Sidewalks become obstacle courses of puddles, salt, and half-melted ridges that demand strategic footwork.",
  "Dedicated runners carve early tracks into fresh snow, proof that routines endure despite the weather." 
];

// Build gallery list items
for (var i = 0; i < 10; i++) {
  fileNames.push("winterland" + (i + 1));
  photos.push("<img src='images/" + fileNames[i] + ".jpg' alt='NYC winter photo " + (i + 1) + "'>");
  captions.push(openCaptionTag + captionTexts[i] + closeCaptionTag);
  // Description acts as the clickable element to open info box
  descriptions.push(openDescTag + descTexts[i] + closeDescTag);
  var image = openList + photos[i] + captions[i] + descriptions[i] + closeList;
  imageList.push(image);
}

document.addEventListener('DOMContentLoaded', function () {
  // Inject gallery
  var album = document.getElementById('album');
  album.innerHTML = imageList.join('');

  // Create the info box structure (initially hidden)
  var infoBox = document.createElement('div');
  infoBox.id = 'infoBox';
  infoBox.setAttribute('role', 'dialog');
  infoBox.setAttribute('aria-modal', 'true');
  infoBox.style.visibility = 'hidden';

  infoBox.innerHTML = "" +
    "<div class='info-inner'>" +
    "<h2 id='infoHeading'></h2>" +
    "<p id='infoText'></p>" +
    "<a href='#' id='closeInfoLink'>" + closeLinkText + "</a>" +
    "</div>";

  // Append inside gallery container so it floats above
  album.parentElement.appendChild(infoBox);

  // Event delegation for clicking descriptions
  album.addEventListener('click', function (e) {
    var descEl = e.target.closest('.description');
    if (!descEl) return;

    // Find index of clicked item
    var photoItem = descEl.closest('.photo');
    if (!photoItem) return;

    var nodes = Array.prototype.slice.call(album.querySelectorAll('.photo'));
    var idx = nodes.indexOf(photoItem);
    if (idx === -1) return;

    // Populate info box
    document.getElementById('infoHeading').textContent = captionTexts[idx];
    document.getElementById('infoText').textContent = infoTexts[idx];

    showInfoBox();
    e.preventDefault();
  });

  // Keyboard accessibility: Enter or Space on description
  album.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('description')) {
      e.preventDefault();
      e.target.click();
    }
  });

  // Close link
  document.getElementById('closeInfoLink').addEventListener('click', function (e) {
    e.preventDefault();
    hideInfoBox();
  });

  // Escape key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideInfoBox();
  });

  function showInfoBox() {
    infoBox.style.visibility = 'visible';
    infoBox.classList.add('visible');
    document.body.classList.add('info-open');
    // Focus close link for accessibility
    document.getElementById('closeInfoLink').focus();
  }

  function hideInfoBox() {
    infoBox.style.visibility = 'hidden';
    infoBox.classList.remove('visible');
    document.body.classList.remove('info-open');
  }
});
