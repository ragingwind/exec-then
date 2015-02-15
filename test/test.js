/*global describe, it */
'use strict';

var assert = require('assert');
var path = require('path');
var exec = require('../');

describe('gadget', function () {
  var opt = {
    verbose: true
  };

  it('should return current path', function() {
    return exec('pwd', opt).then(function(res) {
      assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
    },
    function(err) {
      console.log(err.toString());
      assert(false);
    });
  });

  it('should return current files', function() {
    return exec(['ls', '-al'], opt).then(function(std) {
      assert(std.stdout.indexOf('test') !== -1);
      assert(std.stdout.indexOf('bower_component') === -1);
    },
    function(err) {
      console.log(err.toString());
      assert(false);
    });
  });

  it('should return error message', function() {
    return exec('mymimy', opt, function(std, deferred) {
      if (std.stderr) {
        return deferred.reject(new Error('Did you have the command!!'));
      }
      return true;
    }).then(function(std) {
      assert(std.stderr.indexOf('command not found') !== -1);
      assert(std.stderr.indexOf('mimymi') === -1);
    },
    function(e) {
      console.log('You are at right place', e.toString());
      assert(true);
    }).catch(function(e) {
      console.log('Something went wrong', e.toString());
    });
  });
});
