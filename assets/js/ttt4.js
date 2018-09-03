// JavaScript TicTacToe Game
var x = "X", o = "O";
var GO = "NO WINS!!! - GAME OVER!!!";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
var i = 0;
var t = 1;
var game_won = false;
var winText = '"' + game_turns[0] + '"' + ', It\'s your turn. Select a box!';

var win_patterns_for_machine = [];
var id_collect = [];
var temp = [];
var id_cells_available_for_machine_play = [];

// var id0, id1, id2, id3, id4, id5, id6, id7, id8;
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

statusAlert.textContent = winText;

// var isEven = function(number) {
//   return (number % 2) == 0;
// }

var game_status_alert = function() {
  if ( game_won == true ) {
    statusAlert.textContent = winText;
  } else if ( t == 9 ) {
    statusAlert.textContent = GO;
  } else {
    statusAlert.textContent = '"' + game_turns[t] + '"' + ', It\'s your turn. Select a box!';
    return t++;
  }
}

// var game_over = function(cell) {
//   statusAlert.textContent = 'GAME OVER!!!!!';
//   console.log( cell );
// }

var changeWinCellBGColor = function(y) {
  console.log( y[0][1] + ', You WIN!!! ' );
  game_won = true;
  winText = '"' + y[0][1] + '"' + ', You WIN!!!';
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
  for ( let j = 0; j < 8; j++ ) {
    var y = Object.entries(tallyWinPatternsBoard[j]);
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

// var evalTheBoard = function() {
//   for ( let j = 0; j < 8; j++ ) {
//     var y = Object.entries(tallyWinPatternsBoard[j]);
//     evaluate_TWPB_For_Machine_Play(y);
//   }
//   flatten_win_patterns();
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
