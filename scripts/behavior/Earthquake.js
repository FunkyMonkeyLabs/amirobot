define(['underscore', 'Collision'], function (_, Collision) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Earthquake = function (robot) {
    this.robot = robot;
    this.counter = 0;
  };

  Earthquake.prototype.behave = function () {
//    console.log(this.robot.followed);
    var followedPosition = this.robot.followed.position,
      position = {
        x: this.robot.position.x,
        y: this.robot.position.y
      },
      collision = new Collision(this.robot.position, followedPosition);

    if (collision.isClose(this.robot.step + 1) === true) {
      this.robot.followed.block();
    }

    this.quake(followedPosition);
    this.fall();
  };

  Earthquake.prototype.fall = function () {
    this.robot.step = 5;
    this.robot.moveBottom();
  };

  Earthquake.prototype.follow = function(followedPosition, position) {
    this.robot.step = 2;
    if (position.x > followedPosition.x) {
      this.robot.moveLeft();
    } else if (position.x < followedPosition.x) {
      this.robot.moveRight();
    }
  };

  Earthquake.prototype.quake = function (followedPosition) {
    if ((new Date()).getSeconds() % 10 === 0) {
      this.robot.step = _.random(0, (this.robot.limits.y/30));
      var position = {
        x: this.robot.position.x,
        y: this.robot.position.y
      };
      if (this.robot.id == 1 ) {
        console.log(position.y, this.robot.step, this.robot.limits.y);
      }
      this.robot.moveTop();
      this.follow(followedPosition, position);

      this.fall();
    }
  };

  return Earthquake;
});
