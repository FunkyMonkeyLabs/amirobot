var shuffle = function (array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter--) {
            // Pick a random index
            index = (Math.random() * counter) | 0;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    },
    generateFollowers = function (max) {
        var i,
            followersSequence = [];
        for (i = 0; i < max; ++i) {
            followersSequence.push(i);
        }

        return shuffle(followersSequence);
    },
    getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

(function ($) {
    $.fn.amIRobot = function (options) {
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

        var settings = $.extend({
                robots: 100,
                width: window.innerWidth,
                height: window.innerHeight
            }, options),
            followersSequence = generateFollowers(settings.robots),
            robots = [],
            i,
            plane;

        // generate robots
        for (i = 0; i < settings.robots; i += 1) {
            var robot = new Robot(i);
            robot.respawn(getRandom(0, settings.width), getRandom(0, settings.height));
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

})(jQuery);