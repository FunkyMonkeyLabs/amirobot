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
    var followedPosition = this.robot.followed.position,
      collision = new Collision(this.robot.position, followedPosition);

    if (collision.isClose(this.robot.step + 1) === true) {
      this.robot.followed.block();
    }

    this.quake(followedPosition);

    if (undefined === this.gravityBehavior) {
      this.gravityBehavior = new Gravity(this.robot);
    }

    this.gravityBehavior.behave();
  };

  Earthquake.prototype.fall = function () {
    this.robot.step = 5;
    this.robot.moveBottom();
  };

  Earthquake.prototype.follow = function (followedPosition, position) {
    this.robot.step = 2;
    if (position.x > followedPosition.x) {
      this.robot.moveLeft();
    } else if (position.x < followedPosition.x) {
      this.robot.moveRight();
    }
  };

  Earthquake.prototype.quake = function (followedPosition) {
    if ((new Date()).getSeconds() % 5 === 0) {
      this.robot.step = _.random(0, this.robot.limits.y / 25);
      var position = {
        x: this.robot.position.x,
        y: this.robot.position.y
      };

      this.robot.moveTop();
      this.follow(followedPosition, position);

      this.fall();
      this.gravityBehavior = undefined;
    }
  };

  return Earthquake;
});
