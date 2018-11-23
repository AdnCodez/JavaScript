// Version 1.0
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
// const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var textExamples = [
                    'this is a simple paragraph that is meant to be nice and easy to type which is why there will \
                    be commas no periods or any capital letters so i guess this means that it cannot really be considered\
                    paragraph but just a series of run on sentences.',
                    'The practice of writing paragraphs is essential to good writing. Paragraphs help to break up large chunks of text\
                    and makes the content easier for readers to digest.',
                    'A language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.\
                    Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web.',
                    'Python is an interpreted high-level programming language for general-purpose programming. Created by Guido van Rossum\
                    and first released in 1991, Python has a design philosophy that emphasizes code readability, notably using significant\
                    whitespace. It provides constructs that enable clear programming on both small and large scales.',
                    'The bikers rode down the long and narrow path to reach the city park. When they reached a good spot to rest,\
                    they began to look for signs of spring. The sun was bright, and a lot of bright red and blue blooms proved to all\
                    that warm spring days were the very best.'
                    ];

var item = textExamples[Math.floor(Math.random()*textExamples.length)];
const originText = document.querySelector("#origin-text p").innerHTML = item;

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

