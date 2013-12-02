(function ($) {

    $.fn.amIRobot = function (options) {
        var i = 0,
            robots = [],
            settings = $.extend({
                robots: 100,
                width: 500,
                height: 500
            }, options);

        for (i = 0; i < settings.robots; i += 1) {
            var follow = i + 1;
            if (i === 99) {
                follow = 0;
            }

            var robot = new Robot(i);
            robot.respawn((Math.floor(Math.random() * settings.width) + 1), (Math.floor(Math.random() * settings.height) + 1));
            robot.follow(follow);

            robots.push(robot);
        }

        console.log(robots);
    };

})(jQuery);