define(["jquery"], function($) {

    var bus = $(window) ; // widget to use as an event bus

    function trigger(eventType) {
        $(bus).trigger(eventType) ;
    }

    function on(eventType, f) {
        $(bus).on(eventType, f) ;
    }

    return {
        "trigger": trigger,
        "on": on
    } ;
});