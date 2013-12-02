(function ($) {

    $.fn.amIRobot = function (options) {
        var i = 0,
            robots = [],
            settings = $.extend({
                robots: 100
            }, options);

        for (i = 0; i < settings.robots; i += 1) {
            var follow = i + 1;
            if (i === 99) {
                follow = 0;
            }

            var robot = new Robot(i);
            robot.respawn(i, i);
            robot.follow(follow);

            robots.push(robot);
        }

        console.log(robots);
    };

})(jQuery);