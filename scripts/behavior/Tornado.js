define(['underscore', '../behavior/Stalker'], function (_, Stalker) {
  'use strict';

  /**
   * @param {Robot} robot
   * @constructor
   */
  var Tornado = function (robot) {
    this.robot = robot;
    this.stalkerBehavior = new Stalker(robot);
  };

  Tornado.prototype.behave = function () {
    if (_.random(0, 4)) {
      this.stalkerBehavior.behave();
      this.robot.step = 6;
    } else {
      this.robot.step = 1;
      var robotPosition = this.robot.getPosition();
      if (robotPosition.y >= this.robot.limits.y || robotPosition.y <= 0) {
        this.robot.moveTo(_.random(0, this.robot.limits.x), 0);
      }
      this.robot.moveBottom();
    }
  };

  return Tornado;
});
