define([
  '../behavior/Group',
  '../behavior/Tornado',
  '../behavior/UpAndDown',
  '../behavior/Stalker',
  '../behavior/Earthquake',
  '../behavior/Gravity'
], function (Group, Tornado, UpAndDown, Stalker, Earthquake, Gravity) {
  'use strict';

  /**
   * @constructor
   */
  var BehaviorManager = function () {
  };

  /**
   * Engines enum
   * @type {{group: *, tornado: *, upAndDown: *, stalker: *, earthquake: *, gravity: *}}
   */
  BehaviorManager.prototype.behaviors = {
    'group': Group,
    'tornado': Tornado,
    'upAndDown': UpAndDown,
    'stalker': Stalker,
    'earthquake': Earthquake,
    'gravity': Gravity
  };

  /**
   * Get behavior for robot
   * @param robot
   * @param Behavior
   * @returns {Behavior}
   */
  BehaviorManager.prototype.getBehaviorForRobot = function (robot, Behavior) {
    return new Behavior(robot);
  };

  return new BehaviorManager();
});