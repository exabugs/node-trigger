"use strict";

var Trigger = require('../lib/trigger');

describe('FileableBase', function () {

  it('Prepare.', function (done) {

    var trigger = new Trigger();

    trigger.connect('localhost:8888');

    trigger.on('message', function (msg) {
      console.log(msg);
    });

  });

});
