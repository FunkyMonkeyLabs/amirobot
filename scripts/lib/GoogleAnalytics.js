define(['jquery', 'google-analytics', 'module'], function ($, ga, module) {

  var self = {};

  self.trackPageView = function (uri) {
    // @todo check active ga/connection before each event
    ga('send', 'event', 'pageView', uri);
  };

  self.trackAction = function (type, description) {
    ga('send', 'event', type, description);
  };

  self.trackTiming = function (category, identifier, time) {
    time = time || new Date().getTime() - window.performance.timing.domComplete;
    ga('send', 'timing', category, identifier, time);
  };

  $(document).ready(function () {
    ga('create', module.config().id, module.config().domain);
    ga('send', 'pageview');
//    self.trackTiming('webapp', 'initialise');
  });

  return self;
});