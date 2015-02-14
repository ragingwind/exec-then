'use strict';

var exec = require('child_process').exec;
var q = require('q');

function execThen(bin, opt, cb) {
  var deferred = q.defer();

  if (typeof opt === 'function') {
    cb = opt;
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

    cb(stdio, function(err, params) {
      stdio.params = params;
      !err ? deferred.resolve(stdio) : deferred.reject(err);
    });
  });

  return deferred.promise;
};

module.exports = execThen;
