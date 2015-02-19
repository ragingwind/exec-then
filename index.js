'use strict';

var q = require('q');

function Bin(commands) {
  this.bin = '';
  this.args = null;

  if (Array.isArray(commands)) {
    commands = commands.join(' ');
  }

  // Origin code from:
  // https://github.com/joyent/node/blob/master/lib/child_process.js#L615
  if (process.platform === 'win32') {
    this.bin = process.env.comspec || 'cmd.exe';
    this.args = ['/s', '/c', '"' + commands + '"'];
  } else {
    this.bin = '/bin/sh';
    this.args = ['-c', commands];
  }
}

Bin.prototype.toString = function() {
  return this.bin + (this.args && this.args.length > 0) ? this.args.join(' ') : '';
};

function execFile(bin, opt, done) {
  var proc = require('child_process').spawn(bin.bin, bin.args, opt);
  var stdio = {
    err: null,
    stdout: '',
    stderr: ''
  };

  proc.stdout.on('data', function(out) {
    stdio.stdout += out;
    opt.verbose && process.stdout.write(out);
  });

  proc.stderr.on('data', function(err) {
    stdio.stderr += err;
    opt.verbose && process.stderr.write(err);
  });

  proc.addListener('error', function(err) {
    stdio.err = err;
    proc.stdout.destroy();
    proc.stderr.destroy();
    done(stdio);
  });

  proc.on('close', function(code, signal) {
    if (code !== 0 || signal !== null) {
      stdio.err = new Error('Command failed: ' + bin.toString() + '\n' + stdio.stderr);
      stdio.err.code = code;
      stdio.err.signal = signal;
    }
    done(stdio);
  });
};

function execThen(commands, opt, predicate) {
  var deferred = q.defer();

  if (typeof opt === 'function') {
    predicate = opt;
    opt = {};
  } else if (!opt) {
    opt = {};
  }

  if (Object.keys(opt).indexOf('verbose') === -1) {
    opt.verbose = execThen.verbose;
  }

  execFile(new Bin(commands), opt, function(stdio) {
    if (predicate) {
      stdio.params = predicate(stdio, deferred);
    }

    deferred.resolve(stdio);
  });

  return deferred.promise;
};

execThen.verbose = false;

module.exports = execThen;
