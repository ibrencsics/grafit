package controllers

import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

class DFTController extends Controller {

  def multisin = Action {

    val _T= 1.0/1024
    val h = (x:Double) => 2.0*Math.cos(2.0*Math.PI*_T*x) + Math.cos(5.0*Math.PI*_T*x) + Math.cos(15.0*Math.PI*_T*x)/3
    val values = Array.tabulate(1025)(h(_))

    Ok(Json.toJson(values))
  }

  def simple = Action {
    Ok(Json.toJson(Array(15, 50, 22, -8, 85, 10, 54, 67, 12)))
  }
}
