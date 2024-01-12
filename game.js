// Random colour genertation

var gamePattern = []

var userClickedPattern = []

const buttonColours = ["green", "red", "salmon", "pink", "blue", "orange", "purple", "grey", "brown"];

var level = 0;

function playAudio() {
    var audio = new Audio("./sounds/" + Math.floor(Math.random() * 4) + ".mp3");
    audio.play();
}
// Generating rankdom number
function nextSequence() {
    // Assigning random math to colour and adding it to gamePattern
    let randomNumber = Math.floor(Math.random() * 9);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Picking random color to animate and play soound
    let i = 0;
    
    var myInterval = setInterval(function() {
        if (i <= gamePattern.length) {
        $("." + gamePattern[i]).fadeOut(100, function() {
            playAudio();
            // Start fading in after audio is played
            $(this).fadeIn(100);
        });
        i++;
        } else {
            clearInterval(myInterval);
        }        
    }, 300);
    // level number for title
    // to add the level by one and change title, call back the function
    level++;
    document.querySelector("h1").textContent = "Stage " + level;
    
}



// function to call a nextSequence to start the game, no input after
let gameStarted = false;

$(document).keydown(function (event) {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
        userClickedPattern = [];
    } else {
        // Handle other key events if needed
        handleKeyPress(event.key);
    }
});

// click title to start the game, for mobile user.
$("h1").click(function (event) {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
        userClickedPattern = [];
    } else {
        // Handle other key events if needed
        handleKeyPress(event.key);
    }
});

// ... (rest of your code)

function handleKeyPress(key) {
    if (key >= "1" && key <= "9") {
        // Convert numeric key to index (subtract 1 since arrays are zero-based)
        var index = key - 1;
        if (index < buttonColours.length) {
            var selectedColor = buttonColours[index];
            userClickedPattern.push(selectedColor);
            // The selected colour and play the sound using click
            playAudio();
            // call animation
            animatePress(selectedColor);
            // Call checkAnswer() after user click
            checkAnswer(userClickedPattern.length - 1);
        }
    }
}

// jQuery to detect when buttons clicked and store them in userClickedPattern
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    // The selected colour and play the sound using click
    playAudio();
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

        document.querySelector("h1").textContent = "Game Over, Press Here Or Any Key To Restart.";
        document.querySelector("p").textContent = "Your Score " + level;
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
    gameStarted = false;
}