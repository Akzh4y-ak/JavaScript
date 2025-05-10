const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const typing = document.getElementById("typing");

const apiKey = "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"; // <== safe in local only

async function sendMessage() {
  appendMessage("user", "Tell me a Chuck Norris joke!");
  typing.style.display = "block";

  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    const joke = data.value;

    appendMessage("bot", "Bot: " + joke);
    speakText(joke);
  } catch (err) {
    console.error("Error:", err);
    appendMessage("bot", "Bot: Something went wrong.");
  } finally {
    typing.style.display = "none";
  }
}


function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function speakText(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}
