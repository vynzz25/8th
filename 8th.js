// Array of compliments
const compliments = [
  "You're an amazing friend.",
  "You have a great sense of humor!",
  "You're incredibly thoughtful and kind.",
  "Your smile brightens everyone's day.",
  "You have a beautiful heart.",
  "You’re capable of achieving great things!",
];

// Function to generate today's compliment based on the date
function getTodaysCompliment() {
  const currentDate = new Date().toDateString();  // Get today's date as a string
  const savedDate = localStorage.getItem('complimentDate');
  let compliment;

  // Check if there's already a saved compliment for today
  if (savedDate === currentDate) {
    compliment = localStorage.getItem('compliment');
  } else {
    // Generate a random compliment
    compliment = compliments[Math.floor(Math.random() * compliments.length)];
    
    // Save today's date and the compliment
    localStorage.setItem('complimentDate', currentDate);
    localStorage.setItem('compliment', compliment);

    // Reset button state for a new day
    localStorage.setItem('buttonClicked', 'false');
  }

  return compliment;
}

// Display today's compliment on the page
function displayCompliment() {
  const compliment = getTodaysCompliment();
  document.getElementById('compliment').innerText = compliment;
}

// Disable the button after it's clicked once for the day
function disableButtonForToday() {
  const currentDate = new Date().toDateString();
  const savedDate = localStorage.getItem('complimentDate');
  const buttonClicked = localStorage.getItem('buttonClicked');

  // Check if button was already clicked today
  if (buttonClicked === 'true' && savedDate === currentDate) {
    document.getElementById('new-compliment').disabled = true;
    document.getElementById('new-compliment').innerText = "Come back tomorrow!";
  }
}

// Handle button click
document.getElementById('new-compliment').addEventListener('click', function() {
  const buttonClicked = localStorage.getItem('buttonClicked');

  if (buttonClicked !== 'true') {
    displayCompliment();  // Show compliment
    localStorage.setItem('buttonClicked', 'true');  // Mark the button as clicked
    document.getElementById('new-compliment').disabled = true;  // Disable button
    document.getElementById('new-compliment').innerText = "Come back tomorrow!";
  }
});

// Display the default text when the page loads and handle button state
window.onload = function() {
  disableButtonForToday();  // Check if the button should be disabled today
};
