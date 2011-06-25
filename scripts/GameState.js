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
	var endTurn						=	function()
	{
		
	};
	

	
	/** @scope ZicZacZoe.GameState */
	return {
		/** init function */
		reset			:	function()
							{
								var						s;
								s					=	ZicZacZoe.GameState;
								
								s.currentPlayerID	=	0;
								s.player1Score		=	0;
								s.player2Score		=	0;
								s.selectedTileX		=	0;
								s.selectedTileY		=	0;
								
								for (var j = 0; j < 10; j++)
								{
									ZicZacZoe.GameState.tiles[j]    =   [];
									for (var  i = 0; i < 10; i++)
									{
										ZicZacZoe.GameState.tiles[j][i] =   -1;
									}
								}
							},
							
		tiles           :   [],
		
		currentPlayerID	:	0,
		
		player1Score	:	0,
		player2Score	:	0,
		
		hoverTileX		:	0,
		hoverTileY		:	0,
		
		selectedTileX	:	0,
		selectedTileY	:	0,
		
		rows			:	10,
		cols			:	10,
		block			:	4,
		
		update			:	function(gBoard, m, clk)
							{
								ZicZacZoe.GameLogic.updateCurrentTile(ZicZacZoe.GameState, gBoard, m, clk);
								
								if ( clk !== null )
								{
									ZicZacZoe.GameLogic.checkMove(ZicZacZoe.GameState);
									ZicZacZoe.GameLogic.endTurn(ZicZacZoe.GameState);
									ZicZacZoe.GameLogic.updateUI(ZicZacZoe.GameState);
								}
							},

		
	};
}();