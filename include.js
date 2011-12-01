$(document).ready(function() {
  var w = World.initialize_random();
  var v = GameView.initialize();
  v.draw_game(w);

  $('#step').click(function() {
    w.evolve();
    v.draw_game(w);
  });
  // var v = GameView.initialize("canvas", 800, 600);
});

