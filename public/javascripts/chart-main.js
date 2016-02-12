var data = [];
var numberOfSeries = 2,
    numberOfDataPoint = 11;


window.onload = function() {

    drawMultiSinTime();
    drawMultiSinFreq();
    drawMultiSinFiltered();
    drawSimple();
    drawLineChart();
    drawSinCos();
    writeToConsole("szeva");

    function drawMultiSinTime() {
        d3.json("multi_sin_time", function(error, json) {
          if (error) return console.warn(error);
          displayCont(json, "multiSinTime");
        });
    }

    function drawMultiSinFreq() {
        d3.json("multi_sin_freq", function(error, json) {
          if (error) return console.warn(error);
          displayCont(json, "multiSinFreq");
        });
    }

    function drawMultiSinFiltered() {
        d3.json("multi_sin_filtered", function(error, json) {
          if (error) return console.warn(error);
          displayCont(json, "multiSinFiltered");
        });
    }

    function drawSimple() {
        d3.json("simple", function(error, json) {
          if (error) return console.warn(error);
          displayDiscrete(json, "simple");
        });
    }

    function drawLineChart() {
        for (var i = 0; i < numberOfSeries; ++i)
            data.push(d3.range(numberOfDataPoint).map(function (i) {
                return {x: i, y: randomData()};
            }));

        chart = lineChart()
            .svg(d3.select("svg#linechart"))
            .width(600)
            .height(500)
            .x(d3.scale.linear().domain([0, 10]))
            .y(d3.scale.linear().domain([0, 10]));

        data.forEach(function (series) {
            chart.addSeries(series);
        });

        chart.render();
    }

    function drawSinCos() {
        d3.json("sincos", function(error, json) {
            if (error) return console.warn(error);
            displayContMulti(json, "sinCos");
        });
    }

    function displayDiscrete(rawData, svgId) {
        var data = [];
        var chart = lineChart()
            .svg(d3.select("svg#" + svgId))
            .autoScale()
            .xAxisToZero()
            .noGrid();

        data.push(d3.range(rawData.length).map(function(i) {
            return {x: i, y: rawData[i]};
        }));

        chart.addSeries(data[0]);
        chart.render();
    }

    function displayCont(rawData, svgId) {
        var data = [];
        var chart = lineChart()
            .svg(d3.select("svg#" + svgId))
            .autoScale()
            .xAxisToZero()
            .noGrid()
            .noDots();

        data.push(d3.range(rawData.length).map(function(i) {
            return {x: i, y: rawData[i]};
        }));

        chart.addSeries(data[0]);
        chart.render();
    }

    function displayContMulti(rawData, svgId) {
        var data = [];
        var chart = lineChart()
            .svg(d3.select("svg#" + svgId))
            .autoScale()
            .xAxisToZero()
            .noGrid()
            .noDots();

        for (var i=0; i<rawData.length; i++) {
            data.push(d3.range(rawData[i].length).map(function(j) {
                return {x: j, y: rawData[i][j]};
            }));
            chart.addSeries(data[i]);
        }

        chart.render();
    }
}

function update() {
    for (var i = 0; i < data.length; ++i) {
        var series = data[i];
//        series.shift();
//        series.push({x: 0, y: randomData()});
        series.length = 0;
        for (var j = 0; j < numberOfDataPoint; ++j)
            series.push({x: j, y: randomData()});
    }

    chart.render();
}

function randomData() {
    return Math.random() * 9;
}
