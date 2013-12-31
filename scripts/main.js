requirejs.config({
  baseUrl: 'scripts/lib',
  paths: {
    'underscore': '../vendor/underscore',
    'jquery': '../vendor/jquery-1.10.2.min',
    'url': '../vendor/url'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    }
  }
});

window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

requirejs(['jquery', 'underscore', 'Plane', 'Robot', 'BehaviorManager', 'url'],
  function ($, _, Plane, Robot, BM, url) {
    'use strict';

    var type = 'assassin';
    if (url.parse(document.location.href).get !== undefined
      && url.parse(document.location.href).get.type !== undefined) {
      type = url.parse(document.location.href).get.type;
    }
    $.fn.amIRobot = function (options) {
      var settings = $.extend({
          robots: 100,
          width: window.innerWidth,
          height: window.innerHeight,
          engine: BM.behaviors[type]
        }, options),
        robots = [],
        robot,
        plane,
        i;

      for (i = 0; i < settings.robots; i += 1) {
        robot = new Robot(i);
        robot.setLimits(settings.width, settings.height);
        robot.setBehavior(settings.engine);
        robot.respawn();
        robots.push(robot);
      }

      for (i = 0; i < settings.robots; i += 1) {
        robots[i].captivate(robots[(i + 1) % settings.robots]);
      }

      plane = new Plane(this, settings.width, settings.height);
      plane.setRobots(robots);
      plane.animate();
    };


    $("#robotsPlane").amIRobot({
      robots: 1000
    });
  }
);
