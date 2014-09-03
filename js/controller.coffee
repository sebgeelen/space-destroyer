buildController = (context = window, namespace = "gameC") ->
  options =
    "controller" : null

  _gameC            = context[namespace]
  view              = null
  _tickClock        = null
  _gameTickEnabled  = true
  maxTickToTouch    = 240
  nbrTickSinceTouch = 0
  tickTimeMs        = 50

  if _gameC # singleton
    return _gameC;

  # init
  init = (opt) ->
    console.log 'controller init'
    if opt isnt undefined
      jQuery.extend options, opt

    view = options.view

    _initKeyBinding()

    _startGameTicks()

  # game Tick every x ms
  _startGameTicks = ->
    if _gameTickEnabled
      _tickClock = setTimeout ->
        _newTick()
        _startGameTicks()
      , tickTimeMs

  _newTick = ->
    nbrTickSinceTouch++
    view.newTick()

    _testBulletHit()
    _testBonusHit()
    _randomBonus()

    if nbrTickSinceTouch < maxTickToTouch
      percent = 100 - (100 / maxTickToTouch  * nbrTickSinceTouch)
      view.timeRemaining(percent)
    else
      view.gameOver();
      _gameTickEnabled = false

  _toggleGameTick = ->
    if _gameTickEnabled
      _gameTickEnabled = false
    else
      _gameTickEnabled = true
      _startGameTicks()

  # generic hitbox method
  _testObjHit = (obj, target) ->
    hit = false

    targetTop    = target.offset().top
    targetLeft   = target.offset().left
    targetBottom = targetTop + parseInt(target.css('height'))
    targetRight  = targetLeft + parseInt(target.css('width'))

    objTop  = obj.offset().top
    objLeft = obj.offset().left

    if objTop < targetBottom and objTop > targetTop
      if objLeft > targetLeft and objLeft < targetRight
        hit = true

    return hit

  #test if the bullet touch the asteroid
  _testBulletHit = ->

    allBullets     = view.getBullets()
    asteroid       = view.getAsteroid()

    allBullets.each ->
      bullet = $ this
      if _testObjHit(bullet, asteroid)
        nbrTickSinceTouch = 0
        tickTimeMs = Math.floor(tickTimeMs * 0.95)
        view.asteroidDestoyed()


  #test if the bullet touch the asteroid
  _testBonusHit = ->
    allBullets     = view.getBullets()
    allBonus       = view.getBonus()

    allBonus.each ->
      bonus = $ this

      allBullets.each ->
        bullet = $ this
        if _testObjHit(bullet, bonus)
            nbrTickSinceTouch = 0
            maxTickToTouch *= 1.1
            allBonus.remove()

  # spawn bonus randmly on the field
  _randomBonus = () ->
    rand = Math.random();

    if rand < 0.01 and view.getBonus().length < 3
      console.log "spawn Bonus"
      top = Math.floor(Math.random() * 400 ) + 50
      left = Math.floor(Math.random() * 250 ) + 10

      view.spawnBonus left, top

  # bind keys
  _initKeyBinding =  ->
    $(document).off('keypress').on 'keypress', _keyPress

  _keyPress = (e) ->
    k = e.key.toLowerCase()

    if k is "right"
      e.preventDefault()
      view.moveVessel()
    else if k is "left"
      e.preventDefault()
      view.moveVessel(-1)
    else if k is " "
      e.preventDefault()
      view.fire()
    else if k is "s"
      e.preventDefault()
      _toggleGameTick()
    else
      console.log(e);

  controller = {}
  controller.init              = init

  _controller                  = controller
  context[namespace]     = _controller;

window.gameC = buildController();
