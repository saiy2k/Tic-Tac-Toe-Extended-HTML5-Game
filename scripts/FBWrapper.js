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

ZicZacZoe.FBWrapper	=	function() {
	
	/** @scope ZicZacZoe.FBWrapper */
	return {
		shareStatus		:	function() {
								FB.ui({
									method: 'feed',
									name: 'Tic Tac Toe Extended',
									link: 'http://www.gethugames.in/tictactoe/',
									picture: ZicZacZoe.GameState.badgeURL, 
									caption: ZicZacZoe.GameState.gameStatus,
									description: ZicZacZoe.GameState.gameDescription
								},
								function(response) {
								});
							}
	};
}();		
