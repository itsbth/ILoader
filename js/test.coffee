module 'test', (_, rabbit) ->
  hello: -> "List: #{_.shuffle(['alpha', 'beta', 'gamma']).join ', '}. Rabbit hole is #{rabbit.hole}."