# simplematrix
pretty simple matrix math library.
## How to use
```
npm install simplematrix
```

```js
var m = require('simplematrix');
// let's solve AX = B
var a = new m.Matrix([[1,2],[3,4]]);
var b = new m.Matrix([[1,1],[1,0]]);
var x = a.solve(b);
/* x:
{ '0': [ -1, -1.9999999999999996 ],
  '1': [ 1, 1.4999999999999998 ] }
*/
```
## Constructors
```js
var a = new m.Matrix([[1,2],[3,4]]);
var i2 = new m.Identity(2);
```

## Functions on each Matrix
### times, multiply
Returns the result of multiplying a matrix by a constant or another (correctly-dimensioned) matrix.
```js
var c = a.times(b);
var c = a.multiply(b);
```
### plus, add
```js
var c = a.plus(b);
var c = a.add(b);
```
### equals
Watch out for round-off error
```js
if (a.equals(b))
```
### solve
Solves the system of linear equations AX=B via the Gauss-Jordan method with partial pivoting.
```js
var x = a.solve(b);
```
### divideBy
Similar to `solve()`.
```js
var x = b.divideBy(a);
```
### inverse
Returns the inverse of a matrix (by letting B equal the identity matrix in  `a.solve(b)`).
```js
var a_inverse = a.inverse();
```
### transpose
Returns the transpose of a matrix.
```js
var a_T = a.transpose();
```
### copy
Copies a matrix
```js
var a2 = a.copy();
```