var buildController;

buildController = function(context, namespace) {
  var controller, init, maxTickToTouch, nbrTickSinceTouch, options, tickTimeMs, view, _controller, _gameC, _gameTickEnabled, _initKeyBinding, _keyPress, _newTick, _randomBonus, _startGameTicks, _testBonusHit, _testBulletHit, _testObjHit, _tickClock, _toggleGameTick;
  if (context == null) {
    context = window;
  }
  if (namespace == null) {
    namespace = "gameC";
  }
  options = {
    "controller": null
  };
  _gameC = context[namespace];
  view = null;
  _tickClock = null;
  _gameTickEnabled = true;
  maxTickToTouch = 240;
  nbrTickSinceTouch = 0;
  tickTimeMs = 50;
  if (_gameC) {
    return _gameC;
  }
  init = function(opt) {
    console.log('controller init');
    if (opt !== void 0) {
      jQuery.extend(options, opt);
    }
    view = options.view;
    _initKeyBinding();
    return _startGameTicks();
  };
  _startGameTicks = function() {
    if (_gameTickEnabled) {
      return _tickClock = setTimeout(function() {
        _newTick();
        return _startGameTicks();
      }, tickTimeMs);
    }
  };
  _newTick = function() {
    var percent;
    nbrTickSinceTouch++;
    view.newTick();
    _testBulletHit();
    _testBonusHit();
    _randomBonus();
    if (nbrTickSinceTouch < maxTickToTouch) {
      percent = 100 - (100 / maxTickToTouch * nbrTickSinceTouch);
      return view.timeRemaining(percent);
    } else {
      view.gameOver();
      return _gameTickEnabled = false;
    }
  };
  _toggleGameTick = function() {
    if (_gameTickEnabled) {
      return _gameTickEnabled = false;
    } else {
      _gameTickEnabled = true;
      return _startGameTicks();
    }
  };
  _testObjHit = function(obj, target) {
    var hit, objLeft, objTop, targetBottom, targetLeft, targetRight, targetTop;
    hit = false;
    targetTop = target.offset().top;
    targetLeft = target.offset().left;
    targetBottom = targetTop + parseInt(target.css('height'));
    targetRight = targetLeft + parseInt(target.css('width'));
    objTop = obj.offset().top;
    objLeft = obj.offset().left;
    if (objTop < targetBottom && objTop > targetTop) {
      if (objLeft > targetLeft && objLeft < targetRight) {
        hit = true;
      }
    }
    return hit;
  };
  _testBulletHit = function() {
    var allBullets, asteroid;
    allBullets = view.getBullets();
    asteroid = view.getAsteroid();
    return allBullets.each(function() {
      var bullet;
      bullet = $(this);
      if (_testObjHit(bullet, asteroid)) {
        nbrTickSinceTouch = 0;
        tickTimeMs = Math.floor(tickTimeMs * 0.95);
        return view.asteroidDestoyed();
      }
    });
  };
  _testBonusHit = function() {
    var allBonus, allBullets;
    allBullets = view.getBullets();
    allBonus = view.getBonus();
    return allBonus.each(function() {
      var bonus;
      bonus = $(this);
      return allBullets.each(function() {
        var bullet;
        bullet = $(this);
        if (_testObjHit(bullet, bonus)) {
          nbrTickSinceTouch = 0;
          maxTickToTouch *= 1.1;
          return allBonus.remove();
        }
      });
    });
  };
  _randomBonus = function() {
    var left, rand, top;
    rand = Math.random();
    if (rand < 0.01 && view.getBonus().length < 3) {
      console.log("spawn Bonus");
      top = Math.floor(Math.random() * 400) + 50;
      left = Math.floor(Math.random() * 250) + 10;
      return view.spawnBonus(left, top);
    }
  };
  _initKeyBinding = function() {
    return $(document).off('keypress').on('keypress', _keyPress);
  };
  _keyPress = function(e) {
    var k;
    k = e.key.toLowerCase();
    if (k === "right") {
      e.preventDefault();
      return view.moveVessel();
    } else if (k === "left") {
      e.preventDefault();
      return view.moveVessel(-1);
    } else if (k === " ") {
      e.preventDefault();
      return view.fire();
    } else if (k === "s") {
      e.preventDefault();
      return _toggleGameTick();
    } else {
      return console.log(e);
    }
  };
  controller = {};
  controller.init = init;
  _controller = controller;
  return context[namespace] = _controller;
};

window.gameC = buildController();
