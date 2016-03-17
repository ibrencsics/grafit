define(["jquery", "events", "model"], function($, events, model) {

    function initialize() {
        $("#user-selection").change(function() {
            var user = $("#user-selection").val() ;

            console.log("Fetching information for " + user) ;

            // Change cursor to a 'wait' symbol
            // while we wait for the API to respond
            $("*").css({"cursor": "wait"}) ;

            $.getJSON("/api/repos/" + user, function(data) {
                // Executed on success
                model.exists = true ;
                model.repos = data ;
            }).fail(function() {
                // Executed on failure
                model.exists = false ;
                model.repos = [] ;
            }).always(function() {

            // Always executed
            model.ghubUser = user ;
            // Restore cursor
            $("*").css({"cursor": "initial"}) ;
            // Tell the rest of the application
            // that the model has been updated.
            events.trigger("model_updated") ;
            });
        }) ;
    } ;

    return { "initialize": initialize };
});