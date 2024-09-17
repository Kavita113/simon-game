let colorPattern = ["blue", "green", "yellow", "red"];

let userClickPattern = [];
let gamePattern = [];

let level = 0;
let started = false;

$(document).keydown(function () {
  if (!started) {
    $('#level-title').text("Level " + level);
    nextSequence();
    started = true;
  }
});


$('.btn').click(function () {
  let userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickPattern.length - 1);

});

function checkAnswer(currentLevel) {

  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 100);
    }
  } else {
    $('body').addClass('game-over');
    playSound('wrong');

    $('#level-title').text('Game over . Press any key to restart.');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}
function nextSequence() {
  userClickPattern = [];
  level++;
  $('#level-title').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colorPattern[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}