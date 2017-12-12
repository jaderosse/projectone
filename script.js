//creating opponent/player's scoreboard first
var opRows = 8;
var opColumns = 8;
var cellSize = 50;
var opHits = 0;

var opponentBoardContainer = document.getElementById("opponent-board");

for(var i = 0; i < opRows; i++){
	for(var j = 0; j < opColumns; j++){
		var cell = document.createElement("div");
		opponentBoardContainer.appendChild(cell);
		cell.id = "c" + i + j;


		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		cell.style.top = topPosition + 'px';
		cell.style.left = leftPosition + 'px';	
	}
}

var playerRows = 8;
var playerColumns = 8;
var cellSize = 50;
var playerHits = 0;

var playerBoardContainer = document.getElementById("player-board");

for(var i = 0; i < playerRows; i++){
	for(var j = 0; j < playerColumns; j++){
		var cell = document.createElement("div");
		playerBoardContainer.appendChild(cell);
		// cell.id = "c" + i + j;
		cell.className = "cells";
		


		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * cellSize;
		var leftPosition = i * cellSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		cell.style.top = topPosition + 'px';
		cell.style.left = leftPosition + 'px';	
	}
}

// 0 = empty, 1 = part of ship, 2 = hit, 3 = missed (I'll randomize 1s later)

// var opponentBoard = [
// 	[1, 1, 1, 1, 0, 0, 0, 0],
// 	[1, 1, 1, 0, 0, 0, 0, 0],
// 	[1, 1, 1, 0, 0, 0, 0, 0],
// 	[1, 1, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// ]

var addClick = opponentBoardContainer.addEventListener("click", cellClicked);

function cellClicked(e){
	if(e.target !== e.currentTarget){
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);
		console.log("row " + row + " and col " + col + " clicked");
		//if/else statement for hit or miss
	}
	e.stopPropagation();
};



//DRAGGABILITY - need to figure out how to detect if cell is occupied
//be able to turn vertical on click

$(function(){
  $('.draggable').draggable({
    containment: 'parent',
    cursor: 'move',
    revert: true
  });
});

$(function() {
  $('.cells').droppable({
    drop: handleDrop
  });
});

function handleDrop( event, ui ) {
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
  ui.draggable.draggable( 'option', 'revert', false );
}
