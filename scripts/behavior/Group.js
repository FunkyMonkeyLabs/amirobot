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

    var followedPosition = this.robot.followed.position,
      collision = new Collision(this.robot.position, followedPosition);

    if (collision.isClose(this.robot.step + 1) === true) {
      this.robot.followed.block();
    }

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
  };

  Group.prototype.behave = function () {
    if (this.follow() === true) {
      return;
    }
    return this.follow();
  };

  return Group;
});
