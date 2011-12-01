// Model

var World = {
	board: {
		height: 800,
		width : 600
	},
	init: function() {
		this.cells = {};
		return this;
	},
	spawn: function(x, y) {
		this.set_cell(x, y, true);
	},
	kill: function(x, y) {
		this.set_cell(x, y, false);
	},
	set_cell: function(x, y, value) {
	  if ( this.cells[y] == undefined ) this.cells[y] = []
		this.cells[y][x] = value;
	},
	cell_at: function(x, y) {
	  if ( this.cells[y] == undefined ) return false;
	  if ( this.cell[y][x] == undefined ) return false;
	  return this.cells[y][x];
	},
	evolve: function() {
	  new_world = this.init();
	  this.each_cell(function(x, y) {
	    if (this.cell_lives_p(x, y)) new_world.spawn(x, y);
	  });

	  final_world = this.init();
	  this.each_cell(function(x, y) {
	    if(new_world.cell_born_p(x, y)) final_world.spawn(x, y);
	  });

	  this.cells = final_world.cells;

	},
	each_neighbour: function(x, y, callback) {
	  positions = [[x-1, y-1],
                 [x,   y-1],
                 [x+1, y-1],
                 [x+1, y  ],
                 [x+1, y+1],
                 [x,   y+1],
                 [x-1, y+1],
                 [x-1, y  ]];
	  for ( var i = 0; i < positions.length; i++ ) 
	    callback(positions[i][0], positions[i][1]);

	},
	spawn_neighbouring_cells: function(old_world, world, x, y) {
	  old_world.each_neighbour(x, y, function(neighbour_x, neighbour_y) {
	    if (world.cell_lives(neighbour_x, neighbour_y)) 
        world.spawn(neighbour_x, neighbour_y)
	  });
	},
  cell_lives_p: function(x, y) {
    neighbour_count = this.neighbour_count(x, y);
    if (neighbour_count == 3)
      return true;
    else
      return false;
  },
  cell_born_p: function(x, y) {
    if (this.neighbour_count(x, y) == 3)
      return true;
    else
      return false;
  },
	neighbour_count: function(x, y) {
	  count = 0;
	  self = this;
	  this.each_neighbour(x, y, function(x, y) { 
	    if ( self.cell_at(x, y) ) count++; 
    });

	  return count;
	},
	each_cell: function(callback) {
		for (var x in this.cells) 
			for (var y in this.cells[x]) 
				callback(x, y);
	},
	initialize_random: function() {
		this.init();

		for (var i = 0; i < 800; ++i) 
		  for (var j = 0; j < 600; ++j)
        if ( Math.floor(Math.random() * 2) == 1 ) this.spawn(i, j);

    return this;
	}

}

// Controller
var Game = { 
  world: null, 
	start: function() {
	  this.world = World.init();	
	},
	evolve: function() {
  }
}

var CELL_SIZE = 6;
// View
var GameView = {
	draw_game: function(world) {
		this.clear();

		self = this;
		world.each_cell(function(x, y) {
			self.draw_cell(x, y)
		});
	},

	initialize: function(select, height, width) {
		this.canvas = document.getElementById(select);
		this.context = canvas.getContext('2d');
		this.height = height;
		this.width  = width;
		this.context.strokeRect(0, 0, width, height);
		return this;
		
	},
	draw_cell: function(x, y) {
	  this.context.fillStyle = "red";
	  this.context.strokeStyle = 'red';
	  this.context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	},
	clear: function() {
	}
}
