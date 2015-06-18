//////////////////////////////////////
var key = '';
var secret = ''; 
//////////////////////////////////////

var BTCChina = require('btcchina');
var publicbtcchina = new BTCChina();
var btcchina = new BTCChina(key, secret);


// publicbtcchina.ticker(function (err, obj) {

	// console.log(err);
	// console.log(obj);
// });

var date1 = new Date(); 
var counter = 0;
for (var i=0; i < 5; i++) {

	publicbtcchina.ticker(function (err2, obj2) {
	
		console.log("last price " + obj2.ticker.last);
		
		console.log(err2);
		console.log(obj2);
		
		counter++;
		if (counter >= 5) {
		
			var date2 = new Date();
			console.log(date2-date1);
		}
	});
}




// btcchina.getAccountInfo(function (obj, res) {
	// console.log(res.result.balance);
	
	
	// btcchina.ticker(function (err2, obj2) {
	
		// console.log("last price " + obj2.ticker.last);
	// });
// });

// var liveorder = 111402817; // CANCELED
// var buyorder = 111522771; // CANCELED 
// var buyorder2 = 111525258; // CLOSED
// var buyorder3 = 111538804;

// var sellorder1 = 111526559; // CLOSED
// var sellorder2 = 111540227; // CLOSED

// btcchina.getOrder(sellorder2, function(err, obj) {

	// console.log(err);
	// console.log(obj);
	
	// btcchina.ticker(function (err2, obj2) {
	
		// console.log("last price " + obj2.ticker.last);
	// });
// });

// btcchina.cancelOrder(buyorder, function (err, obj) {
	
	// console.log(err);
	
	// console.log(obj);
// });

// btcchina.ticker(console.log);


/////////////////////////////////////////////

// var buyprice = 1609;
// var amount = 0.1;

// btcchina.buyOrder2(buyprice, amount, function(err, obj) {

	// console.log(err);
	
	// console.log("...");
	
	// console.log(obj);

// });
 
 
 ////////////////////////////////////////////

 


 
// var sellprice = 1614;
// var sellamount = 0.1;
// btcchina.sellOrder2(sellprice, sellamount, function(err, obj) {

	// console.log(err);
	// console.log("...");
	// console.log(obj);
	
	 // btcchina.ticker(function (err2, obj2) {
	
		// console.log("last price " + obj2.ticker.last);
	// });
// });
