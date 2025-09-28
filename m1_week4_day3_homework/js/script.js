// Variables
var contactMethodSelect = document.getElementById('contactMethod');
var contactContainer = document.getElementById('contactContainer');

// Function to create and show appropriate input field
function showDynamicInput(selectedValue) {
    // Clear any existing input
    contactContainer.innerHTML = '';
    
    // Create input based on selection
    if (selectedValue === 'email') {
        var emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'contact_email';
        emailInput.placeholder = 'Enter your email address';
        
        var emailLabel = document.createElement('label');
        emailLabel.textContent = 'Enter your email:';

        contactContainer.appendChild(emailLabel);
        contactContainer.appendChild(emailInput);
        contactContainer.style.display = 'block';

    } else if (selectedValue === 'phone') {
        var phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.name = 'contact_phone';
        phoneInput.placeholder = 'Enter your phone number';
        
        var phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Enter your phone:';

        contactContainer.appendChild(phoneLabel);
        contactContainer.appendChild(phoneInput);
        contactContainer.style.display = 'block';

    } else {
        // Hide the container if no valid option is selected
        contactContainer.style.display = 'none';
    }
}

// Event listener for dropdown change
contactMethodSelect.addEventListener('change', function() {
    var selectedValue = this.value;
    showDynamicInput(selectedValue);
});

// Initialize - hide the dynamic input container on page load
document.addEventListener('DOMContentLoaded', function() {
    dynamicInputContainer.style.display = 'none';
});