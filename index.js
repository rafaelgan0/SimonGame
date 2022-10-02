var buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var gameState=false;
//console.log($("#" + gamePattern[0]));

document.addEventListener("keydown", function(event) {
  //add a new color to the gamepattern, and animate it on website
  if (!gameState) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameState = true;
  }
});
$(".btn").click(function() {
  //nextSequence();
  userChosenPattern.push(this.id);
  chosenOne(this.id);
  playAudio(this.id);
  animatePress(this.id);

  //console.log(checkAnswer(userChosenPattern.length-1));
  var check = checkAnswer(userChosenPattern.length-1);
  if (check == false) {
    $("body").addClass("game-over");
    var failed = new Audio("./sounds/wrong.mp3");
    failed.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    level = 0;
    gamePattern = [];
    gameState = false;
  }
  });

//return a random number from 0-3
function randomNumber() {
  return Math.floor(Math.random()*4);
}

function chosenOne(id) {
  $("#" + id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playAudio(color) {
  var audioColor = new Audio("./sounds/" + color + ".mp3");
  audioColor.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
       $("#" + color).removeClass("pressed");
   }, 400);
}

function nextSequence() {
  //var displayLevel = level+1 ;
  userChosenPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  gamePattern.push(buttonColors[randomNumber()]);
  playSequence();


  //$("").addClass("level-title");
}

function playSequence() {

      setTimeout (chosenOne(gamePattern[level - 1]), playAudio(gamePattern[level - 1]), 100);
      // alert(gamePattern[i]);

}

function checkAnswer(level) {
  var success = false;
  if (gamePattern[level] === userChosenPattern[level]) {
      success = true;
      if (userChosenPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
  }
  return success;
}
