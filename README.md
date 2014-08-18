node-trigger
===========

MeCab connector for Node.js

[![Build Status](https://secure.travis-ci.org/exabugs/node-trigger.png?branch=master)](http://travis-ci.org/exabugs/node-trigger)
[![Coverage Status](https://coveralls.io/repos/exabugs/node-trigger/badge.png?branch=master)](https://coveralls.io/r/exabugs/node-trigger?branch=master)
[![Code Climate](https://codeclimate.com/github/exabugs/node-trigger.png)](https://codeclimate.com/github/exabugs/node-trigger)
[![Dependency Status](https://david-dm.org/exabugs/node-trigger.png)](https://david-dm.org/exabugs/node-trigger)

[![NPM](https://nodei.co/npm/node-trigger.png?stars&downloads)](https://nodei.co/npm/node-trigger/) [![NPM](https://nodei.co/npm-dl/node-trigger.png)](https://nodei.co/npm/node-trigger/)

System Requirements
-----

```
$ echo '今日は残業' | mecab
今日	名詞,副詞可能,*,*,*,*,今日,キョウ,キョー,,
は	助詞,係助詞,*,*,*,*,は,ハ,ワ,,
残業	名詞,サ変接続,*,*,*,*,残業,ザンギョウ,ザンギョー,,
EOS
```


Usage
-----

Installation command is `npm install node-trigger`.

### Quick example

```javascript
var should = require("should")
  , MeCab = require('node-trigger').MeCab
  ;

    var process = MeCab.parse("今日は残業。明日も残業。");

    var result = {};

    process.on('record', function (record, index) {
      if (record[1] === '名詞') {
        var count = result[record[0]];
        result[record[0]] = count ? ++count : 1;
      }
    });

    process.on('error', function (error) {
      done(error);
    });

    process.on('end', function (count) {
      result.should.eql({ '今日': 1, '残業': 2, '明日': 1 });
      done(null, result, count);
    });
```

### Example 1

```javascript
    var process = MeCab.parse("今日は残業。明日も残業。");
```

### Example 2

```javascript
    var process = MeCab.parse(fs.createReadStream("path.to.text_file"));
```

## License

MIT license, go wild.

## Change Log

### 1.0 → 1.1
Add Steming Filter.
 - DoubleByte to SingleByte
```
 ＡＢＣ → ABC
 １２３ → 123
```
 - Capital to Small
```
 iPhone → iphone
```
