#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Child process execute with promise, deferred


## Install

```sh
$ npm install --save deffered-exec
```


## Usage

```js
var exec = require('deffered-exec');

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


[npm-url]: https://npmjs.org/package/deffered-exec
[npm-image]: https://badge.fury.io/js/deffered-exec.svg
[travis-url]: https://travis-ci.org/ragingwind/deffered-exec
[travis-image]: https://travis-ci.org/ragingwind/deffered-exec.svg?branch=master
[daviddm-url]: https://david-dm.org/ragingwind/deffered-exec.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ragingwind/deffered-exec
