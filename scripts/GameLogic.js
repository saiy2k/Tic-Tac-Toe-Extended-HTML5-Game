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
    GameLogic
	
	@namespace
*/
ZicZacZoe.GameLogic	=	function() {
	
	/** @scope ZicZacZoe.GameLogic */
	return {

		/** 2D array of scoring tiles		
		*/
		scoreTile		:	[],
		
		
		/** Analyzes the current tile array and calculates the score
			@param	{GameState}		t	reference to the ZicZacZoe.GameState */
		updateScore		:	function(t)
							{								
								var	p1			=	0;
								var	p2			=	0;
								var tileArray;
								var isHightlight;
								var highlightCount		=	t.highlightTiles.length; 
								
								for (var i = 0; i < t.rows; i++)
								{
									for (var j = 0; j < t.cols; j++)
									{
										var			cVal;
										var			cnt;
										cVal	=	t.tiles[i][j];
										
										//check if the current tile is not blank
										if (cVal != -1)
										{
											//count the number of 0s and 1s in the next 'BLOCK' tiles in the current row
											cnt	=	0;
											tileArray = [];
											isHightlight = false;
											for (var z = j; z < j + t.block && z < t.cols; z++)
											{
												if(t.selectedTileX == i && t.selectedTileY == z)
													isHightlight = true;
													
												var pt = {x:i, y:z};
												tileArray.push(pt);
												
												if (0 == t.tiles[i][z])
													cnt++;
												else if(1 == t.tiles[i][z])
													cnt--;
												else
													break;
											}
											if (cnt == t.block)			//if there were 'BLOCK' consecutive tiles with value 0, this would have been true
											{
												p1++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
											if (cnt == -t.block)		//if there were 'BLOCK' consecutive tiles with value 1, this would have been true
											{
												p2++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}											
											
											//count the number of 0s and 1s in the next 'BLOCK' tiles in the current t.colsumn
											cnt	=	0;
											tileArray = [];
											isHightlight = false;
											for (var z = i; z < i + t.block && z < t.rows; z++)
											{
												if(t.selectedTileX == z && t.selectedTileY == j)
													isHightlight = true;
													
												var pt = {x:z, y:j};
												tileArray.push(pt);
												
												if (0 == t.tiles[z][j])
													cnt++;
												else if(1 == t.tiles[z][j])
													cnt--;
												else
													break;
											}
											if (cnt == t.block) {
												p1++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
											if (cnt == -t.block) {
												p2++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
											
											//count the number of 0s and 1s in the straight diagonal
											cnt	=	0;
											tileArray = [];
											isHightlight = false;
											for (var z = 0; z < t.block; z++)
											{
												if(t.selectedTileX == z+i && t.selectedTileY == z+j)
													isHightlight = true;
													
												var pt = {x:z+i, y:z+j};
												tileArray.push(pt);
												
												if ( z+j >= t.cols || z+i >= t.rows )
													break;
													
												if (0 == t.tiles[z+i][z+j])
													cnt++;
												else if(1 == t.tiles[z+i][z+j])
													cnt--;
												else
													break;
											}
											if (cnt == t.block) {
												p1++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
											if (cnt == -t.block) {
												p2++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
												
											
											//count the number of 0s and 1s in the reverse diagonal
											cnt	=	0;
											tileArray = [];
											isHightlight = false;
											for (var z = 0; z < t.block; z++)
											{
												if(t.selectedTileX == i-z && t.selectedTileY == z+j)
													isHightlight = true;
													
												var pt = {x:i-z, y:z+j};
												tileArray.push(pt);
												
												if ( j+z >= t.cols || i-z < 0 )
													break;
													
												if (0 == t.tiles[i-z][j+z])
													cnt++;
												else if(1 == t.tiles[i-z][j+z])
													cnt--;
												else
													break;
											}
											if (cnt == t.block) {
												p1++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
											if (cnt == -t.block) {
												p2++;
												
												if(isHightlight) {													
													for (var k = 0; k < t.block; k++)
														t.highlightTiles[highlightCount++] = tileArray[k];
												}
											}
										}
									}
								}
								
								//update the playerScore
								t.player1Score	=	p1;
								t.player2Score	=	p2;
							},
		
		/** Ends the current turn, by alternating the player ID
			@param	{GameState}		t	reference to the ZicZacZoe.GameState */
		endTurn			:	function(t)
							{
								var						isGameOver;
								var						count = 0;
								
								if( t.currentPlayerID	== 0 )
									t.currentPlayerID	=	1;
								else
									t.currentPlayerID	=	0;
								
								isGameOver				=	true;
								for (var i = 0; i < t.rows; i++)
								{
									for (var j = 0; j < t.cols; j++)
									{
									
										if (t.tiles[i][j] == -1)
										{
											isGameOver	=	false;
										}
										/*
										if (t.tiles[i][j] == 1 || t.tiles[i][j] == 0)
										{
											count++;
											
											
											if (count > 10) {
												t.isGameOver = true;
												console.log("game is over");
												return;
											}
										}
										*/
									}
								}
								
								t.isGameOver			=	isGameOver;
							},

		/** Calculates and updates the elapsed time for both the players
			@param	{GameState}		t	reference to the ZicZacZoe.GameState */
		calcTime		:	function(t)
							{
								var							currentTime;
								var							elapsedTime;
								var 						timeString;
								var							p1Sec;
								var							p1Min;
								var							p2Sec;
								var							p2Min;
								
								currentTime				=	new Date();
								elapsedTime				=	currentTime - t.lastUpdatedTime;
								t.lastUpdatedTime		=	currentTime;
								
								if( t.currentPlayerID	== 0 )
									t.p1ElapsedTime		+=	elapsedTime;
								else
									t.p2ElapsedTime		+=	elapsedTime;
								
								p1Sec					=	t.p1ElapsedTime / 1000.0;
								p1Min					=	Math.floor(p1Sec / 60);
								p1Sec					=	Math.floor(p1Sec % 60);
								
								p2Sec					=	t.p2ElapsedTime / 1000.0;
								p2Min					=	Math.floor(p2Sec / 60);
								p2Sec					=	Math.floor(p2Sec % 60);
								
								timeString				=	p1Min + ":" + p1Sec + "  /  " + p2Min + ":" + p2Sec;
							
								$("#timeTaken").text(timeString);
							},
		
		/** Updates the Score Div's with the score
			@param	{GameState}		t	reference to the ZicZacZoe.GameState */
		updateUI		:	function(t) {
								$("#player1Score").text(t.player1Score);
								$("#player2Score").text(t.player2Score);
							},
							
		/** analyzes the board and find the best move for ai
			@param	{GameState}		t	reference to the ZicZacZoe.GameState */
		aiMove			:	function(t) {			
								var l = ZicZacZoe.GameLogic;

								for (var i = 0; i < t.rows; i++) {
									l.scoreTile[i]    =   [];
									for (var  j = 0; j < t.cols; j++) {
										l.scoreTile[i][j] =   0;
									}
								}
								
								console.log("left to right");
								// checking consecutive tiles in current row from left to right
								for (var i = 0; i < t.rows; i++) {
									var weight = 0;
									var oldID = -1;
									for (var  j = 0; j < t.cols; j++) {
										if(t.tiles[i][j] == -1) {
											//if (l.scoreTile[i][j] < weight)
												l.scoreTile[i][j] += weight;
											weight = 0;
										} else if(t.tiles[i][j] == oldID) {
											weight++;
										} else if(t.tiles[i][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][j];
									}
								}
								
								console.log("right to left");
								// checking consecutive tiles in current row from right to left
								for (var i = 0; i < t.rows; i++) {
									var weight = 0;
									var oldID = -1;
									for (var  j = t.cols - 1; j >= 0; j--) {
										if(t.tiles[i][j] == -1) {
											//if (l.scoreTile[i][j] < weight)
												l.scoreTile[i][j] += weight;
											weight = 0;
										} else if(t.tiles[i][j] == oldID) {
											weight++;
										} else if(t.tiles[i][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][j];
									}
								}
								
								console.log("top to bottom");
								// checking consecutive tiles in current col from top to bottom
								for (var  j = 0; j < t.cols; j++) {
									var weight = 0;
									var oldID = -1;
									for (var i = 0; i < t.rows; i++) {
										if(t.tiles[i][j] == -1) {
											//if (l.scoreTile[i][j] < weight)
												l.scoreTile[i][j] += weight;
											weight = 0;
										} else if(t.tiles[i][j] == oldID) {
											weight++;
										} else if(t.tiles[i][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][j];
									}
								}
								
								// checking consecutive tiles in current col from bottom to top
								for (var  j = 0; j < t.cols; j++) {
									var weight = 0;
									var oldID = -1;
									for (var i = t.rows - 1; i >= 0; i--) {
										if(t.tiles[i][j] == -1) {
											//if (l.scoreTile[i][j] < weight)
												l.scoreTile[i][j] += weight;
											weight = 0;
										} else if(t.tiles[i][j] == oldID) {
											weight++;
										} else if(t.tiles[i][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][j];
									}
								}
								
								
								// checking consecutive tiles in diagonal from top left to bottom right
								var weight = 0;
								for (var i = 0; i < t.rows; i++)
								{
									var k = i;
									weight = 0;
									var oldID = -1;
									for (var  j = 0; j < t.cols && k < t.rows; j++)
									{
										if(t.tiles[k][j] == -1) {
											//if (l.scoreTile[k][j] < weight)
												l.scoreTile[k][j] += weight;
											weight = 0;
										}
										else if(t.tiles[k][j] == oldID) {
											weight++;
										}
										else if(t.tiles[k][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[k][j];
										k++;
									}
								}
								
								var weight = 0;
								for (var j = 1; j < t.cols; j++)
								{
									var k = j;
									weight = 0;
									var oldID = -1;
									for (var  i = 0; i < t.rows && k < t.cols; i++)
									{
										if(t.tiles[i][k] == -1) {
											//if (l.scoreTile[i][k] < weight)
												l.scoreTile[i][k] += weight;
											weight = 0;
										}
										else if(t.tiles[i][k] == oldID) {
											weight++;
										}
										else if(t.tiles[i][k] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][k];
										k++;
									}
								}
								
								
								// checking consecutive tiles in diagonal from bottom right to top left
								var weight = 0;
								for (var i = t.rows - 1; i >= 0; i--)
								{
									var k = i;
									weight = 0;
									var oldID = -1;
									for (var  j = t.cols - 1; j >= 0 && k >= 0; j--)
									{
										if(t.tiles[k][j] == -1) {
											//if (l.scoreTile[k][j] < weight)
											{
												l.scoreTile[k][j] += weight;
											}
											weight = 0;
										}
										else if(t.tiles[k][j] == oldID) {
											weight++;
										}
										else if(t.tiles[k][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[k][j];
										k--;
									}
								}
								
								var weight = 0;
								for (var j = t.cols - 2; j >= 0; j--)
								{
									var k = j;
									weight = 0;
									var oldID = -1;
									for (var  i = t.rows - 1; i >= 0 && k >= 0; i--)
									{
										if(t.tiles[i][k] == -1) {
											//if (l.scoreTile[i][k] < weight)
											{
												l.scoreTile[i][k] += weight;
											}
											weight = 0;
										}
										else if(t.tiles[i][k] == oldID) {
											weight++;
										}
										else if(t.tiles[i][k] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][k];
										k--;
									}
								}

								
								// checking consecutive tiles in diagonal from top right to bottom left
								var weight = 0;
								for (var i = 0; i < t.rows; i++)
								{
									var k = i;
									weight = 0;
									var oldID = -1;
									for (var  j = t.cols - 1; j >= 0 && k < t.rows; j--)
									{
										if(t.tiles[k][j] == -1) {
											//if (l.scoreTile[k][j] < weight)
												l.scoreTile[k][j] += weight;
											weight = 0;
										}
										else if(t.tiles[k][j] == oldID) {
											weight++;
										}
										else if(t.tiles[k][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[k][j];
										k++;
									}
								}
								
								var weight = 0;
								for (var j = 0; j < t.cols - 1; j++)
								{
									var k = j;
									weight = 0;
									var oldID = -1;
									for (var  i = 0; i < t.rows && k > 0; i++)
									{
										if(t.tiles[i][k] == -1) {
											//if (l.scoreTile[i][k] < weight)
												l.scoreTile[i][k] += weight;
											weight = 0;
										}
										else if(t.tiles[i][k] == oldID) {
											weight++;
										}
										else if(t.tiles[i][k] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][k];
										k--;
									}
								}

								
								// checking consecutive tiles in diagonal from bottom left to top right
								var weight = 0;
								for (var i = t.rows - 1; i >= 0; i--)
								{
									var k = i;
									weight = 0;
									var oldID = -1;
									for (var  j = 0; j < t.cols && k >= 0; j++)
									{
										if(t.tiles[k][j] == -1) {
											//if (l.scoreTile[k][j] < weight)
											{
												l.scoreTile[k][j] += weight;
											}
											weight = 0;
										}
										else if(t.tiles[k][j] == oldID) {
											weight++;
										}
										else if(t.tiles[k][j] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[k][j];
										k--;
									}
								}
								
								var weight = 0;
								for (var j = 0; j < t.cols - 1; j++)
								{
									var k = j;
									weight = 0;
									var oldID = -1;
									for (var  i = t.rows - 1; i >= 0 && k >= 0; i--)
									{
										if(t.tiles[i][k] == -1) {
											//if (l.scoreTile[i][k] < weight)
											{
												l.scoreTile[i][k] += weight;
											}
											weight = 0;
										}
										else if(t.tiles[i][k] == oldID) {
											weight++;
										}
										else if(t.tiles[i][k] != oldID) {
											weight = 1;
										}
										oldID = t.tiles[i][k];
										k++;
									}
								}
								
								var maxScore = 0;
								var bestTileI = 0;
								var bestTileJ = 0;
								
								console.log('score tile');
								for (var i = 0; i < t.rows; i++)
								{
									var str = '';
									for (var  j = 0; j < t.cols; j++)
									{
										str = str + ', ' + l.scoreTile[i][j];
										if (l.scoreTile[i][j] > maxScore)
										{
											maxScore = l.scoreTile[i][j];
											bestTileI = i;
											bestTileJ = j;
										}
									}
									console.log(str);
								}
								
								t.aiTileX = bestTileI;
								t.aiTileY = bestTileJ;
								t.selectedTileX = t.aiTileX;
								t.selectedTileY = t.aiTileY;

								t.tiles[t.aiTileX][t.aiTileY] =   t.currentPlayerID;
							}
	}
}();
