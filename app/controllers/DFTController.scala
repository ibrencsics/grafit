package controllers

import org.scalaml.core.XTSeries
import org.scalaml.filtering.{DTransform, DFTFir, DFT}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

class DFTController extends Controller {

  def multiSinTime = Action {
    Ok(Json.toJson(multiSin))
  }

  def multiSinFreq = Action {
    val f = DFT[Double] |> XTSeries[Double](multiSin)
    Ok(Json.toJson(f.toArray.take(50)))
  }

  def multiSinFiltered = Action {
    import DTransform._
    val y = new DFTFir[Double](sinc, 7.0 / 1024) |> XTSeries[Double](multiSin)
    Ok(Json.toJson(y.toArray))
  }

  def multiSin: Array[Double] = {
    val _T = 1.0/1024
    val h = (x:Double) => 2.0*Math.cos(2.0*Math.PI*_T*x) + Math.cos(5.0*Math.PI*_T*x) + Math.cos(15.0*Math.PI*_T*x)/3
    Array.tabulate(1025)(h(_))
  }

  def sinCos = Action {
    val sin = sample((x:Double, T: Double) => Math.sin(Math.PI * T * x))
    val cos = sample((x:Double, T: Double) => Math.cos(Math.PI * T * x))
    val sqrt = sample((x:Double, T: Double) => Math.sqrt(Math.PI * T * x))

    Ok(Json.toJson( Array(sin,cos,sqrt) ))
  }

  def sample(func:(Double, Double) => Double): Array[Double] = {
    val T = 1.0 / 256
    Array.tabulate(1025)(func(_, T))
  }

  def simple = Action {
    Ok(Json.toJson(Array(15, 50, 22, -8, 85, 10, 54, 67, 12)))
  }
}
