const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Opportunities don't happen. You create them.",
    "Don't be afraid to give up the good to go for the great."
];

// get the elements

const quoteElement = document.getElementById("quote");
const newQuoteButton = document.getElementById("getQuote");

// function to get a random quote

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// function to update the quote

function updateQuote() {
    quoteElement.style.transform = "scale(0)";
    setTimeout(() => {
        quoteElement.textContent = getRandomQuote();
        quoteElement.style.transform = "scale(1)";
    }, 500); 
}

updateQuote(); 

// add event listener to the button
newQuoteButton.addEventListener("click", updateQuote);