#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Child process execute with promise, deferred


## Install

```sh
$ npm install --save exec-then
```


## Usage

```js
var exec = require('exec-then');

exec('pwd').then(function(res) {
  assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
}, function(err) {
  console.log(err.toString());
  assert(false);
});

exec(['ls', '-al'], function(std, deferred) {
  if (std.stdout.indexOf('test') === -1) {
    return deferred.reject();
  }
  return true;
}).then(function(res) {
  if (res) {
    console.log('You have test file');
  }
}, function() {
  console.log('Where am I?');
});
```

## Options

`exec-node` using same options to [Child Process options](http://goo.gl/axu96) except to options below.

- `verbose`: show stdio/stderr message while child process is running. if verbose set true? `child_process.spawn` will be executed.

## License

MIT © [ragingwind](http://ragingwind.me)


[npm-url]: https://npmjs.org/package/exec-then
[npm-image]: https://badge.fury.io/js/exec-then.svg
[travis-url]: https://travis-ci.org/ragingwind/exec-then
[travis-image]: https://travis-ci.org/ragingwind/exec-then.svg?branch=master
[daviddm-url]: https://david-dm.org/ragingwind/exec-then.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ragingwind/exec-then
