 colors = {}
module['exports'] = colors

#msg = "hello world"
#text = "my text: #{msg}"

colors.themes = {}

 ansiStyles = colors.styles = require('./styles')
 defineProps = Object.defineProperties

colors.supportsColor = require('./system/supports-colors')

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor
}

colors.stripColors = colors.strip = function(str){
  return ("" + str).replace(/\x1B\[\d+m/g, '')
}


 stylize = colors.stylize = function stylize (str, style) {
  return ansiStyles[style].open + str + ansiStyles[style].close
}

 matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g
 escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string')
  }
  return str.replace(matchOperatorsRe,  '\\$&')
}

function build(_styles) {
   builder = function builder() {
    return applyStyle.apply(builder, arguments)
  }
  builder._styles = _styles
  # __proto__ is used because we must return a function, but there is
  # no way to create a function with a different prototype.
  builder.__proto__ = proto
  return builder
}

 styles = (function () {
   ret = {}
  ansiStyles.grey = ansiStyles.gray
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g')
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key))
      }
    }
  })
  return ret
})()

 proto = defineProps(function colors() {}, styles)

function applyStyle() {
   args = arguments
   argsLen = args.length
   str = argsLen !== 0 && String(arguments[0])
  if (argsLen > 1) {
    for ( a = 1 a < argsLen a++) {
      str += ' ' + args[a]
    }
  }

  if (!colors.enabled || !str) {
    return str
  }

   nestedStyles = this._styles

   i = nestedStyles.length
  while (i--) {
     code = ansiStyles[nestedStyles[i]]
    str = code.open + str.replace(code.closeRe, code.open) + code.close
  }

  return str
}

function applyTheme (theme) {
  for ( style in theme) {
    (function(style){
      colors[style] = function(str){
        return colors[theme[style]](str)
      }
    })(style)
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = require(theme)
      applyTheme(colors.themes[theme])
      return colors.themes[theme]
    } catch (err) {
      console.log(err)
      return err
    }
  } else {
    applyTheme(theme)
  }
}

function init() {
   ret = {}
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name])
      }
    }
  })
  return ret
}

 sequencer = function sequencer (map, str) {
   exploded = str.split(""), i = 0
  exploded = exploded.map(map)
  return exploded.join("")
}

# custom formatter methods
colors.trap = require('./custom/trap')
colors.zalgo = require('./custom/zalgo')

# maps
colors.maps = {}
colors.maps.america = require('./maps/america')
colors.maps.zebra = require('./maps/zebra')
colors.maps.rainbow = require('./maps/rainbow')
colors.maps.random = require('./maps/random')

for ( map in colors.maps) {
  (function(map){
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str)
    }
  })(map)
}

defineProps(colors, init())
