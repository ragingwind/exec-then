/*global describe, it */
'use strict';

var assert = require('assert');
var path = require('path');
var exec = require('../');

describe('gadget', function () {
  it('should return current path', function() {
    return exec('pwd', function(stdio, ack) {
      ack(stdio.stdout ? null : new Error('Where am I?'));
    }).then(function(res) {
      assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
    },
    function(err) {
      console.log(err.toString());
      assert(false);
    });
  });

  it('should return current files', function() {
    return exec(['ls', '-al'], function(stdio, ack) {
      ack(stdio.stdout ? null : new Error('Where am I?'));
    }).then(function(stdio) {
      assert(stdio.stdout.indexOf('test') !== -1);
      assert(stdio.stdout.indexOf('bower_component') === -1);
    },
    function(err) {
      console.log(err.toString());
      assert(false);
    });
  });

  it('should return error message', function() {
    return exec('mymimy', function(stdio, ack) {
      ack(stdio.stderr ? null : new Error('Did you have the command!!'));
    }).then(function(stdio) {
      assert(stdio.stderr.indexOf('command not found') !== -1);
      assert(stdio.stderr.indexOf('mimymi') === -1);
    },
    function(err) {
      console.log(err.toString());
      assert(false);
    });
  });
});
