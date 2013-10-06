# simplematrix
pretty simple matrix math library.
## How to use
```
npm install simplematrix
```

```js
var m = require('simplematrix');
// solve AX = B
var a = new m.Matrix([[1,2],[3,4]]);
var b = new m.Matrix([[1,1],[1,0]]);
var x = b.dividedBy(a);
x // Watch out for floating point error
/*
{ '0': [ -1, -1.9999999999999996 ],
  '1': [ 1, 1.4999999999999998 ] }
*/
x.rounded() // You can round it if you want (casts to precision 12)
/*
{ '0': [ -1, -2 ],
  '1': [ 1, 1.5 ] }
*/
x.equals(x.rounded()) // But the equals() operator automatically compensates for floating point error
/*
true
*/
```
## Constructors
```js
var a = new m.Matrix([[1,2],[3,4]]);
var i2 = new m.Identity(2);
```

## Functions on each Matrix
### times
Returns the result of multiplying a matrix by a constant or another (correctly-dimensioned) matrix.
```js
var c = a.times(b);
```
### plus
```js
var c = a.plus(b);
```
### equals
Tests for equality. Handles floating point error nicely.
```js
if (a.equals(b))
```
### dividedBy
Solves the system of linear equations AX=B via the Gauss-Jordan method with partial pivoting.
```js
var x = b.dividedBy(a);
```
### inverse
Returns the inverse of a matrix (by letting B equal the identity matrix in  `a.solve(b)`).  The inverse is cached, so if you call `.inverse()` a second time, the only work done will be to see if the matrix has changed since the last inverse computation.
```js
var a_inv = a.inverse();
```
### transpose
Returns the transpose of a matrix.  Not cached.
```js
var a_T = a.transpose();
```
### copy
Copies a matrix
```js
var a2 = a.copy();
```
### rounded
Takes care of floating point error using `parseFloat(f.toFixed(12))` on each element f of the matrix
```js
var niceMatrix = x.rounded();
```

## Properties on each Matrix
### rows
```js
var m = a.rows;
```
### columns
```js
var n = a.columns;
```