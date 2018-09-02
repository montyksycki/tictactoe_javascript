// JavaScript TicTacToe Game
var x = "X", o = "O";
var GO = "NO WINS!!! - GAME OVER!!!";
var game_turns = [ x, o, x, o, x, o, x, o, x, GO ];
var i = 0;
var t = 1;
var game_won = false;
var winText;

var win_patterns_for_machine = [];
var temp = [];
var id_cells_available_for_machine_play = [];

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

winAlert.textContent = '"' + game_turns[0] + '"' + ', It\'s your turn. Select a box!';

// var isEven = function(number) {
//   return (number % 2) == 0;
// }

// var count = function() {
//   console.log(t);
//   t++;
//   console.log(t);
// }

var game_status_alert = function() {
  if ( game_won == true ) {
    winAlert.textContent = winText;
  } else if ( t == 9 ) {
    winAlert.textContent = GO;
  } else {
    winAlert.textContent = '"' + game_turns[t] + '"' + ', It\'s your turn. Select a box!';
    return t++;
  }
  console.log(t);
}

// game_status_alert(t);

// var game_over = function(cell) {
//   winAlert.textContent = 'GAME OVER!!!!!';
//   console.log( cell );
// }

var changeWinCellBGColor = function(y) {
  console.log( y[0][1] + ', You WIN!!! ' );
  game_won = true;
  winText = '"' + y[0][1] + '"' + ', You WIN!!!';
  for ( let b = 0; b <= 2; b++ ) {
    document.getElementById(y[b][0]).style.backgroundColor = "orange";
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
  }
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

var tally_game = function() {
  // beginPlay();
  tallyWins(targetID, setValue);
  evalTheBoard();
  // console.log(board);
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
  if ( e.target.textContent != "" ) {
    alert("Box taken, pick another box.")
  } else {
    var targetID = e.target.id;
    play_game(game_turns, targetID);
    e.target.textContent = board[targetID];
    game_status_alert();
  }
  // console.log(setValue);
  console.log(board);
  console.log(tallyWinPatternsBoard);
  console.log(t);
}

// var init_tic_tac_toe = function() {
//   for ( let i = 0; i <= 8; i++ ) {
//     id+i = document.getElementById("id[i]").addEventListener( "click", changeCell );
//   }
// }

// init_tic_tac_toe();

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

var beginPlay = function() {
  loop_TWPB_for_machine_play(tallyWinPatternsBoard);
  loop_win_patterns_for_machine(win_patterns_for_machine);
  flatten_win_patterns_to_single_array();
  extract_cells_taken_by_machine();
}

var loop_TWPB_for_machine_play = function(tallyWinPatternsBoard) {
  for ( let i = 0; i < tallyWinPatternsBoard.length; i++ ) {
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
  for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
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
  for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
    for ( let x = 0; x < win_patterns_for_machine[i].length; x++ ) {
      temp.push(win_patterns_for_machine[i][x]); 
    }
  }
  reset_win_patterns_for_machine();
}

var extract_cells_taken_by_machine = function() {
  for ( let i = 0; i < win_patterns_for_machine.length; i++ ) {
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
