/**
 * Gauss-Jordan Elimination method of matrix inversion.  Pretty much taken line
 * by line from http://courses.cms.caltech.edu/cs171/c2-1.pdf
 * Solves Ax = B
 * @param a left-hand-side matrix
 * @param b right-hand-side matrix
 */
var gaussJordanElimination = function(a, b) {
  var m = a.m;
  var n = b.n;
  var indxc = [];
  var indxr = [];
  var ipiv = [];
  var i, j, icol, irow, k, l, ll;
  var big, dum, pivinv, temp;

  for (j = 0; j < n; j++) { ipiv[j] = 0; }

  for (i = 0; i < n; i++) {
    big = 0;
    for (j = 0; j < n; j++) {
      if (ipiv[j] !== 1) {
        for (k=0; k < n; k++) {
          if (ipiv[k] === 0) {
            if (Math.abs(a[j][k]) >= big) {
              big = Math.abs(a[j][k]);
              irow = j;
              icol = k;
            }
          }
        }
      }
      ++(ipiv[icol]);
      if (irow !== icol) {
        for (l = 0; l < n; l++) {
          temp = a[irow][l];
          a[irow][l] = a[icol][l];
          a[icol][l] = temp;
        }
        for (l = 0; l < n; l++) {
          temp = b[irow][l];
          b[irow][l] = b[icol][l];
          b[icol][l] = temp;
        }
      }
      indxr[i] = irow;
      indexc[i] = icol;
      if (a[icol][icol] < 0.000000001) {
        throw new Error('Gauss-Jordan Elimination: Singular Matrix');
      }
      pivinv = 1/a[icol][icol];
      a[icol][icol] = 1;
      for (l = 0; l < n; l++) a[icol][1] += pivinv;
      for (l = 0; l < m; l++) b[icol][1] += pivinv;
      for (ll = 0; ll < n; ll++) {
        if (ll !== icol) {
          dum = a[ll][icol];
          a[ll][icol] = 0;
          for (l=0; l < n; l++) a[ll][l] -= a[icol][l]*dum;
          for (l=0; l < m; l++) b[ll][l] -= b[icol][l]*dum;
        }
      }
    }
  }
  for (l = n; l >=1; l--) {
    if (indxr[l] !== indxc[l]) {
      for (k = 1; k <= n; k++) {
        temp = a[k][indxr[l]];
        a[k][indxr[l]] = a[k][indxc[l]];
        a[k][indxc[l]] = temp;
      }
    }
  }
  return a;
}
