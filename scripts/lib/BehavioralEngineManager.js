define([
    '../behavioralEngine/Follower',
    '../behavioralEngine/Tornado',
    '../behavioralEngine/UpAndDown'
], function(Follower, Tornado, UpAndDown) {
    'use strict';

    var BehavioralEngineManager = function() {
    };

    BehavioralEngineManager.prototype.enginesEnum = {
        'FOLLOWER': 'follower',
        'TORNADO': 'tornado',
        'UP_AND_DOWN': 'upAndDown'
    };

    BehavioralEngineManager.prototype.getEngineForRobot = function(robot, engine) {
        var engines = {
            'follower': Follower,
            'tornado': Tornado,
            'upAndDown': UpAndDown
        };

        engine = engine.toLowerCase();

        if (!engines.hasOwnProperty(engine)) {
            throw new Error('Undefined behaviour engine: ' + engine);
        }

        return new engines[engine](robot);
    };

    return new BehavioralEngineManager();
});