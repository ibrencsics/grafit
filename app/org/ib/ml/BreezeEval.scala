package org.ib.ml

import breeze.linalg._

class BreezeEval {

  final def eval() = {
    val v = DenseVector(1.0, 2.0, 3.0)
    println(s"v = $v")
    println(s"v :* 2 = ${v :* 2.0}")
    println(s"v :+ DenseVector(4.0, 5.0, 6.0) = ${v :+ DenseVector(4.0, 5.0, 6.0)}")

    val v2 = DenseVector(4.0, 5.0, 6.0)
    println(s"v2 = $v2")
    println(s"v dot v2 = ${v dot v2}")

    val m = DenseMatrix((2.0, 0.0, 0.0), (0.0, 2.0, 0.0), (0.0, 0.0, 2.0))
    println(s"m = \n$m")
    println(s"det(m) = ${det(m)}")
  }
}
