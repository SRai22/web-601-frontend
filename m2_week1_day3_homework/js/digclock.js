// Function to determine if daylight saving time is in effect
function isDaylightSavingTime(date) {
    var year = date.getFullYear();
    
    // DST in US: Second Sunday in March to First Sunday in November
    var dlstStart = new Date(year, 2, 1); // March 1st
    var dlstEnd = new Date(year, 10, 1);  // November 1st
    
    // Find second Sunday in March
    var marchFirstSunday = 1 + (7 - dlstStart.getDay()) % 7;
    var marchSecondSunday = marchFirstSunday + 7;
    dlstStart.setDate(marchSecondSunday);
    
    // Find first Sunday in November
    var novFirstSunday = 1 + (7 - dlstEnd.getDay()) % 7;
    dlstEnd.setDate(novFirstSunday);

    // Check if current date is between DST start and end
    return date >= dlstStart && date < dlstEnd;
}

function currentTime() {
    // Declare variables
    var d = new Date(); // Get current date
    var hr = d.getHours(); // Get current hours
    var min = d.getMinutes(); // Get current minutes
    var sec = d.getSeconds(); // Get current seconds
    var ampm;

    // New variables for timezone calculation
    var utchr = d.getUTCHours(); // Get current Greenwich Mean Time (GMT)
    var timeDiff; // Store time difference between GMT hour and Local hour
    var adjTimeDiff; // Store time difference converted to positive number
    var timeZone; // Store the 4 time zones (PT,MT,CT,ET)

    // Add 0 to single digit numbers for seconds and minutes
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (min < 10) {
        min = "0" + min;
    }

    // Convert Greenwich Mean Time from military time to standard time
    var gmtHour = utchr;
    if (gmtHour == 0) {
        gmtHour = 12;
    } else if (gmtHour > 12) {
        gmtHour = gmtHour - 12;
    }

    // Calculate time difference between GMT hour and local hour
    var localHour = hr;
    if (localHour == 0) {
        localHour = 12;
    } else if (localHour > 12) {
        localHour = localHour - 12;
    }
    
    timeDiff = gmtHour - localHour;

    //Convert time difference, if negative, to positive (adjusted time difference)
    if (timeDiff < 0) {
        adjTimeDiff = timeDiff + 12;
    } else {
        adjTimeDiff = timeDiff;
    }

    // Check which time zone based on the converted time difference
    // Account for daylight saving time (DST)
    var isDST = isDaylightSavingTime(d);
    
    // Adjust timezone detection for Daylight Saving Time
    var dstOffset = isDST ? 1 : 0; // DST adds 1 hour difference
    
    if (adjTimeDiff == (8 - dstOffset)) {
        timeZone = isDST ? "PDT" : "PST"; // Pacific Time
    } else if (adjTimeDiff == 7) {
        timeZone = isDST ? "MDT" : "MST"; // Mountain Time
    } else if (adjTimeDiff == (6 - dstOffset)) {
        timeZone = isDST ? "CDT" : "CST"; // Central Time
    } else if (adjTimeDiff == (5 - dstOffset)) {
        timeZone = isDST ? "EDT" : "EST"; // Eastern Time
    } else {
        timeZone = ""; // Unknown timezone or outside US timezones
    }

    // Determine AM or PM string
    if (hr == 12) {
        ampm = "PM";
    } else if (hr > 12) {
        hr = hr - 12;
        ampm = "PM";
    } else {
        ampm = "AM";
    }

    // Assemble time format to display
    var time = hr + ":" + min + ":" + sec + " " + ampm;

    if (timeZone != "") {
        time = time + " " + timeZone;
    }
    // Display current local time and time zone on HTML element
    document.getElementById("clock").innerText = time; // Display the time
}

// Run currentTime function every second
setInterval(currentTime, 1000);