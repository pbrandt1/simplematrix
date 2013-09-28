/**
 * Gauss-Jordan elimination with partial pivoting
 * Solves Ax = B
 * If B is the identity matrix, this gives the inverse
 * @param A left-hand-side matrix
 * @param B right-hand-side matrix
 */
var gaussJordanElimination = function(A, B) {
  var a = A.copy();
  var b = B.copy();
  var m = b.m; // Number of rows in the solution
  var n = b.n; // Number of columns in the solution
  var i, j, jj, pivot;
  var big, dum, temp;

  for (j = 0; j < m; j++) {  // main loop over the columns of A
    // Find a pivot
    big = a[j][j];
    pivot = j;
    for (i = j; i < m; i++) {
      if (Math.abs(a[i][j]) > big) {
        big = a[i][j];
        pivot = i;
      }
    }
    if (big === 0) {
      throw new Error('Error during Gauss-Jordan elimination: singular matrix encountered.');
    }
    // pivot rows
    if (pivot !== j) {
      temp = a[j];
      a[j] = a[pivot];
      a[pivot] = temp;
      temp = b[j];
      b[j] = b[pivot];
      b[pivot] = temp;
    }
    // elimination step
    for (i = j + 1; i < m; i++) {
      dum = a[i][j]/a[j][j];
      for (jj = j; jj < m; jj++) {
        a[i][jj] -= dum*a[j][jj];
      }
      for (jj = j; jj < n; jj++) {
        b[i][jj] -= dum*b[j][jj];
      }
    }
  }
  // back-substitution
  for (j = m - 1; j >= 0; j--) {
    dum = 1/a[j][j];
    // normalize the row
    a[j][j] = 1;
    for (jj = 0; jj < n; jj++) {
      b[j][jj] = b[j][jj]*dum;
    }
    // zero-out the column
    for (i = j - 1; i >= 0; i--) {
      dum = a[i][j];
      a[i][j] = 0;
      for (jj = 0; jj < n; jj++) {
        b[i][jj] -= b[j][jj]*dum;
      }
    }
  }
  return b;
};

module.exports = exports = {gaussJordanElimination: gaussJordanElimination};