define(['underscore', 'Collision', 'BehavioralEngineManager'], function(_, Collision, BehavioralEngineManager) {
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
     */
    Robot.prototype.respawn = function() {
        if (!this.hasLimits()) {
            throw new Error("Use setLimits(x,y) before movement operations");
        }

        this.position = {
            x: _.random(0, this.limits.x),
            y: _.random(0, this.limits.y)
        };
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
     */
    Robot.prototype.hasLimits = function() {
        return this.limits.x !== undefined && this.limits.y !== undefined;
    };

    /**
     * Check width position
     * @param {number} x
     * @returns {boolean}
     */
    Robot.prototype.isValidX = function(x) {
        return x >= 0 && x <= this.limits.x;
    };

    /**
     * Check height position
     * @param {number} y
     * @returns {boolean}
     */
    Robot.prototype.isValidY = function(y) {
        return y >= 0 && y <= this.limits.y;
    };

    /**
     * Move robot to position
     * @param x
     * @param y
     */
    Robot.prototype.move = function(x, y) {
        if (!this.hasLimits()) {
            throw new Error("Set limit before movement operations");
        }

        if (true === this.blocked) {
            return;
        }

        if (this.isValidX(x)) {
            this.position.x = x;
        }

        if (this.isValidY(y)) {
            this.position.y = y;
        }
    };

    /**
     * Move left by step
     */
    Robot.prototype.moveLeft = function() {
        var x = this.position.x - this.step;
        this.move(x, this.position.y);
    };

    /**
     * Move right by step
     */
    Robot.prototype.moveRight = function() {
        var x = this.position.x + this.step;
        this.move(x, this.position.y);
    };

    /**
     * Move top by step
     */
    Robot.prototype.moveTop = function() {
        var y = this.position.y - this.step;
        this.move(this.position.x, y);
    };

    /**
     * Move down by step
     */
    Robot.prototype.moveBottom = function() {
        var y = this.position.y + this.step;
        this.move(this.position.x, y);
    };

    /**
     * Follow after another robot
     * @returns {boolean}
     */
    Robot.prototype.follow = function() {
        if (this.followed === undefined) {
            throw new Error("There's no one to follow");
        }

        var followed = this.followed,
            followedPosition = followed.position,
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
     * Generate behavioral engine by name
     * @param engine
     */
    Robot.prototype.setBehavioralEngine = function(engine) {
        this.behavioralEngine = BehavioralEngineManager.getEngineForRobot(this, engine);
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
