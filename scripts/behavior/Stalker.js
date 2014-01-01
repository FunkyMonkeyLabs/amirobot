define(['Collision'], function (Collision) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Stalker = function (robot) {
    this.robot = robot;
    this.robot.step = 2;
  };

  Stalker.prototype.follow = function () {
    if (this.robot.followed === undefined) {
      throw new Error("There's no one to follow");
    }

    var followedPosition = this.robot.followed.getPosition(),
      robotPosition = this.robot.getPosition(),
      collision = new Collision(this.robot.getPosition(), followedPosition);

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

    return collision.isClose(0);
  };

  Stalker.prototype.behave = function () {
    return this.follow();
  };

  return Stalker;
});
