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
		checkMove		:	function()
							{
								var	selX		=	ZicZacZoe.GameState.selectedTileX;
								var	selY		=	ZicZacZoe.GameState.selectedTileY;
								
								var scored		=	true;
								
								//console.log(selX + ',' + selY);
								/*
								for (var i = selX; i < selX + 5; i++)
								{
									console.log(i + ',' + selY + ': ' + ZicZacZoe.GameState.tiles[selY][i]);
									if( ZicZacZoe.GameState.tiles[selY][i] != ZicZacZoe.GameState.currentPlayerID )
									{
										scored	=	false;
										break;
									}
								}
								console.log('');
								
								if ( scored )
								{
									ZicZacZoe.GameState.player1Score++;
									console.log('score ' + ZicZacZoe.GameState.player1Score);
								}
								*/
							}
	};
}();