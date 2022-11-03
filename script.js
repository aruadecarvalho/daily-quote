const img = document.querySelector(".bg-img");

const intFrameWidth = window.innerWidth;
if (intFrameWidth <= 832) {
  img.src = src = "https://picsum.photos/600/700";
} else if (intFrameWidth <= 470) {
  img.src = src = "https://picsum.photos/430/1000";
}

const newQuoteBtn = document.getElementById("new-quote");

window.addEventListener("load", getQuote);
newQuoteBtn.addEventListener("click", reload, false);

// loader
// reload button
function reload() {
  loading();
  reload = location.reload();
  complete();
}

//Show loading
function loading() {
  const loader = document.querySelector(".loader");
  loader.style.visibility = "visible";
}

// hide loading
function complete() {
  const loader = document.querySelector(".loader");
  const quoteContainer = document.querySelector(".quote-container");
  loader.style.visibility = "hidden";
  quoteContainer.style.visibility = "visible";
}

// loads the color and changes the style
if (img.complete) {
  getColorValue(colorThief.getColor(img, 10));
  getColorPalette(colorThief.getPalette(img, 30));
} else {
  img.addEventListener("load", function () {
    getColorValue(colorThief.getColor(img, 10));
    getColorPalette(colorThief.getPalette(img, 30));
  });
}

// TODO add html to image functionality

const colorThief = new ColorThief();

const body = document.body;
function getColorValue(array) {
  const [R, G, B] = array;
  document.documentElement.style.setProperty(
    "--bgColor",
    `rgb(${R}, ${G}, ${B})`
  );
  loading();
  return [R, G, B];
}

function getColorPalette(array) {
  let [R, G, B] = getColorValue(colorThief.getColor(img, 10));
  const Ybg = (
    0.2126 * (R / 255) +
    0.7152 * (G / 255) +
    0.0722 * (B / 255)
  ).toFixed(1);
  for (color of array) {
    [R, G, B] = color;
    const Ytxt = (
      0.2126 * (R / 255) +
      0.7152 * (G / 255) +
      0.0722 * (B / 255)
    ).toFixed(1);
    if (Ytxt - Ybg >= 0.4) {
      document.documentElement.style.setProperty(
        "--txtColor",
        `rgb(${R}, ${G}, ${B})`
      );
      break;
    }
  }
}

// Random quote generator
async function getQuote() {
  while (true) {
    const url = "https://api.quotable.io/random";
    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("author");
    const response = await fetch(url);
    const data = await response.json();
    quoteEl.innerText = data.content;
    authorEl.innerText = data.author;
    console.log(quoteEl.textContent.length);
    if (quoteEl.textContent.length <= 100) {
      complete();
      break;
    }
  }
}

// tweet generated quote
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const twitterBtn = document.querySelector(".twitter-button");

twitterBtn.addEventListener("click", function () {
  const tweet =
    "https://twitter.com/intent/tweet?text=" +
    `"${quoteEl.textContent}" - ${authorEl.textContent}`;
  window.open(tweet, "_blank").focus();
});
