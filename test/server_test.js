"use strict";

var Trigger = require('../lib/trigger');
var http = require('http');
var should = require('should');

var port = process.env.PORT || 8888;

describe('Trigger', function () {

  var trigger_A = new Trigger();


  it('Prepare.', function (done) {


    var plainHttpServer = http.createServer(function (req, res) {
    }).listen(port, function () {

      trigger_A.listen(this);

      /*
      trigger_A.on('message', function (msg) {
        console.log(msg);
      });
*/
      done();

    });

  });


  it('trigger_B.', function (done) {

    var trigger_B = new Trigger();

    trigger_B.connect(['localhost', port].join(':'), function (err) {

      trigger_B.on('message', function (msg) {
        console.log(msg);
        msg.should.eql('hello');

        trigger_B.close(function (err) {
          done();
        });
      });

      trigger_A.send('hello');

    });

  });

  it('trigger_C.', function (done) {

    var trigger_C = new Trigger();
    var trigger_D = new Trigger();

    var count = 0;

    trigger_C.connect(['localhost', port].join(':'), function (err) {
      trigger_D.connect(['localhost', port].join(':'), function (err) {

        trigger_C.on('message', function (msg) {
          console.log(msg);
          msg.should.eql('hello');
          _done();
        });

        trigger_D.on('message', function (msg) {
          console.log(msg);
          msg.should.eql('hello');
          _done();
        });

        trigger_A.send('hello');

        function _done() {
          count++;
          if (1 < count) {
            done();
          }
        }

      });
    });

  });

});
