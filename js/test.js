// Generated by CoffeeScript 1.3.1
(function() {

  module('test', function(_, rabbit) {
    return {
      hello: function() {
        return "List: " + (_.shuffle(['alpha', 'beta', 'gamma']).join(', ')) + ". Rabbit hole is " + rabbit.hole + ".";
      }
    };
  });

}).call(this);