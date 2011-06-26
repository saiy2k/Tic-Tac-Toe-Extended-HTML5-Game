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
    This class is responsible for getting the input from user
	
	@class
*/
ZicZacZoe.InputManager	=	function() {

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
	
	/** @scope ZicZacZoe.InputManager */
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
							}
	};
}();