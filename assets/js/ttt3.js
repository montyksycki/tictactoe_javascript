// JavaScript TicTacToe Game
var X = x = "X", O = o = "O";
var GO = "GAME OVER!!!";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
var i = 0;
var setValue;
var targetID;

var win_patterns_for_machine = [];
var temp = [];
var id_cells_available_for_machine_play  = [];

var id0, id1, id2, id3, id4, id5, id6, id7, id8;
var board = { id0 : "", id1 : "", id2 : "", id3 : "", id4 : "", id5 : "", id6 : "", id7 : "", id8 : "" };

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

var game_over = function(cell) {
  winAlert.textContent = 'GAME OVER!!!!!';
  console.log( cell );
}

var mark = function(cell, targetID) {
  winAlert.textContent = '"' + cell + '"' + ', It\'s your turn. Select a cell!';
  setValue = cell;
  recordCell(targetID, setValue);
  // tally_game(board);
  console.log(setValue);
  console.log(board);
  console.log(tallyWinPatternsBoard);
  i++;
}

var play_game = function(game_turns, targetID) {
  var cell = game_turns[i];
  if ( cell == GO ) {
    game_over( cell );
  } else if ( cell == x ) {
    mark(cell, targetID);
  } else if ( cell == o ) {
    mark(cell, targetID);
  }
}

var changeCell = function(e) {
  if ( e.target.textContent != "" ) {
    alert("Box taken, pick another box.")
  } else {
    targetID = e.target.id;
    play_game(game_turns, targetID);
    e.target.textContent = board[targetID];
  }
}

var recordCell = function(targetID, setValue) {
  board[targetID] = setValue;
}


var tally_game = function(board) {
  // beginPlay();
  tallyWins(board);
  // evalTheBoard(tallyWinPatternsBoard);
  // console.log(board);
}

var tallyWins = function(board) {
  for ( i = 0; i < 8; i++ ) {
    for ( var cellID in tallyWinPatternsBoard[i] ) {
      if ( cellID == board[targetID] ){
        tallyWinPatternsBoard[i][cellID] = setValue;
      }
    }
  }
}

// var tallyWins = function(targetID, setValue) {
//   for ( i = 0; i < 8; i++ ) {
//     for ( var cellID in tallyWinPatternsBoard[i] ) {
//       if ( cellID == targetID ){
//         tallyWinPatternsBoard[i][cellID] = setValue;
//       }
//     }
//   }
// }

var evalTheBoard = function(tallyWinPatternsBoard) {
  for ( var i = 0; i < 8; i++ ) {
    var y = Object.entries(tallyWinPatternsBoard[i]);
    evalWin(y);
  }
}

var doCellsMatch = function(cell, y) {
  return y[0][1] == cell && y[1][1] == cell && y[2][1] == cell;
}

var changeWinCellBGColor = function(y) {
  console.log( y[0][1] + ', You WIN!!! ');
  winAlert.textContent = '"' + y[0][1] + '"' + ', You WIN!!!';
  for ( i = 0; i <= 2; i++ ) {
    document.getElementById(y[i][0]).style.backgroundColor = "orange";
  }
}

var evalWin = function( y ) {
  if ( doCellsMatch(x, y) ) {
    changeWinCellBGColor(y);
  } else if ( doCellsMatch(o, y) ) {
    changeWinCellBGColor(y);
  } else {
    // allCellsTaken();
  }
}

id0 = document.getElementById("id0").addEventListener( "click", changeCell );
id1 = document.getElementById("id1").addEventListener( "click", changeCell );
id2 = document.getElementById("id2").addEventListener( "click", changeCell );
id3 = document.getElementById("id3").addEventListener( "click", changeCell );
id4 = document.getElementById("id4").addEventListener( "click", changeCell );
id5 = document.getElementById("id5").addEventListener( "click", changeCell );
id6 = document.getElementById("id6").addEventListener( "click", changeCell );
id7 = document.getElementById("id7").addEventListener( "click", changeCell );
id8 = document.getElementById("id8").addEventListener( "click", changeCell );
winAlert = document.getElementById("winAlert");





// code below is for evaluate machine play

// var beginPlay = function() {
//   loop_TWPB_for_machine_play(tallyWinPatternsBoard);
//   loop_win_patterns_for_machine(win_patterns_for_machine);
//   flatten_win_patterns_to_single_array();
//   extract_cells_taken_by_machine();
// }

// var loop_TWPB_for_machine_play = function(tallyWinPatternsBoard) {
//   for ( i = 0; i < tallyWinPatternsBoard.length; i++ ) {
//     var y = Object.entries(tallyWinPatternsBoard[i]);
//     evaluate_TWPB_For_Machine_Play(y);
//   }
// }

// var check_win_patterns_for_taken_cells = function(cell, y) {
//   return y[0][1] != cell && y[1][1] != cell && y[2][1] != cell;
// }

// var evaluate_TWPB_For_Machine_Play = function(y) {
//   if ( check_win_patterns_for_taken_cells(x, y) ) {
//     win_patterns_for_machine.push(y);
//   }
// }

// var loop_win_patterns_for_machine = function(win_patterns_for_machine) {
//   for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
//     var y = win_patterns_for_machine[i];
//     evaluate_win_patterns_for_machine(y);
//   }
//   reset_win_patterns_for_machine();
// }

// var check_win_pattern_for_O = function(cell, y) {
//   return y[0][1] == cell || y[1][1] == cell || y[2][1] == cell;
// }

// var evaluate_win_patterns_for_machine = function(y) {
//   if ( check_win_pattern_for_O(o, y) ) {
//     temp.push(y);
//   }
// }

// var reset_win_patterns_for_machine = function() {
//   win_patterns_for_machine = temp;
//   temp = [];
// }

// var flatten_win_patterns_to_single_array = function() {
//   for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
//     for ( x = 0; x < win_patterns_for_machine[i].length; x++ ) {
//       temp.push(win_patterns_for_machine[i][x]); 
//     }
//   }
//   reset_win_patterns_for_machine();
// }

// var extract_cells_taken_by_machine = function() {
//   for ( i = 0; i < win_patterns_for_machine.length; i++ ) {
//     if ( win_patterns_for_machine[i][1] == "" ) {
//       id_cells_available_for_machine_play.push(win_patterns_for_machine[i][0]);
//     }
//   }
//   reset_win_patterns_for_machine();
// }

// beginPlay();
// console.log(temp);
// console.log(win_patterns_for_machine);
// console.log(id_cells_available_for_machine_play);
