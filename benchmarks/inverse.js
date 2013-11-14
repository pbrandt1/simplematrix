var m = require('../');
var fs = require('fs');
var moment = require('moment');

var ws = fs.createWriteStream(moment().format('[benchmark-inverse]-YYYY-MM-DD-HHmmss[.log]'));

/**
 * This function just write all the args separated by \t to the log file
 */
var writeLog = function() {
  ws.write(Array.prototype.join.call(arguments, '\t') + '\n');
};

// Log file headers
writeLog('startTime', 'stopTime');

/**
 * Run the benchmarks
 */
(function() {
  var reps = 1000; // number of times to run the test
  var n = 100; // nxn matrix
  var a = new m.Identity(n);
  var startTime;
  var stopTime;
  for (var r = 0; r < reps; r++) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        a[i][j] = 10*Math.random() - 5;
      }
    }
    startTime = +new Date();
    var a_inv = a.inverse();
    stopTime = +new Date();
    writeLog(startTime, stopTime);
  }
})();
