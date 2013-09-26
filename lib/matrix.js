(function () {
  var _ = require('underscore');

  /**
   * Creates a new Matrix object
   *
   * @param a: An array of rows, like [[1, 2], [3, 4]]
   * | 1  2 |
   * | 3  4 |
   * @constructor
   */
  var Matrix = function (a) {
    var m = 0; // rows
    var n = 0; // columns
    var i;

    // quick check of validity
    // a should be an array
    if (!a.length) {
      throw new Error('Must supply an array of arrays to the M constructor');
    }
    m = a.length;
    if (!a[0].length) {
      throw new Error('Must supply an array of arrays to the M constructor');
    }
    n = a[0].length;
    for (i = 1; i < m; i++) {
      if (!a[i].length) {
        throw new Error('Must supply an array of arrays to the M constructor');
      }
      if (a[i].length !== n) {
        throw new Error('All rows must have the same number of columns');
      }
    }
    var props = {
      "m": m,
      "n": n,
      "rows": m,
      "columns": n
    };
    var methods = {
      multiply: function (matrix) {
        var newMatrix = [];
        var i;
        var j;
        var k;
        if (matrix.m && matrix.n) {
          if (this.n !== matrix.m) {
            throw new Error('Dimension mismatch: cannot multiply a ' + this.m + 'x' + this.n +
              ' matrix by a ' + matrix.m + 'x' + matrix.n + ' matrix.');
          }
          for (i = 0; i < this.m; i++) {
            newMatrix[i] = [0];
            for (j = 0; j < matrix.n; j++) {
              var sum = 0;
              for (k = 0; k < this.n; k++) {
                sum += this[i][k] * matrix[k][j];
              }
              newMatrix[i][j] = sum;
            }
          }
          return new Matrix(newMatrix);
        } else if (typeof(matrix) === 'number') {
          for (i = 0; i < this.m; i++) {
            newMatrix[i] = [0];
            for (j = 0; j < this.n; j++) {
              newMatrix[i][j] = this[i][j] * matrix;
            }
          }
          return new Matrix(newMatrix);
        }
      },
      add: function (matrix) {
        var i;
        var j;
        if (this.m === matrix.m && this.n === matrix.n) {
          var newMatrix = [];
          for (i = 0; i < this.m; i++) {
            newMatrix[i] = [];
            for (j = 0; j < this.n; j++) {
              newMatrix[i][j] = this[i][j] + matrix[i][j];
            }
          }
          return new Matrix(newMatrix);
        } else {
          throw new Error('Matrix dimensions must match');
        }
      },
      equals: function(matrix) {
        var i, j;
        if (this.m === matrix.m && this.n === matrix.n) {
          for (i = 0; i < this.m; i++) {
            for (j = 0; j < this.n; j++) {
              if (this[i][j] !== matrix[i][j]) {
                return false;
              }
            }
          }
          return true;
        } else {
          return false;
        }
      },
      inverse: function() {
        var i;
        var j;
        var k;
        if (this.m !== this.n) {
          throw new Error('Can only invert square matrices.');
        }

      }
    };
    // Method aliases
    _.extend(methods, {
      times: methods.multiply, plus: methods.add
    });

    var M = function (matrix) {
      _.extend(this, matrix);
    };
    _.extend(M.prototype, props);
    _.extend(M.prototype, methods);

    return new M(a);
  };
  module.exports = exports = {Matrix: Matrix};
})();