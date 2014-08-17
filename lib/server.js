"use strict";

var Trigger = require('./trigger');

var http = require('http');


var port = process.env.PORT || 8889;

var trigger = new Trigger();

var plainHttpServer = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html'});
//  res.end(clientHtml);
}).listen(port, function () {

  trigger.listen(this);

  trigger.on('message', function (msg) {
    console.log(msg);
  })

});



/*
 var accept = ['localhost', '127.0.0.1'];
 req.origin = req.origin || '*';
 if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
 req.reject();
 console.log(req.origin + ' access not allowed.');
 return;
 }
 */
