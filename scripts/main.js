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

requirejs(['jquery', 'underscore', 'Robot', 'Plane'],
    function($, _, Robot, Plane) {
        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        $.fn.amIRobot = function(options) {
            var settings = $.extend({
                    robots: 10,
                    width: window.innerWidth,
                    height: window.innerHeight
                }, options),
                sequence = _.range(settings.robots),
                followersSequence = _.shuffle(sequence),
                robots = [],
                i,
                plane;

            // generate robots
            for (i = 0; i < settings.robots; i += 1) {
                var robot = new Robot(i);
                robot.respawn(_.random(0, settings.width), _.random(0, settings.height));
                robot.captivate(followersSequence[i]);
                robot.limit(settings.width, settings.height);
                robots.push(robot);
            }

            plane = new Plane('robotsPlane', settings.width, settings.height);

            for (i in robots) {
                robots[i].draw(plane.context);
            }

            plane.animate(robots);

        };

        $(document).ready(function() {
            $("body").amIRobot({
                robots: 100
            });
        });
    }
);