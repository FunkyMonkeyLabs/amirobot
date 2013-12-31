define(['underscore', 'Collision', 'BehaviorManager'], function (_, Collision, BehaviorManager) {
  'use strict';

  /**
   * @param id
   * @constructor
   */
  var Robot = function (id) {
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
     * @type {{x: number, y: number}}
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

    /**
     *
     * @type {undefined}
     */
    this.behavior = undefined;

    /**
     * robot to follow
     * @type {Robot}|{undefined}
     */
    this.followed = undefined;
  };

  /**
   * Set robot to follow
   * @param {Robot} followed
   */
  Robot.prototype.captivate = function (followed) {
    this.followed = followed;
  };

  /**
   * Set random position withing given limits
   * @returns {boolean}
   */
  Robot.prototype.respawn = function () {
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
  Robot.prototype.setLimits = function (x, y) {
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
  Robot.prototype._hasLimits = function () {
    return this.limits.x !== undefined && this.limits.y !== undefined;
  };

  /**
   * Check width position
   * @param {number} x
   * @returns {boolean}
   * @private
   */
  Robot.prototype._isValidX = function (x) {
    return x >= 0 && x <= this.limits.x;
  };

  /**
   * Check height position
   * @param {number} y
   * @returns {boolean}
   * @private
   */
  Robot.prototype._isValidY = function (y) {
    return y >= 0 && y <= this.limits.y;
  };

  /**
   * Move robot to position
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   * @private
   */
  Robot.prototype._move = function (x, y) {
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
  Robot.prototype.moveLeft = function (step) {
    step = step || this.step;
    return this._move(this.position.x - step, this.position.y);
  };

  /**
   * Move right by step
   * @returns {boolean}
   */
  Robot.prototype.moveRight = function (step) {
    step = step || this.step;
    return this._move(this.position.x + step, this.position.y);
  };

  /**
   * Move top by step
   * @returns {boolean}
   */
  Robot.prototype.moveTop = function (step) {
    step = step || this.step;
    return this._move(this.position.x, this.position.y - step);
  };

  /**
   * Move down by step
   * @returns {boolean}
   */
  Robot.prototype.moveBottom = function (step) {
    step = step || this.step;
    return this._move(this.position.x, this.position.y + step);
  };

  /**
   * Move to x, y coordinates
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  Robot.prototype.moveTo = function (x, y) {
    return this._move(x, y);
  };

  /**
   * Block robot's movement
   */
  Robot.prototype.block = function () {
    this.blocked = true;
  };

  /**
   * Draw robot within given canvas context
   * @param {CanvasRenderingContext2D} context
   */
  Robot.prototype.draw = function (context) {
    context.fillRect(this.position.x, this.position.y, 2, 2);
  };

  /**
   * Set robot's behavior
   * @param {BehaviorManager.behaviors} behavior
   */
  Robot.prototype.setBehavior = function (behavior) {
    this.behavior = BehaviorManager.getBehaviorForRobot(this, behavior);
  };

  /**
   * Take actions that should be done by robot within one framerate
   */
  Robot.prototype.behave = function () {
    if (this.behavior === undefined || typeof this.behavior.behave !== 'function') {
      throw 'You cannot fire the robot without behavior';
    }

    this.behavior.behave();
  };

  return Robot;
});
