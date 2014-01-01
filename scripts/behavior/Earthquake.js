define(['underscore', 'Collision', '../behavior/Gravity'], function (_, Collision, Gravity) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Earthquake = function (robot) {
    this.robot = robot;
    this.gravityBehavior = new Gravity(this.robot);
  };

  Earthquake.prototype.behave = function () {
    var followedPosition = this.robot.followed.getPosition(),
      robotPosition = this.robot.getPosition(),
      collision = new Collision(robotPosition, followedPosition);

    if (collision.isClose(this.robot.step + 1) === true) {
      this.robot.followed.block();
    }

    this.quake(followedPosition);
    this.gravityBehavior.behave();
  };

  Earthquake.prototype.fall = function () {
    this.robot.step = 5;
    this.robot.moveBottom();
  };

  Earthquake.prototype.follow = function (followedPosition, position) {
    if (position.x > followedPosition.x) {
      this.robot.moveLeft(2);
    } else if (position.x < followedPosition.x) {
      this.robot.moveRight(2);
    }
  };

  Earthquake.prototype.quake = function (followedPosition) {
    if ((new Date()).getSeconds() % 5 === 0) {
      this.robot.step = _.random(0, this.robot.limits.y / 25);
      var robotPosition = this.robot.getPosition();

      this.robot.moveTop();
      this.follow(followedPosition, robotPosition);

      this.fall();
      this.gravityBehavior.resetTime();
    }
  };

  return Earthquake;
});
