
var http = require('http');
var helpers = require('./helpers/helpers');
var chalk = require('chalk');
var err = helpers.err;
var succ = helpers.succ;

var BtcchinaScraper = function () {

};

/*
 * fromTs, toTs: UNIX timestamps
 */
BtcchinaScraper.prototype.scrapeTrades = function (fromTs, toTs, success, fail) {
	
	// TEST DATA 
	var td = this._getTestData(1);
	fromTs = fromTs || td.f;
	toTs = toTs || td.t;
	// TEST DATA END
	
	var completedData = [];
	
	var this2 = this;
	var processPartDataFunc = function (partData) {
		
		console.log(partData.length);
		if (!partData || partData.length === 0) {
			
			console.log(chalk.cyan("going to sleep mode for 10 s"));
			setTimeout(function() {
				this2._getTrades(completedData[completedData.length - 1].date, processPartDataFunc, fail);
			}, 40 * 1000);
			return;
		}
		
		var lastTrade = partData[partData.length - 1];
		// test if we already reached to-timestamp within this partData
		if (lastTrade.date > toTs) {
			
			// merge respective part of this partData
			for (var trade, i = 0; i < partData.length; i++) {
				
				trade = partData[i];
				if (trade.date > toTs) 
					break;
				
				completedData.push(trade);
			}
			
			success(completedData);
		}
		// else merge whole array and get another part data
		else {
			completedData = completedData.concat(partData);
			console.log("data processed");
			
			this2._getTrades(lastTrade.date, processPartDataFunc, fail);
		} 
	};
	this._getTrades(fromTs, processPartDataFunc, fail);
};

BtcchinaScraper.prototype._getTrades = function (fromTs, success, fail) {
	
	console.log("getting data from btcchina API...");
	http.get({
		host: 'data.btcchina.com',
		path: '/data/historydata?since=' + fromTs + '&limit=5000&sincetype=time'
	}, function(response) {
		// Continuously update stream with data
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function() {

			// Data reception is done, do whatever with it!
			var parsed = JSON.parse(body);
			success(parsed);
		});
	}).on("error", function(e) {
		
		err("error while http get API");
		err(e);
		if (fail)
			fail(e);
	});
};


BtcchinaScraper.prototype._getTestData = function(num) {
	
	switch(num) {
		case 1:
			return {f: 1434960000, t: 1434969000};
		case 2:
		default:
			return {f: 1434960000, t: 1434990000};
			
	}
};

module.exports.BtcchinaScraper = BtcchinaScraper;