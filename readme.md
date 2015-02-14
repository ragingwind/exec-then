#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Child process execute with promise, deferred


## Install

```sh
$ npm install --save exec-then
```


## Usage

```js
var exec = require('exec-then');

exec('pwd', function(stdio, ack) {
  ack(stdio.stdout ? null : new Error('Where am I?'));
}).then(function(res) {
  assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
},
function(err) {
  console.log(err.toString());
  assert(false);
});
```


## License

MIT © [ragingwind](http://ragingwind.me)


[npm-url]: https://npmjs.org/package/exec-then
[npm-image]: https://badge.fury.io/js/exec-then.svg
[travis-url]: https://travis-ci.org/ragingwind/exec-then
[travis-image]: https://travis-ci.org/ragingwind/exec-then.svg?branch=master
[daviddm-url]: https://david-dm.org/ragingwind/exec-then.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ragingwind/exec-then
