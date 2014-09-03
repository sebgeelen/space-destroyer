buildView = (context = window, namespace = "gameV") ->
  options =
    "container" : null

  _gameV                 = context[namespace]
  container              = null
  counter                = null
  timer                  = null
  vessel                 = null
  asteroidDirection      = 1 # 1 = right, -1 = left
  asteroidDestroyedCount = 0

  if _gameV # singleton
    return _gameV;

  # init
  init = (opt) ->
    console.log 'view init'
    if opt isnt undefined
      jQuery.extend options, opt

    container = $(options.container)
    counter   = $(options.counter)
    timer     = $(options.timer)
    vessel    = container.find("#vessel")

  # tick event arrive here
  newTick = () ->
    _moveBulletUp()
    _moveAsteroid()

  # shwo game over screen
  gameOver = ->
    container.find('#game-over').show()

  ##  1 = toward the right
  ## -1 = toward the left
  moveVessel = (direction = 1) ->
    currentLeft = parseInt(vessel.css('left'))
    nextLeft    = (5 * direction) + currentLeft

    maxLeft     = parseInt(container.css('width')) - parseInt(vessel.css('width'))

    if nextLeft < 0
      nextLeft = 0;
    else if nextLeft > maxLeft
      nextLeft = maxLeft

    vessel.css 'left', nextLeft + 'px'

  ## create a new bullet in front of the vessel
  fire = ->
    bulletLeft = parseInt(vessel.css('left')) + 6;

    bullet = $('<div class="bullet"></div>')

    container.append bullet
    if bullet.offset().top < 0 ## clean lost bullet
      bullet.remove()
    else
      bullet.css "left", bulletLeft + 'px'

  _moveBulletUp = ->
    allBullets = container.find('.bullet')

    allBullets.each ->
      bullet = $ this
      currentBottom = parseInt(bullet.css('bottom'))
      nextBottom = currentBottom + 10

      bullet.css 'bottom', nextBottom + 'px'

  asteroidDestoyed = ->
    container.find('.bullet').remove()
    container.find('.asteroid').css 'left', '20px'

    _incrementCounter()

  # move the asteroid every tick
  _moveAsteroid = ->
    asteroid = container.find '.asteroid'

    currentLeft = parseInt(asteroid.css('left'))
    nextLeft    = (5 * asteroidDirection) + currentLeft

    maxLeft     = parseInt(container.css('width')) - parseInt(asteroid.css('width')) - 20

    if nextLeft < 20
      nextLeft = 20;
      asteroidDirection = 1
    else if nextLeft > maxLeft
      nextLeft = maxLeft
      asteroidDirection = -1

    asteroid.css 'left', nextLeft + 'px'

  ## increment the destroied asteroid counter
  _incrementCounter = ->
    asteroidDestroyedCount++
    counter.text(asteroidDestroyedCount)

  ## change the timer bar
  timeRemaining = (percent) ->
    timerBar = timer.find '>div'
    timerBar.css 'width', percent + "%"

    if(percent < 15)
      timerBar.css 'background-color', 'red'
    else if(percent < 40)
      timerBar.css 'background-color', 'orange'
    else
      timerBar.css 'background-color', 'green'


  spawnBonus = (left, top) ->
    bonus = $ '<div class="bonus"></div>'
    container.append bonus

    bonus.css 'top', top + 'px'
    bonus.css 'left', left + 'px'

  view = {}
  view.init              = init
  view.moveVessel        = moveVessel
  view.fire              = fire
  view.newTick           = newTick
  view.timeRemaining     = timeRemaining
  view.gameOver          = gameOver
  view.asteroidDestoyed  = asteroidDestoyed
  view.spawnBonus        = spawnBonus

  ## geters
  view.getAsteroid = ->
    container.find '.asteroid'

  view.getBullets = ->
    container.find '.bullet'

  view.getBonus = ->
    container.find '.bonus'

  _view                  = view
  context[namespace]     = _view;

window.gameV = buildView();
