name := """grafit"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  specs2 % Test,
  "org.apache.commons" % "commons-math3" % "3.3",

  "log4j" % "log4j" % "1.2.17",

  "org.scalanlp" %% "breeze" % "0.12",
  "org.scalanlp" %% "breeze-viz" % "0.12",
  "org.scalanlp" %% "breeze-natives" % "0.12",

  "org.webjars" % "requirejs" % "2.1.22",
  "org.webjars" % "jquery" % "2.1.4",
  "org.webjars" % "underscorejs" % "1.8.3",
  "org.webjars" % "nvd3" % "1.8.1",
  "org.webjars" % "d3js" % "3.5.6",
  "org.webjars" % "bootstrap" % "3.3.6",
  "org.webjars" % "three.js" % "r74",

  "junit" % "junit" % "4.12" % Test
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accmainesses its actions statically.
routesGenerator := InjectedRoutesGenerator

pipelineStages := Seq(rjs)