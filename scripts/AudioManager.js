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
  This class handles all the sound related functionalities 
	
	@class
*/
TicTacToe.AudioManager	=	function() {

	/** this element hold the BGM
		@private */
	var bgm;

	/** @scope TicTacToe.AudioManager */
	return {
    init        : function() {
                    bgm       = new Audio('audio/bgm.ogg');
                    bgm.volume = 0.3;
                    bgm.play();
                  },

    click       :   function() {
                        var clickEffect;
                        clickEffect = new Audio('audio/clickEffect.ogg');
                        clickEffect.volume = 0.3;
                        clickEffect.play();
                    },

    chime       :   function() {
                        var eff;
                        eff = new Audio('audio/chimeEffect.ogg');
                        eff.play();
                    }
	};

}();
