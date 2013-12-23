define([], function() {
    'use strict';

    var Follower = function(robot) {
        this.robot = robot;
    };

    Follower.prototype.behave = function() {
        this.robot.follow();
    };

    return Follower;
});
