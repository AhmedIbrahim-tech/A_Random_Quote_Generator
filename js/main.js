//Select DOM
const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

//Functions

async function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading...";
  const response = await fetch("https://free-quotes-api.herokuapp.com/");
  const data = await response.json();

  quoteText.innerText = data.quote;
  authorName.innerText = data.author || "No Author";

  quoteBtn.classList.remove("loading");
  quoteBtn.innerText = "New Quote";
}

//Event Listeners

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(twitterUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

window.onload = function () {
  quoteBtn.click();
};
