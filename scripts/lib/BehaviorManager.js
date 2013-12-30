define([
    '../behavior/Follower',
    '../behavior/Tornado',
    '../behavior/UpAndDown'
], function(Follower, Tornado, UpAndDown) {
    'use strict';

    /**
     * @constructor
     */
    var BehaviorManager = function() {
    };

    /**
     * Engines enum
     * @type {{follower: *, tornado: *, upAndDown: *}}
     */
    BehaviorManager.prototype.behaviors = {
        'follower': Follower,
        'tornado': Tornado,
        'upAndDown': UpAndDown
    };

    /**
     * Get behavior for robot
     * @param robot
     * @param Behavior
     * @returns {Behavior}
     */
    BehaviorManager.prototype.getBehaviorForRobot = function(robot, Behavior) {
        return new Behavior(robot);
    };

    return new BehaviorManager();
});