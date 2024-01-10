// Random colour genertation

var gamePattern = []

var userClickedPattern = []

const buttonColours = ["red", "blue", "green", "yellow"];


$("selector").keypress(nextSequence)

function nextSequence() {
    return Math.floor(Math.random() * 4);
  }

var randomChosenColour = buttonColours[nextSequence()];
gamePattern.push(randomChosenColour);

// Picking random color to animate and play soound

$("." + randomChosenColour).fadeOut(100).fadeIn(100);
// var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
// audio.play();


// jQuery to detect when buttons clicked and store them in userClickedPattern
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour)
  });

// The selected colour and play the sound using click
$(".btn").click(function(colorSound){ 
    var playSound = colorSound.target.id;
    var audio = new Audio("./sounds/" + playSound + ".mp3");
    audio.play();
});


// The selected colour and play the animation using click
$(".btn").click(function(){ 
    var currentColour = $(this)
    currentColour.addClass("pressed");  

    setTimeout(function(){
        currentColour.removeClass("pressed");
    }, 100);

});


