// Random colour genertation

var gamePattern = []

var userClickedPattern = []

const buttonColours = ["red", "blue", "green", "yellow"];

var level = 0

// Generating rankdom number
function nextSequence() {
    // Assigning random math to colour and adding it to gamePattern
    let randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Picking random color to animate and play soound
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
    // level number for title
    // to add the level by one and change title, call back the function
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    
}

// function to call a nextSequence tos start the game, no input after
let gameStarted = false;

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        userClickedPattern = [];
    } else {
        // Allow any key press to restart the game
        startOver();
        nextSequence();
        userClickedPattern = [];
    }
});


// jQuery to detect when buttons clicked and store them in userClickedPattern
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    // The selected colour and play the sound using click
    var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
    audio.play();
    // call animation
    animatePress(userChosenColour)
    // Call checkAnswer() after user click
    checkAnswer(userClickedPattern.length - 1)
  });


// Checking answer function with user input and game number generate
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct");
        // Proceed with the game logic for a correct match
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("Wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        document.querySelector("h1").textContent = "Game Over, Press Any Key To Restart";
        // Proceed with the game logic for a wrong match

        startOver();
    }
}

// The selected colour and play the animation using click
function animatePress(currentColor) { 
   $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = 0;
    gameStarted = false;
}