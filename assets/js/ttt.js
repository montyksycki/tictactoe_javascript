// Tic-Tac-Toe

var TicTacToeGame = (function(){

  var tttInit = function() {
      this.x            = "x";
      this.o            = "o";
      this.board        = new Array(9).fill("");
      this.win          = [["x","x","x"],
                           ["o","o","o"]];
      this.wins         = [[0,1,2],
                           [3,4,5],
                           [6,7,8],
                           [0.3,6],
                           [1,4,7],
                           [2,5,8],
                           [0,4,8],
                           [2,4,6]];
  }

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

}());


// function select(i) {
//   if ( board[i] == "" ) {
//     board[i] = b;
//   } else {
//     console.log("Pick another square.");
//   }
// }

// function select_xo(xo) {
//   if ( xo == x ) {
//     var player = x_start_pattern = [ x, o, x, o, x, o, x, o, x ];
//   } else {
//     var player = o_start_pattern = [ o, x, o, x, o, x, o, x, o ];
//   }
//   console.log(player)
// }

// function displayMark(objId) {
//   objId.innerHTML = "<h1>X</h1>";
// }