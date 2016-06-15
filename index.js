
function getStockSymbols(stocks) {
	return stocks.map(function(stock) {
		return stock.symbol;
	});
};

function getStocksOver(stocks, minPrice) {
	return stocks.filter(function(stock) {
		return stock.price >= minPrice;
	});
};

var symbols = 
	[
		{symbol: "XFX", price: 248.22, volume: 23432},
		{symbol: "TNZ", price: 332.19, volume: 234},
		{symbol: "JNJ", price: 120.22, volume: 5323},
	];
	
var filteredStockSymbols = symbols
							.filter(function(stock) {
								return stock.price >= 150.00;
							}).
							map(function(stock) {
								return stock.symbol;
							});


//filteredStockSymbols.forEach(function(symbol) {
//	console.log(symbol);
//});
//console.log(JSON.stringify(symbols));


var exchanges = [
	[
		{symbol: "XFX", price: 248.22, volume: 23432},
		{symbol: "TNZ", price: 332.19, volume: 234}
	],
	[
		{symbol: "JNJ", price: 120.22, volume: 5323},
		{symbol: "NYN", price: 99.47, volume: 3422}
	]
];

//var stocks = exchanges.concatAll();
//stocks.forEach(function(stock) {
//	console.log(stock);
//});

/*var button = document.getElementById('button');

var handler = function(e) {
	alert('clicked');
	button.removeEventListener('click', handler);
};

button.addEventListener('click', handler);*/

//-----------------------------------------------------

var button = document.getElementById('button');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

var Observable = Rx.Observable;
var clicks = Observable.fromEvent(button, 'click');
var subscription = clicks.forEach(
	function onNext(e) {
		alert('clicked');
		subscription.dispose();
	},
	function onError(e) {
		console.log('ERROR!');
	},
	function onCompleted() {
		console.log('done');
	}
);

//-----------------------------------------------------

var source = Observable.interval(300);//.timeInterval().take(3);
var subscription2 = source.subscribe(
	(event) => console.log('next: ' + event),
	(error) => console.log('error: ' + error),
	() => console.log('done:')
	//function(x) {console.log('next ' + x);},
	//function(err) {console.log('error ' + err);},
	//function() {console.log('done');}
);

setTimeout(function() {
	subscription2.dispose();
}, 2000);

//-----------------------------------------------------

var start$ = Observable.fromEvent(button2, 'click');
var interval$ = Observable.interval(1000);
const startInterval$ = start$.switchMap(interval$);
startInterval$.subscribe((x) => console.log(x));

//-----------------------------------------------------
var stopButtonClicks = Observable.fromEvent(button3, "click");
var microsoftPrices =
			Observable.timer(0, 1000)//symbols
				.filter(function(priceRecord) {
					return priceRecord % 2;
				})
				.takeUntil(stopButtonClicks);

	microsoftPrices.
		forEach(function(priceRecord) {
			console.log(priceRecord);
		});
		
//-----------------------------------------------------
var sprite = document.getElementById('sprite');
var divContainer = document.getElementById('divContainer');

var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(divContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent(divContainer, "mouseup"),
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.
				concatMap(function(contactPoint) {
					// ...retrieve all the mouse move events on the sprite container...
					return spriteContainerMouseMoves.
						// ...until a mouse up event occurs.
						takeUntil(spriteContainerMouseUps);
				});

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {;
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});