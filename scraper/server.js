/* *** MODULES *** */
var express = require('express');
var fs = require('fs');
var btcsMod = require('./js/BtcchinaScraper.js');
var helpers = require('./js/helpers/helpers.js');
var chalk = require('chalk');

/* *** GLOBALS *** */

var succ = helpers.succ;
var err = helpers.err;
var btcs = new btcsMod.BtcchinaScraper();

var PORT = process.env.PORT || 2302;

// scraper testing
//btcs.scrapeTrades(0, 0, function(data) {
//	succ("data obtained! (size " + data.length + ")");
//});

//fs.writeFile("./public/downloads/hovno.txt", "picus", function(error) {
//	if (error) {
//		err("error while saving json file");
//		err(error);
//	}
//	else {
//		succ("SUCCESS");
//	}
//});

/* *** SERVER *** */

var app = express();
app.use('/', express.static(__dirname + '/public'));
app.use('/downloads', express.static(__dirname + '/public/downloads'));

app.get('/btcchina', function (req, res) {

	console.log(chalk.cyan("Retrieving trades from/to:"));
	console.log(req.query.fromTs);
	console.log(req.query.toTs);

	var fromTs = req.query.fromTs;
	var toTs = req.query.toTs;

	btcs.scrapeTrades(fromTs, toTs, function(data) {
		
		succ("data obtained! (size " + data.length + ")");
		
		if (data.length === 0) {
			res.json({
				data: [],
				path: "",
				fileName: ""
			});
			return;
		}
		
		var pathPrefix = "public/";
		var path = "downloads/";
		var fileName = data[0].date + ".json";
//		var strData = JSON.stringify(data);
		console.log("saving file to ", path + fileName);
		fs.writeFile(pathPrefix + path + fileName, JSON.stringify(data), function(error) {
			if (error) {
				err("error while saving json file");
				err(error);
			}
			else {
				succ("done");
				res.json({
					data: data,
					path: path,
					fileName: fileName
				});
				return;
			}
		})
		
	}, function(e) {

		err(e);
		res.end("FUDGE IT");
	});
});


app.get('/', function (req, res) {
  res.send('server ok');
});


var server = app.listen(PORT, function () {

//  var host = server.address().address;
//  var port = server.address().port;
	
	console.log('Scraper app listening at http://localhost:%s', PORT);
});



//////////////////////////////////////////
// DATA TESTING
//fs.readFile('public/downloads/1433800808.json', function(err, jsonData) {
//	
//	var trades = JSON.parse(jsonData);
//
//	for (var i = 0; i < trades.length; i++) {
//		
//		if (i == 0) continue;
//		
//		var lastTrade = trades[i - 1];
//		var trade = trades[i];
//		
//		if (lastTrade.date > trade.date) {
////		if (lastTrade.date === trade.date) {
//			
//			console.log("i", i);
//			console.log(lastTrade);
//			console.log(trade);
//		}
//	}
//});