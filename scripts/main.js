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

requirejs(['jquery', 'underscore', 'Plane', 'Robot', 'BehaviorManager'],
    function($, _, Plane, Robot, BM) {
        'use strict';

        $.fn.amIRobot = function(options) {
            var settings = $.extend({
                    robots: 100,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    engine: BM.behaviors.TORNADO
                }, options),
                robots = [],
                robot,
                plane,
                i;

            for (i = 0; i < settings.robots; i += 1) {
                robot = new Robot(i);
                robot.setLimits(settings.width, settings.height);
                robot.setBehavioralEngine(settings.engine);
                robot.respawn();
                robots.push(robot);
            }

            for (i = 0; i < settings.robots; i += 1) {
                robots[i].captivate(robots[(i + 1) % settings.robots]);
            }

            plane = new Plane('robotsPlane', settings.width, settings.height);
            plane.setRobots(robots);
            plane.animate();
        };


        $("body").amIRobot({
            robots: 5000
        });
    }
);