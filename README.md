# node-enums <img src="https://circleci.com/gh/tyleragreen/node-enums.svg?style=shield">

Simple Javascript ES6 enumerated types.

## Installation

`npm install node-enums`

## Usage

```javascript
var Enum = require('node-enums');
var Mode = Enum(['BEST','WORST']);

console.log(Mode.BEST);
// BEST

console.log(Mode.ALL);
// [ 'BEST', 'WORST' ]

console.log(Mode['BE'+'ST']);
// BEST

console.log(Mode.DECENT);
// throws Error

for (let member of Mode) {
  console.log(member);
}
// BEST
// WORST
```
