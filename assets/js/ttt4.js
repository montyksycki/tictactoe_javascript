// JavaScript TicTacToe Game
var x = "X", o = "O";
// var x = "U+1F383", o = "U+F47B";
var GO = "NO WINS!!! GAME OVER!!!";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
// var game_turns = [ o, x, o, x, o, x, o, x, o, GO ];
// var p = 0;
var i = 0;  // Counter for game_turns array.
var t = 1;  // Counter used for the statusAlert notification.
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
var out = [];
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

var reset_game_button = function() {
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
  // eval_out(out, board);
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

// var diceRoll = function(min, max) {
//   var min = Math.ceil(min);
//   var max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// roll();

// var mark_for_machine = function(cell) {
//   var roll = diceRoll(0,8);
//   var id = "id" + roll;
//   if ( board[id] != "" ) {
//     diceRoll(0,8);
//   } else {
//     board[id] = "O";
//     document.getElementById(id).textContent = board[id];
//   }
//   i++;
// }

var play_game = function(game_turns, targetID) {
  var cell = game_turns[i];
  if ( cell == GO ) {
    game_over( cell );
  } else if ( cell == x ) {
    mark(cell, targetID);
    // mark_for_machine(cell);
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
    console_log();
    // beginPlay();
  }
}

var console_log = function() {
  // console.log(i);
  // console.log(t);
  console.log(board);
  console.log(tallyWinPatternsBoard);
  // console.log(temp);
  // console.log(id_cells_available_for_machine_play);
  console.log(win_patterns_for_machine);
  console.log(id_collect);
  console.log(out);
}

var init_tic_tac_toe = function() {
  for ( let i = 0; i <= 8; i++ ) {
    document.getElementById("id"+i).addEventListener( "click", changeCell );
  }
  document.getElementById("statusAlert");
  document.getElementById("reset").addEventListener( "click", reset_game_button );
}

init_tic_tac_toe();

// code below is for evaluate machine play

var reset = function() {
  win_patterns_for_machine = [];
  id_collect = [];
  out = [];
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

// +++++

var eval_out = function(out, board) {
  id_collect = [];
  for ( let i = 0; i < out.length; i++ ) {
    let id = out[i];
    if ( board[id] != "O" ) {
      id_collect.push(out[i]);
    }
  }
}

var eliminate_duplicates = function(id_collect) {
  let seen = {};
  // let out  = [];
  let j    = 0;
  for ( let i = 0; i < id_collect.length; i++ ) {
    let item = id_collect[i];
    if ( seen[item] !== 1 ) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

var flatten_win_patterns = function() {
  for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
    for ( let x = 0; x < win_patterns_for_machine[i].length; x++ ) {
      if ( win_patterns_for_machine[i][x][1] != "O" ) {
        id_collect.push(win_patterns_for_machine[i][x][0]);
      }
    }
  }
  eliminate_duplicates(id_collect);
}

// var flatten_win_patterns = function() {
//   for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
//     for ( let x = 0; x < win_patterns_for_machine[i].length; x++ ) {
//       id_collect.push(win_patterns_for_machine[i][x][0]);
//     }
//   }
//   eliminate_duplicates(id_collect);
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