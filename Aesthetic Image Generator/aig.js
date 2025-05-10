const vibeImage = document.getElementById("vibeImage");
const vibeText = document.getElementById("vibeText");

const vibeKeywords = [
  "lofi", "cyberpunk", "dreamy", "vaporwave", "neon city", 
  "retro future", "forest", "sunset aesthetic", "moody sky", "soft pastel"
];

const accessKey = "7Uea_oTso7Lon0IfvRterV8Y1Dv_ITtv-gCgNrywHgE"; 

async function generateVibe() {
  const keyword = vibeKeywords[Math.floor(Math.random() * vibeKeywords.length)];
  vibeText.textContent = `Searching for: "${keyword}"...`;
  vibeImage.classList.remove("show");

  const response = await fetch(`https://api.unsplash.com/photos/random?query=${keyword}&client_id=${accessKey}`);

  if (!response.ok) {
    vibeText.textContent = "Failed to load vibe 😓";
    return;
  }

  const data = await response.json();
  const imageUrl = data.urls.regular;
  const photographer = data.user.name;

  vibeImage.src = imageUrl;
  vibeText.textContent = `${keyword.toUpperCase()} • Photo by ${photographer}`;
  
  setTimeout(() => {
    vibeImage.classList.add("show");
  }, 100);
}

