$(document).ready(function() {
	// World object testing
	module('model');

	test("init should return a new world object", function() {
	  var world = World.init();
	  equal(typeof(world), "object");
	});

	test("spawn(x, y) should set the cell at x, y to true", function() { 
		var world = World.init();
		world.spawn(2,1);
		ok(world.cell_at(2, 1));
	});

	test("kill(x, y) should set the cell at x, y to true", function() { 
		var world = World.init();
		world.kill(2,1);
		ok(!world.cells[2][1]);
	});

	test("cell_at(x, y) should return the value of the cell at (x, y)", function() { 
		var world = World.init();
		world.cells = 
		[
		  [0,0,0,0],
		  [0,1,0,0],
		  [0,1,1,0],
		  [1,0,0,0]
		];
		equals(world.cell_at(0,0) , 0);
		equals(world.cell_at(1,1) , 1);
		equals(world.cell_at(-1,0), 0);
	});

	test("neighbour_count(x, y) return the count of live cells adjacent to (x, y)", function() { 
		world = World.init();
		world.cells = 
		[
		  [0,0,0,0],
		  [0,1,0,0],
		  [0,1,1,0],
		  [1,0,0,0]
		];
		equals(world.neighbour_count(0, 0), 1);
		equals(world.neighbour_count(3, 0), 0);
		equals(world.neighbour_count(2, 1), 2);
		equals(world.neighbour_count(1, 2), 3);
	});

/*
	test("each_neighbour(x, y, f) executes f for each neighbour of cell (x, y)", function() { 
		var world = World.init();
		world.cells = 
		[
		  [0,0,0,0],
		  [0,1,0,0],
		  [0,1,1,0],
		  [1,0,0,0]
		];

		count = 0;
		world.each_neighbour(1, 2, function(x, y) {
      if ( world.cell_at(x, y) ) count++; 
		});

		equals(count, 3);
	});

	test("cell_lives_p(x, y) should return true if cell lives to next generation", function() { 
		var world = World.init();
		world.cells = 
		[
		  [0,0,0,0],
		  [0,1,0,0],
		  [0,1,1,0],
		  [1,0,0,0]
		];

    ok(world.cell_lives_p(1,2));
    ok(!world.cell_lives_p(1,1));
	});

	test("cell_born_p(x, y) should return true if cell is born in next generation", function() { 
		var world = World.init();
		world.cells = 
		[
		  [0,0,0,0],
		  [0,1,0,0],
		  [0,0,1,0],
		  [1,0,0,0]
		];

    ok(world.cell_born_p(1,2));
    ok(!world.cell_born_p(3,3));
	});
	*/
});
