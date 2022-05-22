// resposive for small screen and smartphone
const img = document.querySelector(".bg-img");

const intFrameWidth = window.innerWidth;
// console.log(intFrameWidth);
if (intFrameWidth <= 832) {
  img.src = src = "https://picsum.photos/600/700";
} else if (intFrameWidth <= 470) {
  img.src = src = "https://picsum.photos/430/1000";
}

// add load event to window and new BTN
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
// Main color from background image(Color Thief)
// https://lokeshdhakar.com/projects/color-thief/ (source)

const colorThief = new ColorThief();

const body = document.body;
function getColorValue(array) {
  // get RGB values from the API
  const [R, G, B] = array;
  // change the :root --bgColor value
  document.documentElement.style.setProperty(
    "--bgColor",
    `rgb(${R}, ${G}, ${B})`
  );
  loading();
  return [R, G, B];
}

// determine the complementary color based on the relative luminance coeficient (Y) of the background color
// https://en.wikipedia.org/wiki/Relative_luminance (source)

function getColorPalette(array) {
  // get current RGB color value from the backgroundImage
  let [R, G, B] = getColorValue(colorThief.getColor(img, 10));
  // calculate relative luminace (0 - 1)
  const Ybg = (
    0.2126 * (R / 255) +
    0.7152 * (G / 255) +
    0.0722 * (B / 255)
  ).toFixed(1);
  // console.log(Ybg, "bg");
  // getColorPalette(colorThief.getPalette(img, 30));
  // getColorPallete generates a array with 30 array colors
  for (color of array) {
    [R, G, B] = color;
    // calculate relative luminace (0 - 1)
    const Ytxt = (
      0.2126 * (R / 255) +
      0.7152 * (G / 255) +
      0.0722 * (B / 255)
    ).toFixed(1);
    // console.log(Ytxt, "txt");
    // checks the difference between background color and text
    // to give more contrast (they are inversely proportional)
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
    // await response of fetch call
    const response = await fetch(url);
    // only proceed once promise is resolved
    const data = await response.json();
    // only proceed once second promise is resolved
    quoteEl.innerText = data.content;
    authorEl.innerText = data.author;
    // determine text length to either keep it or get a new one
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
