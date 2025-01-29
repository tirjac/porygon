# Porygon

This library is intended to be used for data compression of large arrays , especially containing time series data.
This uses polyline format , which can achieve logical compression depending on sparseness and rate of change.

There is a python and a javascript library along with examples. You will just need to add this one file to your project.

porygon.py : Python fx
porygon.js : javascript fx

## Usage in Python:

The Porygon object has two functions:

encode : Encode a set of cvalues and returns the encoded polyline string.
- param `items` : Required. No of items in the array
- param `data`  : Required. List of cvalue tuples like ( 12001 , 1.22 , 1.45 , 5.666676 , 6.822221 , 92.1112221 ).
- param `precision` Optional. Precision to store of the encoded cvalues.  The default value is 5.

decode : Decode a polyline string into a set of cvalues and returns  List of coordinate tuples in order.
- param `items` : Required. No of items in the array
- param `data`  : Required. Polyline string to decode , e.g. '_ih_pfA_hmFoezGwwqa@{msh@cneqP_qo]gyuC??s_L?_{rc@~uJ???_jP'
- param `precision` Optional. Precision as stored should be same as encoded.  The default value is 5.


```
from porygon import Porygon
USE_PREC=6

aval = [
	( 12001 , 1.22 , 1.45 , 5.666676 , 6.822221 , 92.1112221 ),
	( 12006 , 1.9922 , 1.45 , 5.666676 , 6.888881 , 92.1112221 ),
	( 12012 , 1.9322 , 1.45 , 5.666676 , 6.888881 , 92.2000221 ),
]

pp = Porygon()

print (aval)
xx = pp.encode (6,aval, USE_PREC)
print (xx)
yy = pp.decode (6, xx, USE_PREC)
print (yy)
```

## Usage in Javascript:

The above in javascript.

```
'use strict';
const USE_PREC = 6;
const porygon = require('./porygon.js');

var aval = [
	[ 12001 , 1.22 , 1.45 , 5.666676 , 6.822221 , 92.1112221 ],
	[ 12006 , 1.9922 , 1.45 , 5.666676 , 6.888881 , 92.1112221 ],
	[ 12012 , 1.9322 , 1.45 , 5.666676 , 6.888881 , 92.2000221 ],
];

console.log(aval);
let xx = porygon.encode (6,aval , USE_PREC);
console.log(xx);
let yy = porygon.decode (6, xx , USE_PREC);
console.log(yy);
```

