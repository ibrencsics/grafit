package controllers

import org.scalaml.core.XTSeries
import org.scalaml.filtering.DFT
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

  def multiSin: Array[Double] = {
    val _T= 1.0/1024
    val h = (x:Double) => 2.0*Math.cos(2.0*Math.PI*_T*x) + Math.cos(5.0*Math.PI*_T*x) + Math.cos(15.0*Math.PI*_T*x)/3
    Array.tabulate(1025)(h(_))
  }

  def simple = Action {
    Ok(Json.toJson(Array(15, 50, 22, -8, 85, 10, 54, 67, 12)))
  }
}
