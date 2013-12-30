define(['Collision'], function(Collision) {
    'use strict';

    /**
     * @param {Robot} robot
     * @constructor
     */
    var Follower = function(robot) {
        this.robot = robot;
    };

    Follower.prototype.follow = function() {
        if (this.robot.followed === undefined) {
            throw new Error("There's no one to follow");
        }

        var followedPosition = this.robot.followed.position,
            collision = new Collision(this.robot.position, followedPosition);

        // follow the rabbit
        if (this.robot.position.x > followedPosition.x) {
            this.robot.moveLeft();
        } else if (this.robot.position.x < followedPosition.x) {
            this.robot.moveRight();
        }

        if (this.robot.position.y > followedPosition.y) {
            this.robot.moveTop();
        } else if (this.robot.position.y < followedPosition.y) {
            this.robot.moveBottom();
        }

        return collision.isClose(0);
    };

    Follower.prototype.behave = function() {
        return this.follow();
    };

    return Follower;
});
