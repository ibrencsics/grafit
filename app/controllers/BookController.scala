package controllers

import play.api.mvc.{Action, Controller}

class BookController extends Controller {

  def hello(name:String) = Action { request =>
    val title = request.getQueryString("title")
    val titleString = title.map { _ + " " }.getOrElse("")
    Ok(s"Hello, $titleString$name")
  }

  def helloPost = Action(parse.text) { request =>
    Ok("Hello. You told me: " + request.body)
  }
}
