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
        checkLoginStatus: function(response) {
                            if(response && response.status == 'connected') {
                                TicTacToe.FBWrapper.accessToken = response.authResponse.accessToken;
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
                                FB.api('/me/tictactoeextended:earn', 'post' , {report : TicTacToe.gameDescription, badge : 'http://www.gethugames.in/tictactoe/badge.php?rank=' + (10 - TicTacToe.GameState.rank) }, function(response) {
                                    console.log(response);
                                });
                            } else {
                            }
                          },
		shareStatus		: function() {
                                if (FB.getLoginStatus(function(response) {
                                    if (response.authResponse) {
                                        FB.getLoginStatus(postAction);
                                    } else {
                                        FB.login(function(response) {
                                            if (response.authResponse) {
                                                console.log('success');
                                                FB.getLoginStatus(window.postAction);
                                            } else {
                                            }
                                        }, {scope:'user_about_me,publish_stream,publish_actions'});
                                    }
                                }));
                                /*
								FB.ui({
									method: 'feed',
									name: 'Tic Tac Toe Extended',
									link: 'http://www.gethugames.in/tictactoe/',
									picture: TicTacToe.GameState.badgeURL, 
									caption: TicTacToe.GameState.gameStatus,
									description: TicTacToe.GameState.gameDescription
								},
								function(response) {
								});
                                */
                          }
	};
}();		
