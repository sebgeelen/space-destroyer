var buildView;

buildView = function(context, namespace) {
  var asteroidDestoyed, asteroidDestroyedCount, asteroidDirection, container, counter, fire, gameOver, init, moveVessel, newTick, options, spawnBonus, timeRemaining, timer, vessel, view, _gameV, _incrementCounter, _moveAsteroid, _moveBulletUp, _view;
  if (context == null) {
    context = window;
  }
  if (namespace == null) {
    namespace = "gameV";
  }
  options = {
    "container": null
  };
  _gameV = context[namespace];
  container = null;
  counter = null;
  timer = null;
  vessel = null;
  asteroidDirection = 1;
  asteroidDestroyedCount = 0;
  if (_gameV) {
    return _gameV;
  }
  init = function(opt) {
    console.log('view init');
    if (opt !== void 0) {
      jQuery.extend(options, opt);
    }
    container = $(options.container);
    counter = $(options.counter);
    timer = $(options.timer);
    return vessel = container.find("#vessel");
  };
  newTick = function() {
    _moveBulletUp();
    return _moveAsteroid();
  };
  gameOver = function() {
    return container.find('#game-over').show();
  };
  moveVessel = function(direction) {
    var currentLeft, maxLeft, nextLeft;
    if (direction == null) {
      direction = 1;
    }
    currentLeft = parseInt(vessel.css('left'));
    nextLeft = (5 * direction) + currentLeft;
    maxLeft = parseInt(container.css('width')) - parseInt(vessel.css('width'));
    if (nextLeft < 0) {
      nextLeft = 0;
    } else if (nextLeft > maxLeft) {
      nextLeft = maxLeft;
    }
    return vessel.css('left', nextLeft + 'px');
  };
  fire = function() {
    var bullet, bulletLeft;
    bulletLeft = parseInt(vessel.css('left')) + 6;
    bullet = $('<div class="bullet"></div>');
    container.append(bullet);
    if (bullet.offset().top < 0) {
      return bullet.remove();
    } else {
      return bullet.css("left", bulletLeft + 'px');
    }
  };
  _moveBulletUp = function() {
    var allBullets;
    allBullets = container.find('.bullet');
    return allBullets.each(function() {
      var bullet, currentBottom, nextBottom;
      bullet = $(this);
      currentBottom = parseInt(bullet.css('bottom'));
      nextBottom = currentBottom + 10;
      return bullet.css('bottom', nextBottom + 'px');
    });
  };
  asteroidDestoyed = function() {
    container.find('.bullet').remove();
    container.find('.asteroid').css('left', '20px');
    return _incrementCounter();
  };
  _moveAsteroid = function() {
    var asteroid, currentLeft, maxLeft, nextLeft;
    asteroid = container.find('.asteroid');
    currentLeft = parseInt(asteroid.css('left'));
    nextLeft = (5 * asteroidDirection) + currentLeft;
    maxLeft = parseInt(container.css('width')) - parseInt(asteroid.css('width')) - 20;
    if (nextLeft < 20) {
      nextLeft = 20;
      asteroidDirection = 1;
    } else if (nextLeft > maxLeft) {
      nextLeft = maxLeft;
      asteroidDirection = -1;
    }
    return asteroid.css('left', nextLeft + 'px');
  };
  _incrementCounter = function() {
    asteroidDestroyedCount++;
    return counter.text(asteroidDestroyedCount);
  };
  timeRemaining = function(percent) {
    var timerBar;
    timerBar = timer.find('>div');
    timerBar.css('width', percent + "%");
    if (percent < 15) {
      return timerBar.css('background-color', 'red');
    } else if (percent < 40) {
      return timerBar.css('background-color', 'orange');
    } else {
      return timerBar.css('background-color', 'green');
    }
  };
  spawnBonus = function(left, top) {
    var bonus;
    bonus = $('<div class="bonus"></div>');
    container.append(bonus);
    bonus.css('top', top + 'px');
    return bonus.css('left', left + 'px');
  };
  view = {};
  view.init = init;
  view.moveVessel = moveVessel;
  view.fire = fire;
  view.newTick = newTick;
  view.timeRemaining = timeRemaining;
  view.gameOver = gameOver;
  view.asteroidDestoyed = asteroidDestoyed;
  view.spawnBonus = spawnBonus;
  view.getAsteroid = function() {
    return container.find('.asteroid');
  };
  view.getBullets = function() {
    return container.find('.bullet');
  };
  view.getBonus = function() {
    return container.find('.bonus');
  };
  _view = view;
  return context[namespace] = _view;
};

window.gameV = buildView();
