(function() {
  $(function() {
    gameV.init({
      'container': '#game-wrapper',
      'counter': '#counter',
      'timer': '#timer'
    });
    return gameC.init({
      'view': gameV
    });
  });

}).call(this);
