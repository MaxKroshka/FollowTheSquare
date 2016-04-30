$(document).ready(function() {
  var animationSpeed = 0;
  var score = 0;
  var size = 0;
  var left = true;

  $('.difficulty').on('click', function() {
    $('.reminder').css('display', 'none');
    var startTop = $('body').height() * Math.random();
    var startLeft = $('body').width() * Math.random();
    var difficulty = $(this).data('name');
    if (difficulty === 'Easy') {
      animationSpeed = 4000;
      size = 250;
    } else if (difficulty === 'Medium') {
      animationSpeed = 3000;
      size = 200;
    } else {
      animationSpeed = 2500;
      size = 150;
    }
    $('.gameCube').css({ 'top': startTop, 'left': startLeft, 'display': 'block', width: size, height: size });
  });

  $('body').on('mouseenter', '.gameCube', function(e) {
    $('.gameCube').css('background-color', '#27ae60');
    var gameStartTime = Date.now();
    window.scoreTimer = setInterval(function() {
      var currentTime = Date.now();
      score = Math.floor((currentTime - gameStartTime) / 10);
      $('.score span').text(score);
    }, 100);
    window.timer = setInterval(function() {
      animationSpeed -= 100;
      var top = Math.floor(($(window).height() - size) * Math.random());
      var left = Math.floor(($(window).width() - size) * Math.random());
      $('.gameCube').stop().animate({ 'top': top, 'left': left }, animationSpeed);
    }, animationSpeed);
  })
  .on('mouseleave', '.gameCube', function() {
    clearInterval(timer);
    clearInterval(scoreTimer);
    $('.gameCube').stop();
    $('.gameCube').css('background-color', '#34495e');
    $('.gameCube').css('display', 'none');
    $('.gameEnd').css('display', 'block');
    $('#finalScore').text(score);
  });

  $('.startOver').on('click', function() {
    $('.gameEnd').css('display', 'none');
    $('.reminder').css('display', 'block');
  });

  // Adding random number of bubbles every 6 seconds
  var addBubbles = function() {
    var numBubbles = Math.floor(Math.random() * 15 + 5);
    while (numBubbles > 0) {
      setTimeout(function() {
        var xPosition = Math.floor(Math.random() * $('body').width());
        $('.bg').append('<span class="bubble" style="left: ' + xPosition + 'px; "></span>');
      }, Math.floor(Math.random() * 6000));
      numBubbles--;
    }
  };

  // Music functionality
  var muted = true;
  $('.mute').click(function() {
    if (muted) {
      $(this).html('<img src="img/mute.svg">');
      $('audio')[0].play();
    } else {
      $(this).html('<img src="img/unmute.svg">');
      $('audio')[0].pause();
    }
    muted = !muted;
  });

  addBubbles();
});
