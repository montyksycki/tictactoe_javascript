// Tic-Tac-Toe

var TicTacToe = (function(){
  // 'use strict';

  var TicTacToeSetup = function() {
    var id0, id1, id2, id3, id4, id5, id6, id7, id8;
    var x = "X";
    var o = "O";
    // x : "X",
    // o : "O",
    var x_start_patternCnt = 0;
    var x_start_pattern = [ o, x ];
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
  };

TicTacToe.prototype = {

  initBoard : function() {
  id0 = document.getElementById("id0");
  id1 = document.getElementById("id1");
  id2 = document.getElementById("id2");
  id3 = document.getElementById("id3");
  id4 = document.getElementById("id4");
  id5 = document.getElementById("id5");
  id6 = document.getElementById("id6");
  id7 = document.getElementById("id7");
  id8 = document.getElementById("id8");

  id0.addEventListener( "click", TicTacToe.changeCell );
  id1.addEventListener( "click", TicTacToe.changeCell );
  id2.addEventListener( "click", TicTacToe.changeCell );
  id3.addEventListener( "click", TicTacToe.changeCell );
  id4.addEventListener( "click", TicTacToe.changeCell );
  id5.addEventListener( "click", TicTacToe.changeCell );
  id6.addEventListener( "click", TicTacToe.changeCell );
  id7.addEventListener( "click", TicTacToe.changeCell );
  id8.addEventListener( "click", TicTacToe.changeCell );

  id0.style.backgroundColor = "yellow";
  id4.style.backgroundColor = "yellow";
  id8.style.backgroundColor = "yellow";
  },

  selectCell : function() {
    var setValue = x_start_pattern[x_start_patternCnt];
    x_start_patternCnt = (x_start_patternCnt + 1) % x_start_pattern.length;
    return setValue;
  },

  recordCell : function(id, setValue) {
      board[id] = setValue;
  },

  tallyWins : function(id, setValue) {
    for ( let i = 0; i < tallyWinsBoard.length; i++ ) {
      for ( let cellID in tallyWinsBoard[i] ) {
        if ( cellID == id ){
          tallyWinsBoard[i][cellID] = setValue;
        }
      }
    }
  },

  changeCell : function(e) {
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
  },

  evalTheBoard : function(tallyWinsBoard) {
    for ( var i = 0; i < 8; i++ ) {
      var y = Object.entries(tallyWinsBoard[i]);
      evalWin(y);
      // console.log(y);
    }
  },

  evalWin : function( y ) {
    var a  = y[0][1];
    var b  = y[1][1];
    var c  = y[2][1];
    if ( a == "X" && b == "X" && c == 'X' ) {
      console.log("X, YOU WIN!!! " + a + b + c);
    } else if ( a == "O" && b == "O" && c == 'O' ) {
      console.log("O, YOU WIN!!!" + a + b + c);
    } else {
      console.log("No other options." + a + b + c)
    }
  }
}

return TicTacToe;

}());

(function() {
  var tictactoe = new TicTacToe();
  tictactoe.TicTacToeSetup();
})();

// window.addEventListener( "load", function() {
// });

// evalTheBoard(tallyWinsBoard);
// changeBackgroundColor();

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
