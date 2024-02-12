
var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = (0);

// click any key to start game.
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    };
}); 

 $("#start").on("click", function() {
    if (!started) {
        nextSequence();
        started = true;
    };
}); 

$("#game").on("click", function() {
    $('html, body').animate({
        scrollTop: $("html").offset().top
    }, 2000);
}); 

$("#rules").on("click", function() {
    $('html, body').animate({
        scrollTop: $("#instructions").offset().top
    }, 2000);
}); 

// trigger next sequence
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").html("<br>" + "Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);   
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

// button clicks
$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);  
    playSound(userChosenColor);
    var lastUserIndex = userClickedPattern.length-1;
    checkAnswer(lastUserIndex);
    });

// button animations
function animatePress (currentColor) {
    var activeButton = $("#" + currentColor);
    $(activeButton).addClass("pressed");
    setTimeout(function() {
        $(activeButton).removeClass("pressed");
    }, 100);
};

//button sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
};

//check answer
 function checkAnswer(currentLevel) {
    if(userClickedPattern[(currentLevel)] === gamePattern[(currentLevel)]) {
        if (currentLevel === gamePattern.length-1) {
            if (level<10) {
                setTimeout (function() {                
                nextSequence()
            },1000); 
        } else {
            $("body").addClass("ten-of-ten");
            setTimeout(function() {
                $("body").removeClass("ten-of-ten");
                $("#level-title").html("10 out of 10! <br> Press Any Key to Restart").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound("win");
            }, 400);

            startOver(); 
            }
        }

    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("#level-title").html("Game Over <br> Press Any Key to Restart");
            playSound("wrong");
        }, 200);

        startOver();
  }
 };

 function startOver() {
    gamePattern = [];
    started = false;
    level = (0);
 }
