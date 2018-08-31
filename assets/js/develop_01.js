

var tallyWinPatternsBoard = [
  { id0 : "", id1 : "", id2 : "" },
  { id3 : "", id4 : "", id5 : "" },
  { id6 : "", id7 : "", id8 : "" },
  { id0 : "", id3 : "", id6 : "" },
  { id1 : "", id4 : "", id7 : "" },
  { id2 : "", id5 : "", id8 : "" },
  { id0 : "", id4 : "", id8 : "" },
  { id2 : "", id4 : "", id6 : "" }
];

for ( var c = 0; c < 8; c++ ) {
  var y = Object.entries(tallyWinPatternsBoard[c]);
  console.log(y);
  // evalWin(y);
}

for ( var c = 0; c < 8; c++ ) {
  var y = tallyWinPatternsBoard[c];
  console.log(y);
  // evalWin(y);
}

for ( i = 0; i <= 9; i++ ) {
  console.log(board['id' + i]);
}

var board = { id0 : "O", id1 : "X", id2 : "X", id3 : "", id4 : "O", id5 : "", id6 : "", id7 : "", id8 : "" };
for ( var tagID in board ) {
  console.log(tagID);
}

// var id = 'id';
// var x = 0;


var tallyWinPatternsBoard = [
  { id0 : "T", id1 : "", id2 : "" },
  { id3 : "T", id4 : "", id5 : "" },
  { id6 : "T", id7 : "", id8 : "" },
  { id0 : "T", id3 : "", id6 : "" },
  { id1 : "T", id4 : "", id7 : "" },
  { id2 : "T", id5 : "", id8 : "" },
  { id0 : "T", id4 : "", id8 : "" },
  { id2 : "T", id4 : "", id6 : "" }
];

var board = { id0 : "O", id1 : "X", id2 : "X", id3 : "", id4 : "O", id5 : "O", id6 : "X", id7 : "", id8 : "" };

var tallyWins = function() {
  for ( i = 0; i < 8; i++ ) {
    for ( var cellID in tallyWinPatternsBoard[i] ) {
      for ( var tagID in board ) {
        if ( cellID == tagID ){
          tallyWinPatternsBoard[i][cellID] = board[tagID];
        }
      }
    }
  }
}
tallyWins();
console.log(tallyWinPatternsBoard);

      // for ( x = 0; x <= 9; x++ ) {
      // }





var GO = "GAME OVER!!!";
var X = x = "X", O = o = "O";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
var i = 0;

var game_over = function(cell) {
  console.log( '"' + cell + '"' + ', It\'s your turn!' );
}

var x_turn = function(cell) {
  console.log( '"' + cell + '"' + ', It\'s your turn!' );
  i++;
}

var o_turn = function(cell) {
  console.log( '"' + cell + '"' + ', It\'s your turn!' );
  i++;
}

var start_game = function(game_turns) {
  var cell = game_turns[i];
  if ( cell == GO ) {
    game_over( cell );
  } else if ( cell == x ) {
    x_turn( cell );
  } else if ( cell == o ) {
    o_turn( cell );
  }
}

start_game(game_turns);


























var x = "X";
var o = "O";
var win_patterns_for_machine = [];
var temp = [];
var id_cells_available_for_machine_play  = [];

// var tallyWinPatternsBoard = [
//   {id0: "X", id1: "", id2: ""},
//   {id3: "", id4: "O", id5: ""},
//   {id6: "", id7: "", id8: ""},
//   {id0: "X", id3: "", id6: ""},
//   {id1: "", id4: "O", id7: ""},
//   {id2: "", id5: "", id8: ""},
//   {id0: "X", id4: "O", id8: ""},
//   {id2: "", id4: "O", id6: ""}
// ];

var tallyWinPatternsBoard = [
  {id0: "O", id1: "", id2: ""},
  {id3: "", id4: "X", id5: ""},
  {id6: "", id7: "", id8: ""},
  {id0: "O", id3: "", id6: ""},
  {id1: "", id4: "X", id7: ""},
  {id2: "", id5: "", id8: ""},
  {id0: "O", id4: "X", id8: ""},
  {id2: "", id4: "X", id6: ""}
];

var beginPlay = function() {
  loop_TWPB_for_machine_play(tallyWinPatternsBoard);
  loop_win_patterns_for_machine(win_patterns_for_machine);
  flatten_win_patterns_to_single_array();
  extract_cells_taken_by_machine();
}

var loop_TWPB_for_machine_play = function(tallyWinPatternsBoard) {
  for ( i = 0; i < tallyWinPatternsBoard.length; i++ ) {
    var y = Object.entries(tallyWinPatternsBoard[i]);
    evaluate_TWPB_For_Machine_Play(y);
  }
}

var check_win_patterns_for_taken_cells = function(cell, y) {
  return y[0][1] != cell && y[1][1] != cell && y[2][1] != cell;
}

var evaluate_TWPB_For_Machine_Play = function(y) {
  if ( check_win_patterns_for_taken_cells(x, y) ) {
    win_patterns_for_machine.push(y);
  }
}

var loop_win_patterns_for_machine = function(win_patterns_for_machine) {
  for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
    var y = win_patterns_for_machine[i];
    evaluate_win_patterns_for_machine(y);
  }
  reset_win_patterns_for_machine();
}

var check_win_pattern_for_O = function(cell, y) {
  return y[0][1] == cell || y[1][1] == cell || y[2][1] == cell;
}

