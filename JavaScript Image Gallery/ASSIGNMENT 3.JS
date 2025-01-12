/*AUTHOR: HARSH KUMUDGIRI GOSWAMI*/

/*html file*/
<!DOCTYPE html>
<html lang="en">
<!--AUTHOR: HARSH KUMUDGIRI GOSWAMI, 000894310-->
<head>
    <!-- Set the character encoding and viewport settings for the page -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Set the page title -->
    <title>Image Randomizer</title>
    <!-- Link to an external stylesheet -->
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    <!-- Header section -->
    <header>
        <!-- Page title within the header -->
        <h1>Image Randomizer</h1>
    </header>
    <!-- Main content section -->
    <main>
        <!-- Container for images -->
        <div class="container">
            <!-- Image container 1 -->
            <div class="image-container">
                <img class="image" id="image1" src="\images/miki.jpeg" alt="" class="spin">
            </div>
            <!-- Image container 2 -->
            <div class="image-container">
                <img class="image" id="image2" src="\images/chicken.jpg" alt="" class="spin">
            </div>
            <!-- Image container 3 -->
            <div class="image-container">
                <img class="image" id="image3" src="\images/monkey.jpg" alt="" class="spin">
            </div>
        </div>
        <!-- Section above the footer -->
        <div class="before-foot">
            <!-- Timer countdown and color change will happen here -->
            <div id="timer"></div>
            <!-- Display the count of images changed -->
            <div id="counter">
                Images changed: <span id="change-counter">0</span>
            </div>
            <!-- Controls for image randomization -->
            <div id="controls">
                <input type="number" id="refresh-time" placeholder="Refresh Time (500-10000)" min="500" max="10000">
                <button id="randomize-button" onclick="do_animation()">Randomize Images</button>
            </div>
        </div>
    </main>
    <!-- Footer section -->
    <footer>
        <!-- Copyright information -->
        <p>© Harsh K. GOSWAMI, 000894310, 2023</p>
    </footer>
    <!-- Link to an external JavaScript file for functionality -->
    <script src="script.js"></script>
</body>

</html>

/*CSS FILE*/

/* ResetING default styles */
body,

h2,
h3,
p,
ul,
ol,
li {
    margin: 0;
    padding: 0;
}
/* Apply styles to images within a column class */
.column img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.5s;
}

/* Style the header section */
header {
    width: 50%;
    /* Adjust the width as needed */
    margin: 0 auto;
    /* Center the lines horizontally */
    border: 0.5px solid #000;
    /* Adjust the line thickness and color as needed */
    padding: 10px;
}

/* Apply some basic styles to the body */
body {
    font-family: Arial, sans-serif;
    background-color: white;
}

/* Style the header */
header {
    background-color: brown;
    color: black;
    text-align: center;
    padding: 20px;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
/* Style the images within the containers */
.column img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.5s;
    /* Add this transition property */
}


/* Add an animation class */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Apply the animation to your images */
.column img.spin {
    animation: spin 0.5s linear;
}


/* Style FOR main  */
main {
    max-width: 801px;
    margin: 0 auto;
    padding: 20px;

}

/* Style the individual image containers */
.container {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr;
    gap: 11px;
    background-color: #2196F3;
    padding: 1px;
}
/* Style the image containers themselves */
.image-container {
    background-color: palegreen;
    border: 1px solid black;
    padding: 0px;
    font-size: 35px;
    text-align: center;
}

/* Style the image within the container */
.image-container img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
}

/* Style the input section, countdown timer, and image change count as needed */
/* Add your additional styles here */

/* Style the randomize button */
#randomize-button {
    background-color: #333;
    color: white;
    padding: 11px 21px;
    border: none;
    cursor: pointer;
}

/* Change button color on hover */
#randomize-button:hover {
    background-color: #555;
}

.p {
    text-align: center;
}

/* Add a CSS class for the animation */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.column img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
}

/* Apply the animation class to the image when it's clicked */

/* Apply the animation class to the image when it's clicked for a zoom effect */
.column img.clicked {
    animation: zoom 5s linear;
    transform-origin: center;
    /* Zoom from the center of the image */
}

/* Define a zoom animation */
@keyframes zoom {
    0% {
        transform: scale(1);
        /* Initial scale */
    }

    100% {
        transform: scale(1.2);
        /* Zoom to 1.2 times the original size */
    }
}
/* Style the footer section */
footer{
    text-align: center;
    border: solid black;
    background-color:aqua;
}

.before-foot{
    text-align: center;
}
.column img:hover {
    animation: rotate 0.5s linear;
}

/* Apply a rotation animation to images on hover */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}


/* Apply the animation to your images */
.image-container img.spin {
    animation: spin 0.5s linear;
}

/*JAVASCRIPT FILE */
// JavaScript for the Image Randomizer

// Global variables
let imageCounter = 0;
const imageArray = ['\images/monkey.jpg', '\images/chicken.jpg', '\images/miki.jpeg', '\images/cat.jpg', '\images/mario.jpg', '\images/panda.jpg', '\images/jerry.png' /* Add more images */];
let timerInterval;
let timerColorIndex = 0;
const timerColors = ['#00ff00', '#ffff00', '#ff0000'];

// Function to change images
function changeImages() {
    for (let i = 1; i <= 3; i++) {
        const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
        document.getElementById(`image${i}`).src = randomImage;
    }
    resetTimer();
    updateImageCounter();
}

// Function to start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        const timerElement = document.getElementById('timer');
        timerElement.style.color = timerColors[timerColorIndex];
        timerColorIndex = (timerColorIndex + 1) % timerColors.length;
        const timeLeft = parseInt(timerElement.innerText);
        if (timeLeft <= 0) {
            changeImages();
        } else {
            timerElement.innerText = (timeLeft - 1).toString();
        }
    }, 100);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    timerElement.style.color = '#00ff00';
    timerElement.innerText = document.getElementById('refresh-time').value;
    timerColorIndex = 0;
    startTimer();
}

// Function to handle image click events
function handleImageClick(event) {
    event.target.classList.remove('spin');
    setTimeout(() => {
        event.target.classList.add('spin');
        resetTimer();
        updateImageCounter();
    }, 0);
}

// Function to update the image change counter
function updateImageCounter() {
    imageCounter++;
    document.getElementById('change-counter').textContent = imageCounter;
}

// Function to initialize the application
function initializeApp() {
    const randomizeButton = document.getElementById('randomize-button');
    const refreshTimeInput = document.getElementById('refresh-time');
    for (let i = 1; i <= 3; i++) {
        const imageElement = document.getElementById(`image${i}`);
        imageElement.addEventListener('click', handleImageClick);
    }
    randomizeButton.addEventListener('click', changeImages);
    refreshTimeInput.addEventListener('change', resetTimer);
    changeImages(); // Initial image selection
}

// Call the initialization function when the page loads
window.addEventListener('load', initializeApp);
function handleImageClick(event) {
    event.target.classList.remove('clicked');
    setTimeout(() => {
        event.target.classList.add('clicked');
        resetTimer();
        updateImageCounter();
    }, 0);
}

function do_animation() {
    const imageElements = document.querySelectorAll('.image');
    imageElements.forEach((imageElement) => {
        imageElement.classList.remove('spin');
        setTimeout(() => {
            imageElement.classList.add('spin');
        }, 0);
    });
}

