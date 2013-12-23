define([
    '../behavioralEngine/Follower',
    '../behavioralEngine/Tornado',
    '../behavioralEngine/UpAndDown'
], function(Follower, Tornado, UpAndDown) {
    'use strict';

    /**
     * @constructor
     */
    var BehavioralEngineManager = function() {
    };

    /**
     * Engines enum
     * @type {{FOLLOWER: *, TORNADO: *, UP_AND_DOWN: *}}
     */
    BehavioralEngineManager.prototype.enginesList = {
        'FOLLOWER': Follower,
        'TORNADO': Tornado,
        'UP_AND_DOWN': UpAndDown
    };

    /**
     * Get behaviour engine for robot
     * @param {Robot} robot
     * @param [BehavioralEngineManager.engineList} Engine
     * @returns {Engine}
     */
    BehavioralEngineManager.prototype.getEngineForRobot = function(robot, Engine) {
        return new Engine(robot);
    };

    return new BehavioralEngineManager();
});