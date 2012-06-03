ILoader
=======
Experimental JavaScript module loader, using argument names to figure out dependencies.

Usage
=====
Don't use it. Seriously.

This was just a random idea I got after staying up all night, and is little more than a proof of concept.
This is the second iteration, which was supposed to be a cleaner rewrite of the first one, a task at which I failed spectacularly at (although this one does work).

If you still want to use it, include `loader.js`, and call the `module(name, func)` function.
```
module('main', function ($) {
  // use $ here
});
```
It's currently hardcoded to load modules from js/{name}.js, and contains no error handling.
"External" (ie not using this module system) modules can be registered using `module.registerExternal(name, aliases..., func)` functions.
```
module.registerExternal('jquery', '$', function () { return $.noConflict(); });
module.registerExternal('underscore', '_', function () { return _.noConflict(); });
```

Browser Support
===============
It has been successfully tested in Firefox Aurora 14.2a, Chrome 19.0.1084.52, and Opera 11.64.