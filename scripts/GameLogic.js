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
    GameLogic
	
	@namespace
*/
ZicZacZoe.GameLogic	=	function() {
	
	/** @scope ZicZacZoe.GameLogic */
	return {							
		/** check move function */
		checkMove		:	function(t)
							{								
								var	p1			=	0;
								var	p2			=	0;
								
								for (var j = 0; j < t.rows; j++)
								{
									for (var i = 0; i < t.cols; i++)
									{
										var			cVal;
										var			cnt;
										cVal	=	t.tiles[j][i];
										
										//check if the current tile is not blank
										if (cVal != -1)
										{
											//count the number of 0s and 1s in the next 'BLOCK' tiles in the current row
											cnt	=	0;
											for (var z = i; z < i + t.block && z < t.cols; z++)
											{
												if (0 == t.tiles[j][z])
													cnt++;
												else if(1 == t.tiles[j][z])
													cnt--;
												else
													break;
											}
											if (cnt == t.block)			//if there were 'BLOCK' consecutive tiles with value 0, this would have been true
												p1++;
											if (cnt == -t.block)		//if there were 'BLOCK' consecutive tiles with value 1, this would have been true
												p2++;
											
											
											//count the number of 0s and 1s in the next 'BLOCK' tiles in the current t.colsumn
											cnt	=	0;
											for (var z = j; z < j + t.block && z < t.rows; z++)
											{
												if (0 == t.tiles[z][i])
													cnt++;
												else if(1 == t.tiles[z][i])
													cnt--;
												else
													break;
											}
											if (cnt == t.block)
												p1++;
											if (cnt == -t.block)
												p2++;
												
											
											//count the number of 0s and 1s in the straight diagonal
											cnt	=	0;
											for (var z = 0; z < t.block; z++)
											{
												if ( z+j >= t.cols || z+i >= t.rows )
													break;
													
												if (0 == t.tiles[z+j][z+i])
													cnt++;
												else if(1 == t.tiles[z+j][z+i])
													cnt--;
												else
													break;
											}
											if (cnt == t.block)
												p1++;
											if (cnt == -t.block)
												p2++;
												
											
											//count the number of 0s and 1s in the reverse diagonal
											cnt	=	0;
											for (var z = 0; z < t.block; z++)
											{
												if ( j+z >= t.cols || i-z < 0 )
													break;
													
												if (0 == t.tiles[j+z][i-z])
													cnt++;
												else if(1 == t.tiles[j+z][i-z])
													cnt--;
												else
													break;
											}
											if (cnt == t.block)
												p1++;
											if (cnt == -t.block)
												p2++;
										}
									}
								}
								
								//update the playerScore
								t.player1Score	=	p1;
								t.player2Score	=	p2;
							},
							
		endTurn			:	function(t)
							{		
								if( t.currentPlayerID	== 0 )
									t.currentPlayerID	=	1;
								else
									t.currentPlayerID	=	0;
							},							
							
		updateUI		:	function(t)
							{								
								$("#player1Score").text(t.player1Score);
								$("#player2Score").text(t.player2Score);
							}
	}
}();