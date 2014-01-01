define(['underscore'], function (_) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Gravity = function (robot) {
    this.robot = robot;
    this.startTime = (new Date()).getTime();
  };

  Gravity.prototype.behave = function () {
    var time = (new Date()).getTime() - this.startTime, // update
      gravity = _.random(8, 20); // pixels / second^2

    this.robot.moveBottom(0.5 * gravity * Math.pow(time / 1000, 2))
  };

  return Gravity;
});
