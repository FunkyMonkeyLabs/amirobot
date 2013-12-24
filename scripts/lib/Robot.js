define(['underscore', 'Collision', 'BehaviorManager'], function(_, Collision, BehaviorManager) {
    'use strict';

    /**
     * @param id
     * @constructor
     */
    var Robot = function(id) {
        /**
         * robot's id
         * @type {number}
         */
        this.id = id;

        /**
         * x,y position
         * @type {{x: number, y: number}}
         */
        this.position = { x: 0, y: 0 };

        /**
         * maximum x,y position
         * @type {{x: undefined, y: undefined}}
         */
        this.limits = { x: undefined, y: undefined };

        /**
         * is blocked?
         * @type {Boolean}
         */
        this.blocked = false;

        /**
         * @type {number}
         */
        this.step = 1;

        this.behavioralEngine = undefined;
    };

    /**
     * Set robot to follow
     * @param {Robot} followed
     */
    Robot.prototype.captivate = function(followed) {
        /**
         * robot to follow
         * @type {number}
         */
        this.followed = followed;
    };

    /**
     * Set random position withing given limits
     * @returns {boolean}
     */
    Robot.prototype.respawn = function() {
        if (!this._hasLimits()) {
            throw new Error("Use setLimits(x,y) before movement operations");
        }

        return this.moveTo(_.random(0, this.limits.x), _.random(0, this.limits.y));
    };

    /**
     * Set maximum range of robot's movement
     * @param {number} x
     * @param {number} y
     */
    Robot.prototype.setLimits = function(x, y) {
        this.limits = {
            x: x,
            y: y
        };
    };

    /**
     * Check if position limits are set
     * @returns {boolean}
     * @private
     */
    Robot.prototype._hasLimits = function() {
        return this.limits.x !== undefined && this.limits.y !== undefined;
    };

    /**
     * Check width position
     * @param {number} x
     * @returns {boolean}
     * @private
     */
    Robot.prototype._isValidX = function(x) {
        return x >= 0 && x <= this.limits.x;
    };

    /**
     * Check height position
     * @param {number} y
     * @returns {boolean}
     * @private
     */
    Robot.prototype._isValidY = function(y) {
        return y >= 0 && y <= this.limits.y;
    };

    /**
     * Move robot to position
     * @param x
     * @param y
     * @returns {boolean}
     * @private
     */
    Robot.prototype._move = function(x, y) {
        if (!this._hasLimits()) {
            throw new Error("Set limit before movement operations");
        }

        if (true === this.blocked) {
            return false;
        }

        if (this._isValidX(x) && this._isValidY(y)) {
            this.position.x = x;
            this.position.y = y;
            return true;
        }

        return false;
    };

    /**
     * Move left by step
     * @returns {boolean}
     */
    Robot.prototype.moveLeft = function() {
        return this._move(this.position.x - this.step, this.position.y);
    };

    /**
     * Move right by step
     * @returns {boolean}
     */
    Robot.prototype.moveRight = function() {
        return this._move(this.position.x + this.step, this.position.y);
    };

    /**
     * Move top by step
     * @returns {boolean}
     */
    Robot.prototype.moveTop = function() {
        return this._move(this.position.x, this.position.y - this.step);
    };

    /**
     * Move down by step
     * @returns {boolean}
     */
    Robot.prototype.moveBottom = function() {
        return this._move(this.position.x, this.position.y + this.step);
    };

    /**
     * Move to x, y coordinates
     * @param x
     * @param y
     * @returns {boolean}
     */
    Robot.prototype.moveTo = function(x, y) {
        return this._move(x, y);
    };

    /**
     * Follow after another robot
     * @returns {boolean}
     */
    Robot.prototype.follow = function() {
        if (this.followed === undefined) {
            throw new Error("There's no one to follow");
        }

        var followedPosition = this.followed.position,
            collision = new Collision(this.position, followedPosition);

        // follow the rabbit
        if (this.position.x > followedPosition.x) {
            this.moveLeft();
        } else if (this.position.x < followedPosition.x) {
            this.moveRight();
        }

        if (this.position.y > followedPosition.y) {
            this.moveTop();
        } else if (this.position.y < followedPosition.y) {
            this.moveBottom();
        }

        return collision.isClose(0);
    };

    /**
     * Block robot's movement
     */
    Robot.prototype.block = function() {
        this.blocked = true;
    };

    /**
     * Draw robot within given context
     * @param {CanvasRenderingContext2D} context
     */
    Robot.prototype.draw = function(context) {
        context.fillRect(this.position.x, this.position.y, 2, 2);
    };

    /**
     * Set robot's behavior
     * @param {BehaviorManager.behaviors} behavior
     */
    Robot.prototype.setBehavioralEngine = function(behavior) {
        this.behavioralEngine = BehaviorManager.getBehaviorForRobot(this, behavior);
    };

    /**
     * Take actions that should be done by robot within one framerate
     */
    Robot.prototype.behave = function() {
        if (this.behavioralEngine !== undefined) {
            this.behavioralEngine.behave();
        } else {
            this.follow();
        }
    };

    return Robot;
});
