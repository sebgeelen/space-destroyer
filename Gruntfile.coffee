module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-coffee'

  grunt.initConfig
    less:
      options:
        compress: true

      css:
        cwd: ''
        src: ['./css/css.less']
        dest: './css/css.css'

    coffee:
      compile:
        files:
          './js/init.js': './js/init.coffee'

      bared:
        options:
          bare: true
        files:
          './js/view.js': './js/view.coffee'
          './js/controller.js': './js/controller.coffee'

    watch:
      less:
        files: ['./css/*.less'],
        tasks: ['less']
      coffee:
        files: ['./js/*.coffee'],
        tasks: ['coffee']

  grunt.event.on 'coffee.error', (msg) ->
    console.log "ERROR : " + msg

  grunt.registerTask 'default', ['less','coffee']
