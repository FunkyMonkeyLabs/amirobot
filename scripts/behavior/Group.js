define(['Collision'], function (Collision) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Group = function (robot) {
    this.robot = robot;
    this.robot.step = 2;
  };

  Group.prototype.follow = function () {
    if (this.robot.followed === undefined) {
      throw new Error("There's no one to follow");
    }

    var followedPosition = this.robot.followed.getPosition(),
      robotPosition = this.robot.getPosition(),
      collision = new Collision(robotPosition, followedPosition);

    if (collision.isClose(this.robot.step + 1) === true) {
      this.robot.followed.block();
    }

    // follow the rabbit
    if (robotPosition.x > followedPosition.x) {
      this.robot.moveLeft();
    } else if (robotPosition.x < followedPosition.x) {
      this.robot.moveRight();
    }

    if (robotPosition.y > followedPosition.y) {
      this.robot.moveTop();
    } else if (robotPosition.y < followedPosition.y) {
      this.robot.moveBottom();
    }
  };

  Group.prototype.behave = function () {
    if (this.follow() === true) {
      return;
    }
    return this.follow();
  };

  return Group;
});
