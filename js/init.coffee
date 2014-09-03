$ ->
  # view Class
  gameV.init
    'container': '#game-wrapper'
    'counter'  : '#counter'
    'timer'    : '#timer'

  # Controller class
  gameC.init
    'view' : gameV
