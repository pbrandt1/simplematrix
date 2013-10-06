(function () {
  var _ = require('underscore');
  var inverse = require('./inverse.js');

  /**
   * Creates a new Matrix object
   *
   * @param a: An array of rows, like [[1, 2], [3, 4]]
   * | 1  2 |
   * | 3  4 |
   * @constructor
   */
  var Matrix = function (a) {
    var rows = 0; // rows
    var columns = 0; // columns
    var inv; // inverse
    var invertedMatrix; // the matrix that the cached inverse derives from

    // For playing nice with floats when necessary
    var round = function(f) {
      return parseFloat(f.toFixed(12));
    };

    // quick check of validity
    // a should be an array
    if (!a.length) {
      throw new Error('Must supply an array of arrays to the M constructor');
    }
    rows = a.length;
    if (!a[0].length) {
      throw new Error('Must supply an array of arrays to the M constructor');
    }
    columns = a[0].length;
    for (var i = 1; i < rows; i++) {
      if (!a[i].length) {
        throw new Error('Must supply an array of arrays to the M constructor');
      }
      if (a[i].length !== columns) {
        throw new Error('All rows must have the same number of columns');
      }
    }

    var calculateInverse = function(matrix) {
      return inverse.gaussJordanElimination(matrix, new Identity(matrix.rows));
    };
    var inverseIsDirty = function(matrix) {
      if (inv == null) {
        return true;
      }
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          if (matrix[i][j] !== invertedMatrix[i][j]) {
            return true;
          }
        }
      }
      return false;
    };

    var props = {
      "rows": rows,
      "columns": columns
    };
    var methods = {
      times: function (matrix) {
        var newMatrix = [];
        var i, j, k;
        if (matrix.rows && matrix.columns) {
          if (columns !== matrix.rows) {
            throw new Error('Dimension mismatch: cannot multiply a ' + rows + 'x' + columns +
              ' matrix by a ' + matrix.rows + 'x' + matrix.columns + ' matrix.');
          }
          for (i = 0; i < rows; i++) {
            newMatrix[i] = [0];
            for (j = 0; j < matrix.columns; j++) {
              var sum = 0;
              for (k = 0; k < columns; k++) {
                sum += this[i][k] * matrix[k][j];
              }
              newMatrix[i][j] = sum;
            }
          }
          return new Matrix(newMatrix);
        } else if (typeof(matrix) === 'number') {
          for (i = 0; i < rows; i++) {
            newMatrix[i] = [0];
            for (j = 0; j < columns; j++) {
              newMatrix[i][j] = this[i][j] * matrix;
            }
          }
          return new Matrix(newMatrix);
        }
      },
      plus: function (matrix) {
        var i;
        var j;
        if (rows === matrix.rows && columns === matrix.columns) {
          var newMatrix = [];
          for (i = 0; i < rows; i++) {
            newMatrix[i] = [];
            for (j = 0; j < columns; j++) {
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
        if (rows === matrix.rows && columns === matrix.columns) {
          for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
              if (round(this[i][j]) !== round(matrix[i][j])) {
                return false;
              }
            }
          }
          return true;
        } else {
          return false;
        }
      },
      dividedBy: function(matrix) {
        if (matrix.rows !== matrix.columns) {
          throw new Error('Can only invert square matrices.');
        } else if (matrix.rows !== rows) {
          throw new Error('Incompatible dimensions');
        }
        if (!inverseIsDirty(this)) {
          return this.inverse().times(matrix);
        }
        return inverse.gaussJordanElimination(matrix, this);
      },
      solve: function(matrix) {
        if(matrix.dividedBy) {
          return matrix.dividedBy(this);
        } else {
          return (new Matrix(matrix)).dividedBy(this);
        }
      },
      inverse: function() {
        if (rows !== columns) {
          throw new Error('Can only invert square matrices.');
        }
        if (inverseIsDirty(this)) {
          inv = calculateInverse(this);
          invertedMatrix = this.copy();
        }
        return inv;
      },
      transpose: function() {
        var i, j;
        var newMatrix = [];
        for (j = 0; j < columns; j++) {
          newMatrix[j] = [];
          for (i = 0; i < rows; i++) {
            newMatrix[j][i] = this[i][j];
          }
        }
        return new Matrix(newMatrix);
      },
      copy: function() {
        var newMatrix = [];
        for (var i = 0; i < rows; i++) {
          newMatrix[i] = this[i].slice(0);
        }
        return new Matrix(newMatrix);
      },
      rounded: function() {
        var i, j;
        var newMatrix = [];
        for (i = 0; i < rows; i++) {
          newMatrix[i] = [];
          for (j = 0; j < rows; j++) {
            newMatrix[i][j] = round(this[i][j]);
          }
        }
        return new Matrix(newMatrix);
      }
    };

    var M = function (matrix) {
      _.extend(this, matrix);
    };
    _.extend(M.prototype, props);
    _.extend(M.prototype, methods);
    return new M(a);
  };

  var Identity = function(m) {
    var newMatrix = [];
    for (var i = 0; i < m; i++) {
      newMatrix[i] = [0];
      for (var j = 0; j < m; j++) {
        if (i === j) {
          newMatrix[i][j] = 1;
        } else {
          newMatrix[i][j] = 0;
        }
      }
    }
    return new Matrix(newMatrix);
  };

  var Random = function(m, n) {
    var newMatrix = [];
    for (var i = 0; i < m; i++) {
      newMatrix[i] = [0];
      for (var j = 0; j < m; j++) {
        newMatrix[i][j] = Math.random();
      }
    }
    return new Matrix(newMatrix);
  };

  module.exports = exports = {Matrix: Matrix, Identity: Identity, Random: Random};
})();