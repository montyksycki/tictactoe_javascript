
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
var x_start_pattern = [ x, o ];
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

var initBoard = function() {
  id0 = document.getElementById("id0");
  id1 = document.getElementById("id1");
  id2 = document.getElementById("id2");
  id3 = document.getElementById("id3");
  id4 = document.getElementById("id4");
  id5 = document.getElementById("id5");
  id6 = document.getElementById("id6");
  id7 = document.getElementById("id7");
  id8 = document.getElementById("id8");
  winAlert = document.getElementById("winAlert");
}
initBoard();

var changeCell = function(e) {
  if ( e.target.textContent != "" ) {
    alert("Box taken, pick another box.")
  } else {
    var id = e.target.id;
    var setValue = selectCell();
    recordCell(id, setValue);
    e.target.textContent = board[id];
    tallyWins(id, setValue);
    evalTheBoard(tallyWinsBoard);
  }
}

var selectCell = function() {
  var setValue = x_start_pattern[x_start_patternCnt];
  x_start_patternCnt = (x_start_patternCnt + 1) % x_start_pattern.length;
  return setValue;  
}

var recordCell = function(id, setValue) {
    board[id] = setValue;
}

var tallyWins = function(id, setValue) {
  for ( i = 0; i < 8; i++ ) {
    for ( var cellID in tallyWinsBoard[i] ) {
      if ( cellID == id ){
        tallyWinsBoard[i][cellID] = setValue;
      }
    }
  }
}

var evalTheBoard = function(tallyWinsBoard) {
  for ( var i = 0; i < 8; i++ ) {
    var y = Object.entries(tallyWinsBoard[i]);
    evalWin(y);
  }
}

var changeWinCellBGColor = function(y) {
  console.log( y[0][1] + " YOU WIN!!! ");
  winAlert.textContent = y[0][1] + " You WIN!!!";
  for ( i = 0; i <= 2; i++ ) {
    document.getElementById(y[i][0]).style.backgroundColor = "orange";
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
  } else {
      // winAlert.textContent = "No Available Wins";
    // console.log("No other options. " + a + b + c)
  }
}

  id0.addEventListener( "click", changeCell );
  id1.addEventListener( "click", changeCell );
  id2.addEventListener( "click", changeCell );
  id3.addEventListener( "click", changeCell );
  id4.addEventListener( "click", changeCell );
  id5.addEventListener( "click", changeCell );
  id6.addEventListener( "click", changeCell );
  id7.addEventListener( "click", changeCell );
  id8.addEventListener( "click", changeCell );

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

