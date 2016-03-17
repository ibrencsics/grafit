define(["underscore", "jquery"], function(_, $) {
    // Underscore template for each row
    var rowTemplate = _.template("<tr>" +
        "<td><%= name %></td>" +
        "<td><%= language %></td>" +
        "<td><%= size %></td>" +
        "</tr>") ;

    // template for the table
    var repoTable = _.template(
        "<table id='repo-table' class='table'>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th><th>Language</th><th>Size</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<%= tbody %>" +
        "</tbody>" +
        "</table>") ;

    // Builds a table for a model
    function build(model, divName) {
        var tbody = "" ;

        _.each(model.repos, function(repo) {
            tbody += rowTemplate(repo) ;
        }) ;

        var table = repoTable({tbody: tbody}) ;
        $(divName).html(table) ;
    }

    return { "build": build } ;
}) ;