// Tic-Tac-Toe
var TicTacToeGame = (function(){
'use strict';
var id0, id1, id2, id3, id4, id5, id6, id7, id8;
var board = { id0 : "",
              id1 : "",
              id2 : "",
              id3 : "",
              id4 : "",
              id5 : "",
              id6 : "",
              id7 : "",
              id8 : "" };

var tallyWinsBoard = [
  { id0 : "", id1 : "", id2 : "" },
  { id3 : "", id4 : "", id5 : "" },
  { id6 : "", id7 : "", id8 : "" },
  { id0 : "", id3 : "", id6 : "" },
  { id1 : "", id4 : "", id7 : "" },
  { id2 : "", id5 : "", id8 : "" },
  { id0 : "", id4 : "", id8 : "" },
  { id2 : "", id4 : "", id6 : "" }
];

// var initBoard = function() {
id0 = document.getElementById("id0");
id1 = document.getElementById("id1");
id2 = document.getElementById("id2");
id3 = document.getElementById("id3");
id4 = document.getElementById("id4");
id5 = document.getElementById("id5");
id6 = document.getElementById("id6");
id7 = document.getElementById("id7");
id8 = document.getElementById("id8");

id0.addEventListener( "click", changeCell(e) );
id1.addEventListener( "click", changeCell(e) );
id2.addEventListener( "click", changeCell(e) );
id3.addEventListener( "click", changeCell(e) );
id4.addEventListener( "click", changeCell(e) );
id5.addEventListener( "click", changeCell(e) );
id6.addEventListener( "click", changeCell(e) );
id7.addEventListener( "click", changeCell(e) );
id8.addEventListener( "click", changeCell(e) );

id0.style.backgroundColor = "yellow";
id4.style.backgroundColor = "yellow";
id8.style.backgroundColor = "yellow";
// };

// initBoard();

// var initBoard = function() {
//   var setListeners = [];
//   for ( var i = 0; i < 9; i++ ) {
//     setListeners.push('id'+i+' = document.getElementById("id'+i+'");');
//     setListeners.push('id'+i+'.addEventListener( "click", changeCell );');
//   }
//   for ( var listener of setListeners ) { eval( listener ); }
// }();
// initBoard();

var X = x = "X", O = o = "O";
var x_start_patternCnt = 0;
var x_start_pattern = [ o, x ];

var selectCell = function() {
  var setValue = x_start_pattern[x_start_patternCnt];
  x_start_patternCnt = (x_start_patternCnt + 1) % x_start_pattern.length;
  return setValue;
};

var recordCell = function(id, setValue) {
    board[id] = setValue;
};

var tallyWins = function(id, setValue) {
  for ( let i = 0; i < tallyWinsBoard.length; i++ ) {
    for ( let cellID in tallyWinsBoard[i] ) {
      if ( cellID == id ){
        tallyWinsBoard[i][cellID] = setValue;
      }
    }
  }
};

var changeCell = function(e) {
  if ( e.target.textContent != "" ) {
    alert("Cell taken, pick another cell.")
  } else {
    var id = e.target.id;
    var setValue = selectCell();
    recordCell(id, setValue);
    e.target.textContent = board[id];
    tallyWins(id, setValue);
    evalTheBoard(tallyWinsBoard);
  }
};

var evalTheBoard = function(tallyWinsBoard) {
  for ( var i = 0; i < 8; i++ ) {
    var y = Object.entries(tallyWinsBoard[i]);
    evalWin(y);
    // console.log(y);
  }
};

var evalWin = function( y ) {
  var a  = y[0][1];
  var b  = y[1][1];
  var c  = y[2][1];
    if ( a && b && c == 'X' ) {
    console.log("X, YOU WIN!!!");
  } else if ( a && b && c == 'O' ) {
    console.log("O, YOU WIN!!!");
  } else {
    // cons ole.log("No other options.")
  }
}
evalTheBoard(tallyWinsBoard);

function changeBackgroundColor() {
  var colors = [ "red", "blue", "yellow", "white", "green", "pink", "aqua", "orange", "purple"];
  var colorsCnt = 0;
  document.addEventListener("click", function(){
    document.body.style.backgroundColor = colors[colorsCnt];
    colorsCnt = (colorsCnt+1) % colors.length;
  });
}
// changeBackgroundColor();

}());