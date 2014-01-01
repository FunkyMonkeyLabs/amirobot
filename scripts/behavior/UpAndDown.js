define([], function () {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var UpAndDown = function (robot) {
    this.robot = robot;
  };

  UpAndDown.prototype.behave = function () {
    var robotPosition = this.robot.getPosition();
    if (robotPosition.y <= 0 || robotPosition.y >= this.robot.limits.y) {
      this.robot.step = -this.robot.step;
    }
    this.robot.moveBottom();
  };

  return UpAndDown;
});
