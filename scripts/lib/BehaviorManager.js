define([
  '../behavior/Group',
  '../behavior/Tornado',
  '../behavior/UpAndDown',
  '../behavior/Stalker',
  '../behavior/Earthquake'
], function (Group, Tornado, UpAndDown, Stalker, Earthquake) {
  'use strict';

  /**
   * @constructor
   */
  var BehaviorManager = function () {
  };

  /**
   * Engines enum
   * @type {{Assassin: *, tornado: *, upAndDown: *, stalker: *}}
   */
  BehaviorManager.prototype.behaviors = {
    'group': Group,
    'tornado': Tornado,
    'upAndDown': UpAndDown,
    'stalker': Stalker,
    'earthquake': Earthquake
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