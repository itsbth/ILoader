// Generated by CoffeeScript 1.3.1
(function() {
  var addScript, alias, external, head, loaded, loading, module, modules, onload,
    __slice = [].slice;

  Function.prototype.argumentNames = function() {
    var args;
    args = /^function\s*\(([A-Za-z0-9\$_, ]*)\)\s*{/.exec(this)[1].split(/,\s*/);
    if (args.length === 1 && args[0] === '') {
      return [];
    }
    return args;
  };

  head = document.getElementsByTagName('head')[0];

  addScript = function(src, onload) {
    var script;
    script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', onload);
    script.addEventListener('load', function() {
      return head.removeChild(script);
    });
    return head.appendChild(script);
  };

  external = {};

  modules = {};

  loading = {};

  alias = {};

  onload = {};

  loaded = function(name, mod) {
    var evt, _i, _len, _ref, _results;
    if (modules[name]) {
      return;
    }
    modules[name] = mod;
    if (onload[name]) {
      _ref = onload[name];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        evt = _ref[_i];
        _results.push(evt(modules[name]));
      }
      return _results;
    }
  };

  window.module = module = function(name, func) {
    var dependencies;
    dependencies = func.argumentNames();
    return module.load(dependencies, function(mods) {
      return loaded(name, func.apply(this, mods));
    });
  };

  module.load = function(mods, cb) {
    var count, mod, todo, _i, _len, _results;
    if (!Array.isArray(mods)) {
      mods = [mods];
    }
    mods = mods.map(function(m) {
      return alias[m] || m;
    });
    todo = mods.filter(function(m) {
      return !modules[m];
    });
    if (todo.length === 0) {
      return cb(mods.map(function(m) {
        return mods[m];
      }));
    }
    count = todo.length;
    _results = [];
    for (_i = 0, _len = todo.length; _i < _len; _i++) {
      mod = todo[_i];
      _results.push((function(mod) {
        (onload[mod] || (onload[mod] = [])).push(function() {
          if (--count === 0) {
            loading[mod] = false;
            cb(mods.map(function(m) {
              return modules[m];
            }));
            return loaded(mod);
          }
        });
        if (!loading[mod]) {
          loading[mod] = true;
          return addScript("js/" + mod + ".js", function() {
            if (external[mod]) {
              loading[mod] = false;
              return loaded(mod, external[mod]());
            }
          });
        }
      })(mod));
    }
    return _results;
  };

  module.registerExternal = function() {
    var aliases, aname, func, name, _i, _j, _len, _results;
    name = arguments[0], aliases = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), func = arguments[_i++];
    external[name] = func;
    _results = [];
    for (_j = 0, _len = aliases.length; _j < _len; _j++) {
      aname = aliases[_j];
      _results.push(alias[aname] = name);
    }
    return _results;
  };

  module.debug = function() {
    return {
      external: external,
      modules: modules,
      loading: loading,
      alias: alias,
      onload: onload
    };
  };

}).call(this);
