
# DailyQuote

An app that generates random quotes with author, image, matching background and text color!
I used [Lorem Picsum](https://picsum.photos/) to get a random background image, [Quotable API](https://github.com/lukePeavey/quotable) for the quote, and [ColorThief](https://lokeshdhakar.com/projects/color-thief/) to get the color palette of the image. The quote text is decided by the relative luminance coeficient of the background color. The relative luminance gives a value from 0 to 1, by their difference a function will determine the option that gives more contrast, the complementary colors are inversely proportional.


https://daily-quote-app.netlify.app/
## Screenshots

![App Screenshot](screenshot_demo)


## Lessons Learned

In this project I learned about the Relative Luminance calculation, how to use packages in JavaScript and how to consume an API. It was also my first personal project integrating HTML, CSS and JavaScript.

## Acknowledgements

 - [ColorThief](https://lokeshdhakar.com/projects/color-thief/)
 - [Relative luminance](https://lokeshdhakar.com/projects/color-thief/)
 - [Quotable](https://github.com/lukePeavey/quotable)
 - [Lorem Picsum](https://picsum.photos/)

