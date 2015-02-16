'use strict';

var exec = require('child_process').exec;
var q = require('q');

function execThen(bin, opt, mid) {
  var deferred = q.defer();

  if (typeof opt === 'function') {
    mid = opt;
    opt = {};
  } else if (!opt) {
    opt = {};
  }

  // merge bin and arguments
  if (Array.isArray(bin)) {
    bin = bin.join(' ');
  }

  exec(bin, opt, function(err, stdout, stderr) {
    var stdio = {
      err: err,
      stdout: stdout,
      stderr: stderr
    };

    if (opt.verbose){
      process.stdout.write(stdout);
      process.stderr.write(stderr);
    }

    if (mid) {
      stdio.params = mid(stdio, deferred);
    }

    deferred.resolve(stdio);
  });

  return deferred.promise;
};

module.exports = execThen;
