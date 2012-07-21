var Vector2D = function( )
{
	this._x = undefined;
	this._y = undefined;
	this._width = undefined;
	this._height = undefined;

	this.getX = function( )
	{
		return this._x;
	};

	this.setX = function( x )
	{
		this._x = x;
	};

	this.getY = function( )
	{
		return this._y;
	};

	this.setY = function( y )
	{
		this._y = y;
	};
	
	this.setWidth = function( width )
	{
		this._width = width;
	};
	
	this.getWidth = function( )
	{
		return this._width;
	};
	
	this.setHeight = function( height )
	{
		this._height = height;
	};
	
	this.getHeight = function( )
	{
		return this._height;
	};

};



var vehicle = Object.create( Vector2D );

vehicle.setup = function( )
{
	console.log( "Vehicle.initialize( )" );
	
	// get <canvas> element from the DOM
	this.canvas = document.getElementById( 'vector-field' );
}

vehicle.values = {
	width : 100,
	height : 100,
	x : 100,
	y : 100
};

console.log( vehicle.values );

vehicle.createNewVector = function( )
{
	console.log( 'creating a new vector' );
	
	this.object = new Vector2D( );
	this.object.setX( vehicle.values.width );
	this.object.setY( vehicle.values.y );
	this.object.setHeight( vehicle.values.height );
	this.object.setWidth( vehicle.values.width );
}

vehicle.animate = function( )
{
	    // shim layer with setTimeout fallback
	window.requestAnimFrame = ( function( )
	{
  		return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( vehicle.draw )
		  {
			window.setTimeout( vehicle.draw, 1000 / 60 );
		  };
    } )( );
}

vehicle.draw = function( )
{
	// Make sure we don't execute when canvas isn't supported
	if ( this.canvas.getContext )
	{
		// use getContext to use the canvas for drawing
		var ctx = this.canvas.getContext( '2d' );
		// Draw shapes

		var x = parseInt( vehicle.object.getX( ), 10 );
		var y =  parseInt( vehicle.object.getY( ), 10 );
		var width =  parseInt( vehicle.object.getWidth( ), 10 );
		var height =  parseInt( vehicle.object.getHeight( ), 10 );
		
		ctx.width = ctx.width; // Clear the context
		
		// A quadratic curve fish that wll be used for the pattern.
		var offsetX = 100;
		var offsetY = 100;
		
		ctx.save( );
		ctx.lineWidth = 1;
		ctx.fillStyle = "#80FF00";
		ctx.beginPath( );
		ctx.moveTo( x, y );
		ctx.quadraticCurveTo( x + 10, y - 16, x + 18, y - 2 );
		ctx.quadraticCurveTo( x + 20, y - 2, x + 23, y - 8 );
		ctx.quadraticCurveTo( x + 23, y, x + 23, y + 8 );
		ctx.quadraticCurveTo( x + 20, y + 2, x + 18, y + 2 );
		ctx.quadraticCurveTo( x + 10, y + 16, x, y );
		ctx.closePath( );
		ctx.fill( );
		ctx.stroke( );
		ctx.restore( );
	} 
	else 
	{
		alert( 'You need Safari or Firefox 1.5+ to see this demo.' );
	}
}

vehicle.initialize = function( )
{
	vehicle.setup( );
	vehicle.createNewVector( );
	// vehicle.animate( );
}


// kick off the event chain
if ( document.addEventListener )
{  
  document.addEventListener( "onload", vehicle.initialize( ) );
} 
else if ( document.attachEvent )
{  
  document.attachEvent( "onload", vehicle.initialize( ) );  
}