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
     * @type {{FOLLOWER: *, TORNADO: *, UP_AND_DOWN: *}}
     */
    BehaviorManager.prototype.behaviors = {
        'FOLLOWER': Follower,
        'TORNADO': Tornado,
        'UP_AND_DOWN': UpAndDown
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