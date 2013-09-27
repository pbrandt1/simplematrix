var m = require('../');

describe('Matrix properties of [[1,2],[3,4]]', function() {
  var a = new m.Matrix([
    [1, 2],
    [3, 4]
  ]);
  describe('Matrix dimensions', function () {
    it('should be a 2x2 matrix', function() {
      a.m.should.equal(2);
      a.n.should.equal(2);
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

/*
describe('Matrix equality', function () {
  var a = new m.Matrix([
    [1, 2],
    [3, 4]
  ]);
  var b = new m.Matrix([
    [1, 2],
    [3, 4]
  ]);
  ok(a == b);
  ok(a === b);
});
*/
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
      b = a.multiply(2);
      b[0][0].should.equal(2);
      b[0][1].should.equal(4);
      b[1][0].should.equal(6);
      b[1][1].should.equal(8);
    });
  });
  describe('Multiply a matrix by a matrix of incompatible dimensions', function() {
    it('should throw an error', function() {
      var b = new m.Matrix([[1, 2, 3]]);
      (function() { a.multiply(b); }).should.throw();
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
});

/*

describe('incompatible dimensions throws error in add', function () {
  var a = new m.Matrix([
    [1, 2]
  ]);
  var b = new m.Matrix([
    [1]
  ]);
  // uh i forget how to do this
  expectException(a + b);
})

describe('2x1 matrix operations', function () {
  var a = new m.Matrix([
    [1],
    [2]
  ]);
  var b = new m.Matrix([
    [3],
    [4]
  ]);
  ok(a + b);
  ok(a + b == new m.Matrix([
    [3],
    [6]
  ]));
})
  */
