define([], function() {
    'use strict';

    var UpAndDown = function(robot) {
        this.robot = robot;
    };

    UpAndDown.prototype.behave = function() {
        if (this.robot.position.y <= 0 || this.robot.position.y >= this.robot.limits.y) {
            this.robot.step = -this.robot.step;
        }
        this.robot.moveBottom();
    };

    return UpAndDown;
});
