
var io = require("../node_modules/socket.io-client");

var Dummy1 = function () {

	/* params */
	this.intervalSize = 5;

	this.threshold = 0.5;

	/* params end */

	this.socket = null;

	this.trendData = [];
	this.avgData = [];

	this.mainLoop();
};

Dummy1.prototype.mainLoop = function () {

	this.socket = io("https://websocket.btcchina.com/");

	this.socket.emit('subscribe', 'marketdata_cnybtc');

	var this2 = this;
	this.socket.on("connect", function () {

		console.log("CONNECTED");

		this2.socket.on("ticker", function (data) {

			console.log("Last price: " + data.ticker.last);

			console.log(this2.trendData);

			this2.trendData.push(data.ticker.last);
			if (this2.trendData.length > this2.intervalSize) {

				var sum = 0;
				for (var i = 0; i < this2.trendData.length; i++) {

					sum += this2.trendData[i];
				}
				var avg = sum / this2.trendData.length;
				this2.avgData.push(avg);

				// 
				if (this2.avgData.length < 2)
					return;

				var newest = this2.avgData[this2.avgData.length - 1];
				var newest2 = this2.avgData[this2.avgData.length - 2];
				var diff =  newest - newest2;

				if (diff > this2.threshold)
					console.log("rostouci (" + newest2 + ", " + newest + ")");
				else if (diff < -this2.threshold)
					console.log("klesajici (" + newest2 + ", " + newest + ")");
				else
					console.log("stagnujici (" + newest2 + ", " + newest + ")");

//				console.log(this2.avgData);
				this2.trendData = [];
			}
		});
	});
};

Dummy1.prototype.getTrend = function () {

};


new Dummy1();
