// JavaScript TicTacToe Game
var x = "X", o = "O";
// var x = "U+1F383", o = "U+F47B";
var GO = "NO WINS!!! GAME OVER!!!";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
var o_play = [0,1,2,3,4,5,6,7,8];
var p = 0;
// var game_turns = [ o, x, o, x, o, x, o, x, o, GO ];
var i = 0;
var t = 1;
var q = '"';
var player = 'Player ';
var ready = 'Are you ready to play?\r\nYou\'re player ';
var yourTurn = ', it\'s your turn.\r\nSelect a box!';
var game_won = false;
var winText = ready + q + game_turns[0] + q + yourTurn;

var win_patterns_for_machine = [];
var id_collect = [];
var temp = [];
var id_cells_available_for_machine_play = [];

// var id0, id1, id2, id3, id4, id5, id6, id7, id8;
var board = { id0 : "", id1 : "", id2 : "", id3 : "", id4 : "", id5 : "", id6 : "", id7 : "", id8 : "" };

statusAlert.textContent = winText;

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

var reset_game = function() {
  window.location.reload();
}

var game_status_alert = function() {
  if ( game_won == true ) {
    statusAlert.textContent = winText;
    statusAlert.style.backgroundColor = "rgb(40,200,40)";
    statusAlert.style.color = "white";
  } else if ( t == 9 ) {
    statusAlert.textContent = GO;
    statusAlert.style.backgroundColor = "red";
    statusAlert.style.color = "white";
  } else {
    statusAlert.textContent = player + q + game_turns[t] + q + yourTurn;
    return t++;
  }
}

var changeWinCellBGColor = function(y) {
  console.log( y[0][1] + ', You WIN!!! ' );
  game_won = true;
  winText = player + q + y[0][1] + q + ', You WIN!!!';
  for ( let b = 0; b <= 2; b++ ) {
    document.getElementById(y[b][0]).style.backgroundColor = "orange";
    document.getElementById(y[b][0]).style.color = "white";
  }
}

var doCellsMatch = function(cell, y) {
  return y[0][1] == cell && y[1][1] == cell && y[2][1] == cell;
}

var evalWin = function( y ) {
  if ( doCellsMatch(x, y) ) {
    changeWinCellBGColor(y);
  } else if ( doCellsMatch(o, y) ) {
    changeWinCellBGColor(y);
  }
}

var evalTheBoard = function() {
  for ( let i = 0; i < 8; i++ ) {
    var set = [];
    for ( let pattern in tallyWinPatternsBoard[i] ) {
      set.push([pattern, tallyWinPatternsBoard[i][pattern]]);
    }
    var y = set;
    evalWin(y);
    evaluate_TWPB_For_Machine_Play(y);
  }
  flatten_win_patterns();
}

var recordCell = function(targetID, setValue) {
  board[targetID] = setValue;
}

var tallyWins = function(targetID, setValue) {
  for ( let i = 0; i < 8; i++ ) {
    for ( let twpbID in tallyWinPatternsBoard[i] ) {
      if ( twpbID == targetID ){
        tallyWinPatternsBoard[i][twpbID] = setValue;
      }
    }
  }
}

var mark = function(cell, targetID) {
  var setValue = cell;
  tallyWins(targetID, setValue);
  recordCell(targetID, setValue);
  evalTheBoard();
  i++;
}

var mark_for_o = function(cell, o_play) {
  // var id = "id" + o_play[p];
  var id = "id" + 4;
  // if ( board[id] == "" ) {
  // }
    board[id] = "O";
    document.getElementById(id).textContent = board[id];
    // board[id] = cell;
  i++;
}

var play_game = function(game_turns, targetID) {
  var cell = game_turns[i];
  if ( cell == GO ) {
    game_over( cell );
  } else if ( cell == x ) {
    mark(cell, targetID);
    // mark_for_o(cell, o_play);
  } else if ( cell == o ) {
    mark(cell, targetID);
  }
}

var changeCell = function(e) {
  reset();
  if ( e.target.textContent != "" ) {
    alert("Box taken, pick another box.")
  } else {
    var targetID = e.target.id;
    play_game(game_turns, targetID);
    e.target.textContent = board[targetID];
    game_status_alert();
    // beginPlay();
  }
  console.log(i);
  console.log(t);
  console.log(board);
  console.log(tallyWinPatternsBoard);
  // console.log(temp);
  // console.log(id_cells_available_for_machine_play);
  console.log(win_patterns_for_machine);
  console.log(id_collect);
}

var init_tic_tac_toe = function() {
  for ( let i = 0; i <= 8; i++ ) {
    document.getElementById("id"+i).addEventListener( "click", changeCell );
  }
  document.getElementById("statusAlert");
  document.getElementById("reset").addEventListener( "click", reset_game );
}

init_tic_tac_toe();

// code below is for evaluate machine play

var reset = function() {
  win_patterns_for_machine = [];
  id_collect = [];
  // temp = [];
}

// var extract_cells_taken_by_machine = function() {
//   for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
//     if ( win_patterns_for_machine[i][1] == "" ) {
//       id_cells_available_for_machine_play.push(win_patterns_for_machine[i][0]);
//     }
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

// var loop_win_patterns_for_machine = function(win_patterns_for_machine) {
//   for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
//     var y = win_patterns_for_machine[i];
//     evaluate_win_patterns_for_machine(y);
//   }
//   reset_win_patterns_for_machine();
// }

var flatten_win_patterns = function() {
  for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
    for ( let x = 0; x < win_patterns_for_machine[i].length; x++ ) {
      id_collect.push(win_patterns_for_machine[i][x][0]);
    }
  }
}

// var check_win_patterns_for_taken_cells = function(cell, y) {
//   return y[0][1] != cell && y[1][1] != cell && y[2][1] != cell;
// }

// var evaluate_TWPB_For_Machine_Play = function(y) {
//   if ( check_win_patterns_for_taken_cells(x, y) ) {
//     win_patterns_for_machine.push(y);
//   }
// }

var check_win_patterns_for_taken_cells = function(cell, y) {
  return y[0][1] != cell && y[1][1] != cell && y[2][1] != cell;
}

var evaluate_TWPB_For_Machine_Play = function(y) {
  if ( check_win_patterns_for_taken_cells(x, y) ) {
    win_patterns_for_machine.push(y);
  }
}

// var beginPlay = function() {
//   // loop_TWPB_for_machine_play(tallyWinPatternsBoard);
//   loop_win_patterns_for_machine(win_patterns_for_machine);
//   flatten_win_patterns_to_single_array();
//   extract_cells_taken_by_machine();
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function below was the original function but found out that
// Object.entries was not being recognized by older browsers and
// was throwing errors. Especially with older IE browsers.
// 
// var evalTheBoard = function() {
//   for ( let j = 0; j < 8; j++ ) {
//     var y = Object.entries(tallyWinPatternsBoard[j]);
//     evalWin(y);
//     evaluate_TWPB_For_Machine_Play(y);
//   }
//   flatten_win_patterns();
// }

// var tallyWins = function() {
//   for ( i = 0; i < 8; i++ ) {
//     for ( var twpbID in tallyWinPatternsBoard[i] ) {
//       for ( var boardID in board ) {
//         if ( twpbID == boardID ){
//           tallyWinPatternsBoard[i][twpbID] = board[boardID];
//         }
//       }
//     }
//   }
// }

// Code below, misc functions to hang on for a bit. Delete later.

// var isEven = function(number) {
//   return (number % 2) == 0;
// }

// var game_over = function(cell) {
//   statusAlert.textContent = 'GAME OVER!!!!!';
//   console.log( cell );
// }