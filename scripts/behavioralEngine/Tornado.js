define(['underscore'], function(_) {
    'use strict';

    var Tornado = function(robot) {
        this.robot = robot;
    };

    Tornado.prototype.behave = function() {
        if (_.random(0, 4)) {
            this.robot.follow();
            this.robot.step = 4;
        } else {
            this.robot.step = 1;
            if (this.robot.position.y >= this.robot.limits.y || this.robot.position.y <= 0) {
                this.robot.position.y = 0;
                this.robot.position.x = _.random(0, this.robot.limits.x);
            }
            this.robot.moveBottom();
        }
    };

    return Tornado;
});
