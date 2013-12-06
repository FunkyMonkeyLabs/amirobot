var robots = []
    followers = []
    loopId = null
    loopCounter = 0,
    generateFollower = function(max) {
        var follow = Math.floor(Math.random() * max);
        if (followers.indexOf(follow) > -1 || isNaN(follow)) {
            follow = generateFollower(max);
        }

        followers.push(follow);
        return follow;
    };

(function ($) {

    $.fn.amIRobot = function (options) {
        var i = 0,
            settings = $.extend({
                robots: 100,
                width: window.innerWidth,
                height: window.innerHeight
            }, options);

        loopCounter = settings.robots;
        for (i = 0; i < settings.robots; i += 1) {
            var follow = generateFollower(settings.robots);

            var robot = new Robot(i);
            robot.respawn((Math.floor(Math.random() * settings.width) + 1), (Math.floor(Math.random() * settings.height) + 1));
            robot.captivate(follow);
            robot.bind($(this));
            robot.limit(settings.width, settings.height);
            robot.draw();

            robots.push(robot);
        }

        loopId = setInterval(function(){
            for(var i = 0; i < robots.length; i++) {
                var robot = robots[i];
                robot.follow();
            }
        },10);

    };

})(jQuery);