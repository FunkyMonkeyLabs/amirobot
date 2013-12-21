define(function() {
    'use strict';

    /**
     * @param positionA
     * @param positionB
     * @constructor
     */
    var Collision = function(positionA, positionB) {
        this.positions = [
            positionA,
            positionB
        ];
    };

    /**
     * @param tolerance
     * @returns {boolean}
     */
    Collision.prototype.isClose = function(tolerance) {
        var distance = {
            x: Math.abs(this.positions[0].x - this.positions[1].x),
            y: Math.abs(this.positions[0].y - this.positions[1].y)
        };

        return tolerance !== undefined
            ? distance.x < tolerance && distance.y < tolerance
            : distance.x === 0 && distance.y === 0;
    };

    return Collision;
});
