define([], function() {
    'use strict';

    /**
     * @param {Robot} robot
     * @constructor
     */
    var Follower = function(robot) {
        this.robot = robot;
    };

    Follower.prototype.behave = function() {
        this.robot.follow();
    };

    return Follower;
});
