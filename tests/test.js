var m = require('../');
var Matrix = m.Matrix;

describe('Matrix properties of [[1,2],[3,4]]', function() {
  var a = new m.Matrix([
    [1, 2],
    [3, 4]
  ]);
  describe('Matrix dimensions', function () {
    it('should be a 2x2 matrix', function() {
      a.rows.should.equal(2);
      a.columns.should.equal(2);
    });
  });
  describe('', function () {
    it('should contain the values 1,2,3,4', function() {
      a[0][0].should.equal(1);
      a[0][1].should.equal(2);
      a[1][0].should.equal(3);
      a[1][1].should.equal(4);
    });
  });
});

describe('Identity matrix existence', function () {
  var i2 = new m.Matrix([[1,0],[0,1]]);
  it('should be an identity matrix...', function() {
    var eye = new m.Identity(2);
    eye.equals(i2).should.be.ok;
  });
});

describe('Simple matrix operations', function () {
  var a = new m.Matrix([
    [1, 2],
    [3, 4]
  ]);
  describe('Multiply a matrix by a constant', function() {
    it('should multiply every element', function() {
      var b = a.times(2);
      b[0][0].should.equal(2);
      b[0][1].should.equal(4);
      b[1][0].should.equal(6);
      b[1][1].should.equal(8);
      b = a.times(2);
      b[0][0].should.equal(2);
      b[0][1].should.equal(4);
      b[1][0].should.equal(6);
      b[1][1].should.equal(8);
    });
  });
  describe('Multiply a matrix by a matrix of incompatible dimensions', function() {
    it('should throw an error', function() {
      var b = new m.Matrix([[1, 2, 3]]);
      (function() { a.times(b); }).should.throw();
    });
  });
  describe('Multiply a 2x2 matrix by a 2x1 matrix', function() {
    it('should return a 2x1 matrix', function() {
      var b = new m.Matrix([[2],[3]]);
      var c = a.times(b);
      c[0][0].should.equal(8);
      c[1][0].should.equal(18);
    });
  });
  describe('A + A = A*2', function() {
    it('should equal twice itself', function() {
      a.plus(a).equals(a.times(2)).should.be.ok;
    });
  });
  describe('The transpose of a', function() {
    it('should equal the transpose', function() {
      var a_T = new m.Matrix([[1,3],[2,4]]);
      a.transpose().equals(a_T).should.be.ok;
    });
  });
  describe('A copy of a', function() {
    it('should equal a', function() {
      a.copy().equals(a).should.be.ok;
    });
  });
  describe('Floating point', function() {
    it('should be rounded in equals()', function() {
      (new Matrix([[0.1]]))
        .plus(new Matrix([[0.2]]))
        .equals(new Matrix([[0.3]]))
        .should.be.ok;
    });
  });
});

describe('Hard matrix operations', function() {
  var a = new m.Matrix([[1,3,3],[1,4,3],[1,3,4]]);
  var c = new m.Matrix([[7,-3,-3],[-1,1,0],[-1,0,1]]); //inverse of a
  describe('Gauss-Jordan elimination inverse', function() {
    var a_inverse = a.inverse();
    it('should equal the inverse', function() {
      a_inverse.equals(c).should.be.ok;
    });
    it('should not change the original matrix', function() {
      a.equals(new m.Matrix([[1,3,3],[1,4,3],[1,3,4]])).should.be.ok;
    });
  });
  describe('Any random matrix', function() {
    it('the inverse times itself should equal the identity matrix', function() {
      for (var n = 1; n < 11; n++) {
        var newMatrix = [];
        for (var i = 0; i < n; i++) {
          newMatrix[i] = [];
          for (var j = 0; j < n; j++) {
            newMatrix[i][j] = Math.random()*10 - 5;
          }
        }
        var q = new Matrix(newMatrix);
      q.times(q.inverse()).equals(new m.Identity(n)).should.eql(true, 'failed for n = ' + n);
      }
    });
  });
  var b = new m.Matrix([[16],[18],[19]]);
  var x = new m.Matrix([[1],[2],[3]]);
  describe('Solving Ax=b', function() {
    describe('with dividedBy()', function() {
      var solution = b.dividedBy(a);
      it('should solve for x', function() {
        solution.equals(x).should.be.ok;
      });
      it('should not change a', function() {
        a.equals(new m.Matrix([[1,3,3],[1,4,3],[1,3,4]])).should.be.ok;
      });
      it('should not change b', function() {
        b.equals(new m.Matrix([[16],[18],[19]])).should.be.ok;
      });
    });
    describe('with solve()', function() {
      var solution = a.solve(b);
      it('should solve for x', function() {
        solution.equals(x).should.be.ok;
      });
      it('should not change a', function() {
        a.equals(new m.Matrix([[1,3,3],[1,4,3],[1,3,4]])).should.be.ok;
      });
      it('should not change b', function() {
        b.equals(new m.Matrix([[16],[18],[19]])).should.be.ok;
      });
    });
  });
  describe('Caching the inverse', function() {
    it('should provide performance improvements', function() {
      var r = m.Random(20, 20);
      var start = +new Date();
      r.inverse();
      var stop = +new Date();
      var firstCalc = stop - start;
      start = +new Date();
      r.inverse();
      stop = +new Date();
      var secondCalc = stop - start;
      secondCalc.should.not.be.above(firstCalc);
    });
  });
});