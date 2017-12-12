//creating opponent/player's scoreboard first
var rows = 8;
var columns = 8;
var cellSize = 50;
var hits = 0;

var opponentBoardContainer = document.getElementById("opponent-board");

for(var i = 0; i < rows; i++){
	for(var j = 0; j < columns; j++){
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

// 0 = empty, 1 = part of ship, 2 = hit, 3 = missed (I'll randomize 1s later)

var opponentBoard = [
	[1, 1, 1, 1, 0, 0, 0, 0],
	[1, 1, 1, 0, 0, 0, 0, 0],
	[1, 1, 1, 0, 0, 0, 0, 0],
	[1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
]

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

