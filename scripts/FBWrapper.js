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

TicTacToe.FBWrapper	=	function() {
	
	/** @scope TicTacToe.FBWrapper */
	return {
        accessToken     : null,
        namespace       : 'tictactoeextended',
        checkLoginStatus: function(response) {
                            console.log('checkLoginStatus');
                            if(response && response.status == 'connected') {
                                TicTacToe.FBWrapper.accessToken = response.authResponse.accessToken;
                                FB.api('/me', function(response) {
                                    console.log(response);
                                    TicTacToe.GameState.p1Name = response.name;
                                    $('#p1NameDiv1').val(response.name);
                                });
                                if (TicTacToe.GameState.makeFBPost == true) {
                                    TicTacToe.FBWrapper.postAction();
                                }
                            } else {
                                TicTacToe.FBWrapper.accessToken = null;
                            }
                          },
        postAction      : function() {
                            console.log('postaction');
                            if (TicTacToe.FBWrapper.accessToken != null) {
                                FB.api('/me/' + TicTacToe.FBWrapper.namespace + ':earn',
                                        'post',
                                        {'report' : TicTacToe.GameState.gameDescription,
                                            badge : 'http://www.gethugames.in/tictactoe/badge.php?rank=' + (10 - TicTacToe.GameState.rank) },
                                        function(response) {
                                            console.log(response);
                                        });
                            }
                          },
		shareStatus		: function() {
                          }
	};
}();		
