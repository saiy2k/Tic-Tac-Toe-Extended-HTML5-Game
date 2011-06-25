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

var ROW				=	10;
var COL				=	10;
var	BLOCK			=	4;

ZicZacZoe.GameState	=	function() {

	var updateCurrentTile			=	function(gBoard, m, clk)
	{
		var t			=	ZicZacZoe.GameState;
		var mx          =   (m.x - gBoard.x());
		var my          =   (m.y - gBoard.y());
		t.hoverTileX	=	-1;
		t.hoverTileY	=	-1;

		if(mx > 0 && my > 0 && mx < gBoard.width() && my < gBoard.height())
		{
			t.hoverTileX			=   Math.floor(mx / gBoard.tileWidth());
			t.hoverTileY			=   Math.floor(my / gBoard.tileHeight());
			
			if ( t.tiles[t.hoverTileY][t.hoverTileX] !== -1)
			{
				t.hoverTileX		=	-1;
				t.hoverTileY		=	-1;
			}
		}

		if(clk !== null)
		{									
			if( t.hoverTileX != -1 )
			{
				t.selectedTileX	=	t.hoverTileX;
				t.selectedTileY	=	t.hoverTileY;
				t.tiles[t.selectedTileY][t.selectedTileX] =   t.currentPlayerID;
			}
			
			for (var j = 0; j < ROW; j++)
			{
				var str = '';
				for (var  i = 0; i < COL; i++)
				{
					var til	=	ZicZacZoe.GameState.tiles[j][i];
					str = str + ', ' + til;
				}
				console.log(str);
			}
		}
	};
	
	var checkMove					=	function()
	{
		var t			=	ZicZacZoe.GameState;
		var	p			=	t.currentPlayerID;
		
		
		var	p1			=	0;
		var	p2			=	0;
		
		
		for (var j = 0; j < ROW; j++)
		{
			for (var i = 0; i < COL; i++)
			{
				var			cVal;
				var			cnt;
				cVal	=	t.tiles[j][i];
				
				//check if the current tile is not blank
				if (cVal != -1)
				{
					//count the number of 0s and 1s in the next 'BLOCK' tiles in the current row
					cnt	=	0;
					for (var z = i; z < i + BLOCK && z < COL; z++)
					{
						if (0 == t.tiles[j][z])
							cnt++;
						else if(1 == t.tiles[j][z])
							cnt--;
						else
							break;
					}
					if (cnt == BLOCK)		//if there were 'BLOCK' consecutive tiles with value 0, this would have been true
						p1++;
					if (cnt == -BLOCK)		//if there were 'BLOCK' consecutive tiles with value 1, this would have been true
						p2++;
					
					
					//count the number of 0s and 1s in the next 'BLOCK' tiles in the current column
					cnt	=	0;
					for (var z = j; z < j + BLOCK && z < ROW; z++)
					{
						if (0 == t.tiles[z][i])
							cnt++;
						else if(1 == t.tiles[z][i])
							cnt--;
						else
							break;
					}
					if (cnt == BLOCK)
						p1++;
					if (cnt == -BLOCK)
						p2++;
						
					
					//count the number of 0s and 1s in the straight diagonal
					cnt	=	0;
					for (var z = 0; z < BLOCK; z++)
					{
						if ( z+j >= COL || z+i >= ROW )
							break;
							
						if (0 == t.tiles[z+j][z+i])
							cnt++;
						else if(1 == t.tiles[z+j][z+i])
							cnt--;
						else
							break;
					}
					if (cnt == BLOCK)
						p1++;
					if (cnt == -BLOCK)
						p2++;
						
					
					//count the number of 0s and 1s in the reverse diagonal
					cnt	=	0;
					for (var z = 0; z < BLOCK; z++)
					{
						if ( j+z >= COL || i-z < 0 )
							break;
							
						if (0 == t.tiles[j+z][i-z])
							cnt++;
						else if(1 == t.tiles[j+z][i-z])
							cnt--;
						else
							break;
					}
					if (cnt == BLOCK)
						p1++;
					if (cnt == -BLOCK)
						p2++;
				}
			}
		}
		
		
		t.player1Score	=	p1;
		t.player2Score	=	p2;
	};
	
	var endTurn						=	function()
	{
		var t			=	ZicZacZoe.GameState;
		
		if( t.currentPlayerID	== 0 )
			t.currentPlayerID	=	1;
		else
			t.currentPlayerID	=	0;
	};
	
	var updateUI					=	function()
	{
		var t			=	ZicZacZoe.GameState;
		
		$("#player1Score").text(t.player1Score);
		$("#player2Score").text(t.player2Score);
	};
	
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
		
		update			:	function(gBoard, m, clk)
							{
								updateCurrentTile(gBoard, m, clk);
								
								if ( clk !== null )
								{
									checkMove();
									endTurn();
									updateUI();
								}
							},

		
	};
}();