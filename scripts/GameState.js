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
    GameState
	
	@namespace
*/
ZicZacZoe.GameState	=	function() {
	
	/** @scope ZicZacZoe.GameState */
	return {
		/** init function */
		reset			:	function()
							{
								currentPlayerID		=	0;
								player1Score		=	0;
								player2Score		=	0;
								selectedTileX		=	0;
								selectedTileY		=	0;
								
								for (var i = 0; i < 10; i++)
								{
									ZicZacZoe.GameState.tiles[i]    =   [];
									for (var  j = 0; j < 10; j++)
									{
										ZicZacZoe.GameState.tiles[i][j] =   -1;
									}
								}
							},
							
		tiles           :   [],
		
		currentPlayerID	:	0,
		
		player1Score	:	0,
		player2Score	:	0,
		
		selectedTileX	:	0,
		selectedTileY	:	0,
		
		update			:	function(m, clk)
							{
							
							},
		
		/** end turn */
		endTurn			:	function()
							{
								if( ZicZacZoe.GameState.currentPlayerID == 0 )
									ZicZacZoe.GameState.currentPlayerID	=	1;
								else
									ZicZacZoe.GameState.currentPlayerID	=	0;
							}
	};
}();