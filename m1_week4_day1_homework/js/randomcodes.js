function generateCode() {
    // Create variables to store generated codes and the type of characters we want to show as codes
    var code = ' ';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    // Generate character multiple times using for loop
    for (var i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length);
        code += str.charAt(char); // accumulate the generated characters into a string of 8
    }
    return code;
}

// Get HTML element to display
document.getElementById("codes").innerHTML = generateCode();

// Disable button 
function disableButton() {
    document.getElementById("submitBtn").disabled = true;
}

disableButton();