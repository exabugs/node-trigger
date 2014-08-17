"use strict";

var Trigger = require('../lib/trigger');
var http = require('http');
var should = require('should');


describe('Trigger', function () {

  var trigger_A = new Trigger();
  var port_A = 8888;
  var address_A = ['localhost', port_A].join(':');

  it('Prepare.', function (done) {

    http.createServer().listen(port_A, function () {

      trigger_A.listen(this);

      done();

    });

  });


  it('trigger_B.', function (done) {

    var trigger_B = new Trigger();

    trigger_B.connect(address_A);

    trigger_B.on('message', function (msg) {
      msg.should.eql('hello');

      trigger_B.close(function (err) {
        done();
      });
    });

    setTimeout(function () {
      trigger_A.send('hello');
    }, 500);

  });

  it('trigger_C.', function (done) {

    var trigger_C = new Trigger();
    var trigger_D = new Trigger();

    var count = 0;

    trigger_C.connect(address_A);
    trigger_D.connect(address_A);

    trigger_C.on('message', function (msg) {
      msg.should.eql('hello');
      _done();
    });

    trigger_D.on('message', function (msg) {
      msg.should.eql('hello');
      _done();
    });

    function _done() {
      count++;
      if (1 < count) {
        trigger_C.close();
        trigger_D.close();
        done();
      }
    }

    setTimeout(function () {
      trigger_A.send('hello');
    }, 500);


  });

  var trigger_X = new Trigger();
  var port_X = 8889;
  var address_X = ['localhost', port_X].join(':');

  it('trigger_X.', function (done) {

    http.createServer().listen(port_X, function () {

      trigger_X.listen(this);
      trigger_X.connect(address_A);

      trigger_X.on('message', function (msg) {
        msg.should.eql('hello');
        done();
      });
    });

    setTimeout(function () {
      trigger_A.send('hello');
    }, 500);

  });

});