var evaluate_win_patterns_for_machine = function(y) {
  if ( check_win_pattern_for_O(o, y) ) {
    temp.push(y);
  }
}

var reset_win_patterns_for_machine = function() {
  win_patterns_for_machine = temp;
  temp = [];
}

var flatten_win_patterns_to_single_array = function() {
  for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
    for ( x = 0; x < win_patterns_for_machine[i].length; x++ ) {
      temp.push(win_patterns_for_machine[i][x]); 
    }
  }
  reset_win_patterns_for_machine();
}

var extract_cells_taken_by_machine = function() {
  for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
    if ( win_patterns_for_machine[i][1] == "" ) {
      id_cells_available_for_machine_play.push(win_patterns_for_machine[i][0]);
    }
  }
  reset_win_patterns_for_machine();
}

beginPlay();
console.log(temp);
console.log(win_patterns_for_machine);
console.log(id_cells_available_for_machine_play);

// +++++++++++++++++++++++++++








var start_game = function() {
  prompt('Human takes first turn! :)');



}

















var family = [ "Monty", "Rosaline", "Kaline", "Kendi", "Kanyon" ];
var stuff  = [1,2,3,4,5];
console.log(family);
console.log(stuff);

family = stuff;
console.log(family);


var obj = { "id0": "X" , "id1": "" , "id2": "" };
y = Object.entries(obj);

if ( y[0][1] == "X" || y[1][1] == "X" || y[2][1] == "X" ) {
  console.log(y);
} else {
  console.log('NO MATCHES')
}


var family = [ "Monty", "Rosaline", "Kaline", "Kendi", "Kanyon" ];

for ( let i = 0; i < family.length; i++ ) {
  console.log(family[0]);
}




var y = [ [ 'id0', 'O' ], [ 'id1', 'O' ], [ 'id2', 'O' ] ];
var y = [ [ 'id0', ''  ], [ 'id1', 'X' ], [ 'id2', ''  ] ];
var y = [ [ 'id0', 'X' ], [ 'id1', 'X' ], [ 'id2', 'X' ] ];

var evalWin = function( y ) {
    this.y = y;
    var a = y[0][1];
    var b = y[1][1];
    var c = y[2][1];
    if ( a,b,c == 'X' ) {
    alert("X YOU WIN!!!");
  } else if ( a,b,c == 'O' ) {
    alert("O YOU WIN!!!");
  } else {
    alert("NO MATCH!!!");
  }
}
evalWin(y);
    
for ( let i = 0; i < 3; i++ ) {
}


var win = [ ['id0', 'X'], ['id1', 'X'], ['id2', 'X'] ];
var evalForWin = function(win) {
  for ( let i of win ) {
    console.log(i);
  }
}

evalForWin();

for ( i = 1; i <= 10; i++ ) {
  console.log(i)
}

var names = [ 'Monty', 'Rosaline', 'Kaline', 'Kendi', 'Kanyon' ];
for ( name of names ) {
  console.log(name);
}


var outer = function() {
  var a = "look at me";
  var b = "cheeseburger";

  var inner = function() {
    console.log(a);
    console.log(b);
  }
  return inner;
}

var thing = outer();
thing();


var tttInit = function() {
    this.x            = "x";
    this.o            = "o";
    this.board        = new Array(9).fill("");
    this.win          = [["x","x","x"],
                         ["o","o","o"]];



  TicTacToe.prototype = {
    init: function() {
      var tictactoe = this;
    }
  }

  var listenerSetup = function() {
    var setListeners = [];
    for ( i = 0; i < 9; i++ ) {
      setListeners.push('var id' + i + ' = document.getElementById("' + i + '");');
      setListeners.push('id' + i + '.addEventListener("click", function() {' + 'id' + i + '.innerHTML = changeXO();' + '},);');
    }
    for ( var listener of setListeners ) { eval( listener ); }
  }

  return TicTacToe;




  window.addEventListener( "load", function() {
});


var setListeners = [];
for ( var i = 0; i < 9; i++ ) {
  setListeners.push('var id' + i + ' = document.getElementById("' + i + '");');
  setListeners.push('id' + i + '.addEventListener("click", function() {' + 'id' + i + '.innerHTML = changeXO();' + '},);');
}
for ( var listener of setListeners ) { eval( listener ); }


// window.addEventListener( "load", function() {
// });

// var setListeners = [];
// for ( var i = 0; i < 9; i++ ) {
//   setListeners.push('var id' + i + ' = document.getElementById("' + i + '");');
//   setListeners.push('id' + i + '.addEventListener("click", function() {' + 'id' + i + '.innerHTML = changeXO();' + '},);');
// }
// for ( var listener of setListeners ) { eval( listener ); }


// function changeBackgroundColor() {
//   var colors = [ "red", "blue", "yellow", "white", "green", "pink", "aqua", "orange", "purple"];
//   var colorsCnt = 0;
//   document.addEventListener("click", function(){
//     document.body.style.backgroundColor = colors[colorsCnt];
    
//     colorsCnt = (colorsCnt+1) % colors.length;
//   });
// }
// changeBackgroundColor();
// 
// 
// 
// var initBoard = function() {
//   var setListeners = [];
//   for ( var i = 0; i < 9; i++ ) {
//     setListeners.push('id'+i+' = document.getElementById("id'+i+'");');
//     setListeners.push('id'+i+'.addEventListener( "click", changeCell );');
//   }
//   for ( var listener of setListeners ) { eval( listener ); }
// }();
// initBoard();
