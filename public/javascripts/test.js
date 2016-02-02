var chart, chart2, chart3;

var numberOfSeries = 2,
    numberOfDataPoint = 11,
    data = [],
    data2 = [],
    data3 = [];


window.onload = function() {

    drawDft();
    drawSimple();
    drawLineChart();

    function drawSimple() {
        d3.json("simple", function(error, json) {
          if (error) return console.warn(error);
          displaySimple(json);
        });
    }

    function drawDft() {
        d3.json("dft", function(error, json) {
          if (error) return console.warn(error);
          displayDft(json);
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

    function displaySimple(rawData) {
        chart2 = lineChart()
            .svg(d3.select("svg#simple"))
            .autoScale()
            .xAxisToZero()
            .noGrid();

        data2.push(d3.range(rawData.length).map(function(i) {
            return {x: i, y: rawData[i]};
        }));

        chart2.addSeries(data2[0]);

        chart2.render();
    }

    function displayDft(rawData) {
            chart3 = lineChart()
                .svg(d3.select("svg#dft"))
                .autoScale()
                .xAxisToZero()
                .noGrid()
                .noDots();

            data3.push(d3.range(rawData.length).map(function(i) {
                return {x: i, y: rawData[i]};
            }));

            chart3.addSeries(data3[0]);

            chart3.render();
        }

    function displaySimple_(data) {
        var svg = d3.select("svg#simple");

        var width = svg.style("width").replace("px", ""),
            height = svg.style("height").replace("px", ""),
            margin = 50;

        var yExtent = d3.extent(data);

        var xScale = d3.scale.linear()
            .domain([0, data.length])
            .range([margin, width - margin]);

        var yScale = d3.scale.linear()
            .domain(yExtent)
            .range([height - margin, margin]);

        render("cardinal");
        renderDots(svg);
        renderAxes(svg, width, height, margin, yExtent, yScale);

        function render(mode){
            var line = d3.svg.line()
                .interpolate(mode) // <-A
                .x(function(d,i){return xScale(i);})
                .y(function(d){return yScale(d);});

            svg.selectAll("path.line")
                .data([data])
                .enter()
                .append("path")
                .attr("class", "line");

            svg.selectAll("path.line")
                .data([data])
                .attr("d", function(d){return line(d);});

            var area = d3.svg.area()
                .interpolate(mode) // <-B
                .x(function(d,i) { return xScale(i); })
                .y0(yScale(0))
                .y1(function(d) { return yScale(d); });

            svg.selectAll("path.area")
                .data([data])
                .enter()
                .append("path")
                .attr("class", "area")

            svg.selectAll("path.area")
                .data([data])
                .attr("d", function(d){return area(d);});
        }

        function renderDots(svg){
             svg.append("g").selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", function(d, i) { return xScale(i); })
                .attr("cy", function(d) { return yScale(d); })
                .attr("r", 4.5);
        }
    }

    function displayDft_(data) {

        var svg = d3.select("svg#dft");

        var width = svg.style("width").replace("px", ""),
            height = svg.style("height").replace("px", ""),
            margin = 50;

        var yExtent = d3.extent(data); // [-5, 5]

        var xScale = d3.scale.linear()
            .domain([0, data.length])
            .range([margin, width - margin]);

        var yScale = d3.scale.linear()
            .domain(yExtent)
            .range([height - margin, margin]);

        // line

        var line = d3.svg.line()
            .x(function(d, i){ return xScale(i); })
            .y(function(d){ return yScale(d); })

        svg.selectAll("path")
            .data([data])
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", function(d){ return line(d); });

        // area

        var area = d3.svg.area()
            .x(function(d, i) { return xScale(i); })
            .y0(yScale(0)) // yStart()
            .y1(function(d) { return yScale(d); });

        svg.selectAll("path.area")
            .data([data])
            .enter()
            .append("path")
            .attr("class", "area")
            .attr("d", function(d){ return area(d); });

        renderAxes(svg, width, height, margin, yExtent, yScale);
    }

    function renderAxes(svg, width, height, margin, yExtent, yScale) {
        var xAxis = d3.svg.axis()
                .scale(d3.scale.linear().range([0, quadrantWidth()]))
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(d3.scale.linear().domain(yExtent).range([quadrantHeight(), 0]))
                .orient("left");

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", function(){
                return "translate(" + xStart() + "," + yStart() + ")";
            })
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", function(){
                return "translate(" + xStart() + "," + yEnd() + ")";
            })
            .call(yAxis);

        function xStart(){
            return margin;
        }

        function yStart(){
            return yScale(0); // height / 2; // height - margin
        }

        function xEnd(){
            return width - margin;
        }

        function yEnd(){
            return margin;
        }

        function quadrantWidth(){
            return width - 2 * margin;
        }

        function quadrantHeight(){
            return height - 2 * margin;
        }
    }
}


