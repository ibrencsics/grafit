define(["underscore", "d3", "nvd3"], function(_, d3, nv) {

    // Aggregate the repo size by language.
    // Returns an array of objects like:
    // [ { label: "Scala", size: 1245},
    // { label: "Python", size: 432 } ]

    function generateDataFromModel(model) {

        // Build an initial object mapping each
        // language to the repositories written in it
        var language2Repos = _.groupBy(model.repos, function(repo) { return repo.language ; }) ;

        // Map each { "language": [ list of repos ], ...}
        // pairs to a single document { "language": totalSize }
        // where totalSize is the sum of the individual repos.
        var plotObjects = _.map(
            language2Repos,
            function(repos, language) {
                var sizes = _.map(repos, function(repo) {
                    return repo.size;
                });
                // Sum over the sizes using 'reduce'
                var totalSize = _.reduce(sizes, function(memo, size) { return memo + size; }, 0) ;

                return { label: language, size: totalSize } ;
            }
        ) ;

        return plotObjects;
    }

    // Build the chart.
    function build(model, divName) {
        var transformedModel = generateDataFromModel(model) ;

        nv.addGraph(function() {
            var height = 350;
            var width = 350;
            var chart = nv.models.pieChart()
                .x(function (d) { return d.label ; })
                .y(function (d) { return d.size ;})
                .width(width)
                .height(height) ;

            d3.select(divName).append("svg")
                .datum(transformedModel)
                .transition()
                .duration(350)
                .attr('width', width)
                .attr('height', height)
                .call(chart) ;

            return chart ;
        });
    }

    return { "build" : build } ;
});