requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        'underscore': '../vendor/underscore',
        'jquery': '../vendor/jquery-1.10.2.min'
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

window.requestAnimFrame = (function(callback) {
    'use strict';

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

requirejs(['jquery', 'underscore', 'Robot', 'Plane'],
    function($, _, Robot, Plane) {
        'use strict';

        $.fn.amIRobot = function(options) {
            var settings = $.extend({
                    robots: 100,
                    width: window.innerWidth,
                    height: window.innerHeight
                }, options),
                robots = [],
                robot,
                plane,
                i;

            // generate robots
            for (i = 0; i < settings.robots; i += 1) {
                robot = new Robot(i);
                robot.setLimits(settings.width, settings.height);
                robots.push(robot);
            }

            for (i = 0; i < settings.robots; i += 1) {
                robots[i].respawn();
                robots[i].captivate(robots[(i + 1) % settings.robots]);
            }

            plane = new Plane('robotsPlane', settings.width, settings.height);
            plane.setRobots(robots);
            plane.animate();
        };

        $("body").amIRobot({
            robots: 1000
        });
    }
);