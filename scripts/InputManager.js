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
    This class is responsible for getting the input from user
	
	@class
*/
TicTacToe.InputManager	=	function() {

	/** x coordinate of the mouse in the page, in pixels
		@type	double
		@private */
	var pageX;
	
	/** y coordinate of the mouse in the page, in pixels
		@type	double
		@private */
	var pageY;
    
    /** if the mouse has been clicked or not
		@type	bool
		@private */
    var isClicked       =   false;
	
	/** jquery event handler for mousemove */
	$(document).mousemove(function(ev) {
		pageX			=	ev.pageX;
		pageY			=	ev.pageY;
	});
    
    /** jquery event handler for mousedown */
    $(document).mousedown(function(ev) {
		pageX			=	ev.pageX;
		pageY			=	ev.pageY;
        isClicked       =   true;
	});

    /** getting touches in mobile devices */
    document.addEventListener('touchend', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        pageX = touch.pageX;
        pageY = touch.pageY;
        isClicked = true;
    }, false);

	/** @scope TicTacToe.InputManager */
	return {
		/** return mouse co-ordinates*/
		getMouse		:	function()
							{
								return	{'x': pageX, 'y': pageY};
							},
                            
        /** return click co-ordinates, if any*/
        getClickIfAny	:	function()
							{
                                if(isClicked)
                                {
                                    isClicked   =   false;
								    return	{'x': pageX, 'y': pageX};
                                }
                                else
                                {
                                    return null;
                                }
							},

        init            :   function()
                            {
                                $("#infoButton").click(function() {
                                    if (TicTacToe.GameState.curentScreen == "Game" || TicTacToe.GameState.curentScreen == "Info") {
                                    if($('#infoScreen').css('display') == 'none') {
                                        TicTacToe.GameState.curentScreen	=	"Info";
                                        $('#infoScreen').show();
                                        $('#infoButton').addClass('selectedButton');
                                    } else {
                                        TicTacToe.GameState.curentScreen	=	"Game";
                                        $('#infoScreen').hide();
                                        $('#infoButton').removeClass('selectedButton');
                                    }
                                    }
                                });

                                $("#creditsButton").click(function() {
                                    if (TicTacToe.GameState.curentScreen == "Game" || TicTacToe.GameState.curentScreen == "credits") {
                                    if($('#creditsScreen').css('display') == 'none') {
                                        TicTacToe.GameState.curentScreen	=	"credits";
                                        $('#creditsScreen').show();
                                        $('#creditsButton').addClass('selectedButton');
                                    } else {
                                        TicTacToe.GameState.curentScreen	=	"Game";
                                        $('#creditsScreen').hide();
                                        $('#creditsButton').removeClass('selectedButton');
                                    }
                                    }
                                });

                                $("#musicButton").click(function() {
                                    if($('#musicButton').css('color') == 'rgb(255, 255, 255)') {
                                            $('#musicButton').css('color', '#dbb991');
                                            $('#musicButton').addClass('selectedButton');
                                        } else {
                                            $('#musicButton').css('color', '#fff');
                                            $('#musicButton').removeClass('selectedButton');
                                        }
                                    TicTacToe.AudioManager.toggleMute();
                                });

                                $("#shareFacebookWidget").click(function() {
                                    TicTacToe.FBWrapper.shareStatus();
                                });
                                
                                $("#shareTwitterWidget").click(function() {
                                    TicTacToe.TwitterWrapper.shareStatus();
                                });

                                $("#p1NameDiv1").blur(function() {
                                    TicTacToe.GameState.p1Name = $("#p1NameDiv1").val();
                                });
                                
                                $("#p2NameDiv1").blur(function() {
                                    TicTacToe.GameState.p2Name = $("#p2NameDiv1").val();
                                });

                                $("#p1NameDiv1").click(function(e) {
                                    e.stopPropagation();
                                });

                                $("#p2NameDiv1").click(function(e) {
                                    e.stopPropagation();
                                });

                                if (!navigator.onLine) {
                                    $('#creditsDiv').html("<br/><b>OFFLINE MODE</b><br/><br/>Sharing option not available<br/><br/>");
                                }

                            }
	};
}();
