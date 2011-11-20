/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Tic Tac Toe Extended (https://github.com/saiy2k/Tic-Tac-Toe-Extended-HTML5-Game)

Tic Tac Toe Extended is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Tic Tac Toe Extended is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Tic Tac Toe Extended.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
    Holds the current state of the game which includes the tile matrix,
	player scores, current player, etc.,
	<br> <br>
	This is a static class and so any other classes/objects can access
	this class by ZicZacZoe.GameState. Some other global constants like number
	of rows and columns are also stored in this class
	
	Grid Data Structure:
	How the tiles are organised
	(0, 0) (0, 1) (0, 2) (0, 3) (0, 4) (0, 5) (0, 6)
	(1, 0) (1, 1) (1, 2) (1, 3) (1, 4) (1, 5) (1, 6)
	(2, 0) (2, 1) (2, 2) (2, 3) (2, 4) (2, 5) (2, 6)
	(3, 0) (3, 1) (3, 2) (3, 3) (3, 4) (3, 5) (3, 6)
	(4, 0) (4, 1) (4, 2) (4, 3) (4, 4) (4, 5) (4, 6)
	
	How the tiles are traversed row by column
	for (i = 0; i < rows; i++)
		for (j = 0; j < cols; j++)
			arr[i][j]
			
	Position of a tile given the tild id (i, j)
	(x, y) = (width * j, height * i)
	
	Tile id given the position (x y)
	(i, j) = (y / height, x / width)
	
	@namespace
*/

ZicZacZoe.GameState	=	function() {
	
	/** @scope ZicZacZoe.GameState */
	return {
	
		/**	2D Array of numbers that indicate the tile type
			@type	int[][] */
		tiles           :   [],
		
		/** reference to tiles that need to be highlighted
			@type	Point[] */
		highlightTiles	:	[],
		
		/**	ID of the current player, either 0 or 1
			@type	int */
		currentPlayerID	:	0,
		
		/** score of player 1
			@type	int */
		player1Score	:	0,
		
		/** score of player 2
			@type	int */
		player2Score	:	0,
		
		/** x coordinate of the currently hovered tile. -1, if none
			@type	int */
		hoverTileX		:	0,
		
		/** y coordinate of the currently hovered tile. -1, if none
			@type	int */
		hoverTileY		:	0,
		
		/** x coordinate of the currently selected(valid click) tile. -1, if none
			@type	int */
		selectedTileX	:	0,
		
		/** y coordinate of the currently selected(valid click) tile. -1, if none
			@type	int */
		selectedTileY	:	0,
		
		/** number of rows
			@type	int */
		rows			:	9,
		
		/** number of columns
			@type	int */
		cols			:	9,
		
		/** number of consecutive tiles to check for score
			@type	int */
		block			:	4,
		
		/**	indicates if the game is over
			@typle	bool */
		isGameOver		:	false,
		
		/** time when the last update was called
			@type	Date */
		lastUpdatedTime	:	new Date(),
		
		/** player 1's time
			@type	double */
		p1ElapsedTime	:	0.0,
		
		/** player 2's time
			@type	double */
		p2ElapsedTime	:	0.0,
		
		/** AI's selected tile's X
			@type	int */
		aiTileX			:	0.0,

		/** AI's selected tile's Y
			@type	int */
		aiTileY			:	0.0,
		
		/** is the last move Valid
			@type	bool */
		isValidMove		:	false,
		
		/** name of player 1
			@type	string */
		p1Name			:	"Player 1",
		
		/** name of player 2
			@type	string */
		p2Name			:	"Player 2",
		
		/** resets the gamestate function */
		reset			:	function() {
								var						s;
								s					=	ZicZacZoe.GameState;
								
								s.currentPlayerID	=	0;
								s.player1Score		=	0;
								s.player2Score		=	0;
								s.selectedTileX		=	0;
								s.selectedTileY		=	0;
								s.lastUpdatedTime	=	new Date();
								s.p1ElapsedTime		=	0.0;
								s.p2ElapsedTime		=	0.0;
								
								for (var i = 0; i < s.rows; i++) {
									s.tiles[i]    =   [];
									ZicZacZoe.GameLogic.scoreTile[i] = [];
									
									for (var  j = 0; j < s.cols; j++) {
										s.tiles[i][j] =   -1;
										ZicZacZoe.GameLogic.scoreTile[i][j] = 0;
									}
								}
								
								$('#shareScoreWidget').hide();
							}
	};
}();