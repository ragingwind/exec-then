'use strict';

// var process = require('child_process');
var q = require('q');

var childProcess = {
  exec: function(bin, opt, done) {
    require('child_process').exec(bin, opt, function(err, stdout, stderr) {
      var stdio = {
        err: err,
        stdout: stdout,
        stderr: stderr
      };

      done(stdio);
    });
  },
  spawn: function(bin, opt, done) {
    var bin = require('child_process').spawn(bin);
    var maxBuffer = opt.maxBuffer || 200*1024;
    var stdio = {
      err: null,
      stdout: '',
      stderr: ''
    };

    bin.stdout.on('data', function(out) {
      stdio.stdout += out;
      process.stdout.write(out);
    });

    bin.stderr.on('data', function(err) {
      stdio.stderr += err;
      process.stderr.write(err);
    });

    bin.on('error', function(err) {
      stdio.err = err;
    });

    bin.on('close', function(code) {
      done(stdio);
    });
  }
};

function execThen(bin, opt, predicate) {
  var deferred = q.defer();

  if (typeof opt === 'function') {
    predicate = opt;
    opt = {};
  } else if (!opt) {
    opt = {};
  }

  // merge bin and arguments
  if (Array.isArray(bin)) {
    bin = bin.join(' ');
  }

  childProcess[opt.verbose ? 'spawn' : 'exec'](bin, opt, function(stdio) {
    if (predicate) {
      stdio.params = predicate(stdio, deferred);
    }

    deferred.resolve(stdio);
  });

  return deferred.promise;
};

module.exports = execThen;
