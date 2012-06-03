Function::argumentNames = ->
  args = /^function\s*\(([A-Za-z0-9\$_, ]*)\)\s*{/.exec(@)[1].split /,\s*/
  if args.length == 1 and args[0] == ''
    return []
  return args

head = document.getElementsByTagName('head')[0]
addScript = (src, onload) ->
  script = document.createElement 'script'
  script.src = src
  script.addEventListener 'load', onload
  script.addEventListener 'load', ->
    head.removeChild(script)
  head.appendChild(script)

external = {}
modules = {}
loading = {}
alias = {}
onload = {}

loaded = (name, mod) ->
  return if modules[name]
  modules[name] = mod
  evt(modules[name]) for evt in onload[name] if onload[name]

window.module = module = (name, func) ->
  dependencies = func.argumentNames()
  module.load dependencies, (mods) ->
    loaded name, func.apply(this, mods)

module.load = (mods, cb) ->
  mods = [mods] unless Array.isArray(mods)
  mods = mods.map (m) -> alias[m] || m
  todo = mods.filter (m) -> not modules[m]
  if todo.length is 0
    return cb(mods.map (m) -> mods[m])
  count = todo.length
  for mod in todo
    do (mod) ->
      (onload[mod] ||= []).push ->
        if --count is 0
          loading[mod] = false
          cb(mods.map (m) -> modules[m])
          loaded(mod)
      unless loading[mod]
        loading[mod] = true
        addScript "js/#{mod}.js", ->
          if external[mod]
            loading[mod] = false
            loaded mod, external[mod]()

module.registerExternal = (name, aliases..., func) ->
  external[name] = func
  for aname in aliases
    alias[aname] = name

module.debug = ->
  {external, modules, loading, alias, onload}