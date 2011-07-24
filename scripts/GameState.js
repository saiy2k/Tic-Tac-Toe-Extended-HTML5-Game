/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Zic-Zac-Zoe (https://github.com/saiy2k/zic-zac-zoe/)

SpiroCanvas is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SpiroCanvas is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Zic-Zac-Zoe.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
    Holds the current state of the game which includes the tile matrix,
	player scores, current player, etc.,
	<br> <br>
	This is a static class and so any other classes/objects can access
	this class by ZicZacZoe.GameState. Some other global constants like number
	of rows and columns are also stored in this class
	
	@namespace
*/

ZicZacZoe.GameState	=	function() {
	
	/** @scope ZicZacZoe.GameState */
	return {
	
		/**	2D Array of numbers that indicate the tile type
			@type	int[][] */
		tiles           :   [],
		
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

		/** resets the gamestate function */
		reset			:	function()
							{
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
								
								for (var j = 0; j < 10; j++)
								{
									ZicZacZoe.GameState.tiles[j]    =   [];
									for (var  i = 0; i < 10; i++)
									{
										ZicZacZoe.GameState.tiles[j][i] =   -1;
									}
								}
							}
	};
}();