function lineChart() { // <-1A
    var _chart = {};

    var _width = 600, _height = 300, // <-1B
            _margins = {top: 30, left: 30, right: 30, bottom: 30},
            _x, _y,
            _data = [],
            _colors = d3.scale.category10(),
            _svg,
            _bodyG,
            _line,
            _firstRender = true,
            _withDots = true,
            _autoScale = false,
            _x_axis_to_zero = false,
            _withGrid = true;

    _chart.render = function () { // <-2A
        if (!_svg) {
            _svg = d3.select("body").append("svg") // <-2B
                .attr("height", _height)
                .attr("width", _width);
        } else {
            _width = _svg.style("width").replace("px", "");
            _height = _svg.style("height").replace("px", "");
        }

        if (_autoScale) {
            var maxX = d3.max(_data, function(d) { return d.length; })
            _x = d3.scale.linear().domain([0, maxX]);

            var maxY = d3.max(_data, function(d) { return d3.max(d, function(dd){ return dd.y }); });
            var minY = d3.min(_data, function(d) { return d3.min(d, function(dd){ return dd.y }); });
            var domMaxY = maxY > 0 ? maxY * 1.1 : maxY * 0.9;
            var domMinY = minY > 0 ? minY * 0.9 : minY * 1.1;
            _y = d3.scale.linear().domain([domMinY, domMaxY]);
        }

        if (_firstRender) {
            renderAxes(_svg);
            defineBodyClip(_svg);

            _firstRender = false;
        }

        renderBody(_svg);
    };

    function renderAxes(svg) {
        var axesG = svg.append("g").attr("class", "axes");

        renderXAxis(axesG);
        renderYAxis(axesG);
    }

    function renderXAxis(axesG){
        var xAxis = d3.svg.axis()
                .scale(_x.range([0, quadrantWidth()]))
                .orient("bottom");

        yStartFinal = _x_axis_to_zero ? yStartZero() : yStart();

        axesG.append("g")
                .attr("class", "x axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yStartFinal + ")";
                })
                .call(xAxis);

        if (_withGrid) {
            y1 = _x_axis_to_zero ? zeroPos() : 0;
            y2 = _x_axis_to_zero ? zeroPos() - quadrantHeight() : -quadrantHeight();

            d3.selectAll("g.x g.tick")
                .append("line")
                    .classed("grid-line", true)
                    .attr("x1", 0)
                    .attr("y1", y1)
                    .attr("x2", 0)
                    .attr("y2", y2);
        }
    }

    function renderYAxis(axesG){
        var yAxis = d3.svg.axis()
                .scale(_y.range([quadrantHeight(), 0]))
                .orient("left");

        axesG.append("g")
                .attr("class", "y axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yEnd() + ")";
                })
                .call(yAxis);

        if (_withGrid) {
            d3.selectAll("g.y g.tick")
                .append("line")
                    .classed("grid-line", true)
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", quadrantWidth())
                    .attr("y2", 0);
        }
    }

    function defineBodyClip(svg) { // <-2C
        var padding = 5;

        svg.append("defs")
                .append("clipPath")
                .attr("id", "body-clip")
                .append("rect")
                .attr("x", 0 - padding)
                .attr("y", 0)
                .attr("width", quadrantWidth() + 2 * padding)
                .attr("height", quadrantHeight());
    }

    function renderBody(svg) { // <-2D
        if (!_bodyG)
            _bodyG = svg.append("g")
                    .attr("class", "body")
                    .attr("transform", "translate("
                        + xStart() + ","
                        + yEnd() + ")") // <-2E
                    .attr("clip-path", "url(#body-clip)");

        renderLines();

        if (_withDots) {
            renderDots();
        }

    }

    function renderLines() {
        _line = d3.svg.line() //<-4A
            .x(function (d) { return _x(d.x); })
            .y(function (d) { return _y(d.y); });

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter() //<-4B
            .append("path")
            .style("stroke", function (d, i) {
                return _colors(i); //<-4C
            })
            .attr("class", "line");

        _bodyG.selectAll("path.line")
            .data(_data)
            .transition() //<-4D
            .attr("d", function (d) { return _line(d); });
    }

    function renderDots() {
        _data.forEach(function (list, i) {
            _bodyG.selectAll("circle._" + i) //<-4E
                .data(list)
                .enter()
                .append("circle")
                .attr("class", "dot _" + i);

            _bodyG.selectAll("circle._" + i)
                .data(list)
                .style("stroke", function (d) {
                    return _colors(i); //<-4F
                })
                .transition() //<-4G
                .attr("cx", function (d) { return _x(d.x); })
                .attr("cy", function (d) { return _y(d.y); })
                .attr("r", 4.5);
        });
    }

    function xStart() {
        return _margins.left;
    }

    function yStart() {
        return _height - _margins.bottom;
    }

    function zeroPos() {
        return quadrantHeight() * _y(0);
    }

    function yStartZero() {
        return yStart() - zeroPos();
    }

    function xEnd() {
        return _width - _margins.right;
    }

    function yEnd() {
        return _margins.top;
    }

    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }

    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom;
    }

    _chart.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return _chart;
    };

    _chart.height = function (h) { // <-1C
        if (!arguments.length) return _height;
        _height = h;
        return _chart;
    };

    _chart.margins = function (m) {
        if (!arguments.length) return _margins;
        _margins = m;
        return _chart;
    };

    _chart.colors = function (c) {
        if (!arguments.length) return _colors;
        _colors = c;
        return _chart;
    };

    _chart.x = function (x) {
        if (!arguments.length) return _x;
        _x = x;
        return _chart;
    };

    _chart.y = function (y) {
        if (!arguments.length) return _y;
        _y = y;
        return _chart;
    };

    _chart.addSeries = function (series) { // <-1D
        _data.push(series);
        return _chart;
    };

    _chart.svg = function (svg) {
        if (!arguments.length) return _svg;
        _svg = svg;
        return _chart;
    }

    _chart.noDots = function() {
        _withDots = false;
        return _chart;
    }

    _chart.autoScale = function() {
        _autoScale = true;
        return _chart;
    }

    _chart.xAxisToZero = function() {
        _x_axis_to_zero = true;
        return _chart;
    }

    _chart.noGrid = function() {
        _withGrid = false;
        return _chart;
    }

    return _chart; // <-1E
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
