
//
// Vector2D has separate model which gets
//	updated by accessors and mutators from
//	Vehicle subclass' model
//
//
//
//
//

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

vehicle.values = {	

	getWidth : function( )
	{
		return this._width;
	},
	
	setWidth : function( width )
	{
		this._width = width;
	},
	
	getHeight : function( )
	{
		return this._height;
	},
	
	setHeight : function( height )
	{
		this._height = height;
	},
	
	getX : function( )
	{
		return this._x;
	},
	
	setX : function( x )
	{
		this._x = x;
	},
	
	getY : function( )
	{
		return this._y;
	},
	
	setY : function( y )
	{
		this._y = y;
	}
};

// augment Function.prototype so all can reach it
// to define custom events and binding
Function.prototype.method = function( name, func )
{
	this.prototype[ name ] = func;
	return this;
}

// access prototype.method to define new behavior
Function.method( 'bind', function( object )
{
	// return a function that will call this
	// function as though it is a method of
	// that object
	
	var method = this;
	var slice = Array.prototype.slice;
	var args = slice.apply( arguments, [ 1 ] );
	
	return function( )
	{
		return method.apply( object, args.concat( slice.apply( arguments, [ 0 ] ) ) );		
	};
} );

vehicle.buttons = [];

vehicle.position = {
	x : 200,
	y : 300
};

vehicle.setup = function( )
{
	console.log( "Vehicle.initialize( )" );
	
	// get <canvas> element from the DOM
	this.canvas = document.getElementById( 'vector-field' );
	
	// create and store reference to button
	// then create event handler
	var button = document.getElementById( 'spawn' );
	vehicle.buttons.push( button );

	button.addEventListener( "click", vehicle.onButtonClick( ) );
}

// handle button click event
vehicle.onButtonClick = function( )
{	
	vehicle.onButtonClickHandler( );
	/*this.value = vehicle.string;
	
	return this.vsalue;*/
}
// .bind( { value : vehicle.onButtonClickHandler( ) } );

vehicle.onButtonClickHandler = function( )
{
	console.log( 'new fish added' );
	vehicle.addNewVehicle( vehicle.position.x, vehicle.position.y );
	vehicle.createNewVector( );
}

// add new vehicle and set attributes
vehicle.addNewVehicle = function( x, y )
{
	vehicle.values.setX( x );
	vehicle.values.setY( y );
}

// log vector object params
vehicle.log = function( )
{
	console.log( 'adding new vehicle' );
	
	/*console.log( 'this.object.getX( ) : ', this.object.getX( ) );
	console.log( 'vehicle.values.getX( ) : ', vehicle.values.getX( ) );*/
}
console.log( vehicle.values );

vehicle.createNewVector = function( )
{
	console.log( 'creating a new vector' );
	
	this.object = new Vector2D( );
	
	// vector instance uses getters and setters
	// to update values from the vehicle class
	this.object.setX( vehicle.values.getX( ) );
	this.object.setY( vehicle.values.getY( ) );
	this.object.setHeight( vehicle.values.getHeight( ) );
	this.object.setWidth( vehicle.values.getWidth( ) );
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
		  function( draw )
		  {
			window.setTimeout( draw, 1000 / 60 );
		  };
    } )( );
    
    // create infinite game loop
    ( function loop( )
    {
      requestAnimFrame( loop );
      vehicle.draw( );
    } )( );
    
	for ( var key in this.values ) 
	{
	  if ( this.values.hasOwnProperty( key ) ) 
	  {
		// alert( key + " : " + this.values[ key ] );
		vehicle.log( );
	  }
	}
}
    
vehicle.draw = function( )
{
	// Make sure we don't execute when canvas isn't supported
	if ( this.canvas.getContext )
	{
		// console.log( 'frame loop' );
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
	vehicle.addNewVehicle( 50, 100 );
	vehicle.createNewVector( );
	vehicle.animate( );
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
