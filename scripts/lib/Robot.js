/**
 * Robot entity
 *
 * @param id
 * @constructor
 */
function Robot(id) {

    /**
     * @type integer
     */
    this.id = id;

    /**
     * x,y position
     * @type {{x: number, y: number}}
     */
    this.position = {
        x: 0,
        y: 0
    };

    /**
     * is blocked?
     * @type {Boolean}
     */
    this.blocked = false;

    /**
     * @type {number}
     */
    this.moveStep = 1;
}

Robot.prototype.captivate = function (followed) {

    /**
     * robot's id to followed
     * @type integer
     */
    this.followed = followed;
};

Robot.prototype.respawn = function (x, y) {
    this.position = {
        x: x,
        y: y
    }
};

Robot.prototype.limit = function (x, y) {
    this.limit = {
        x: x,
        y: y
    }
};

/**
 * Check width position
 *
 * @param x
 * @returns {boolean}
 */
Robot.prototype.isValidX = function (x) {
    return x >= 0 && x <= this.limit.x;
};

/**
 * Check height position
 *
 * @param y
 * @returns {boolean}
 */
Robot.prototype.isValidY = function (y) {
    return y >= 0 && y <= this.limit.y;
};

/**
 * Move robot to position
 *
 * @param x
 * @param y
 */
Robot.prototype.move = function (x, y) {
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
 * move left by step
 */
Robot.prototype.moveLeft = function () {
    var x = this.position.x - this.moveStep;
    this.move(x, this.position.y);
};

/**
 * move right by step
 */
Robot.prototype.moveRight = function () {
    var x = this.position.x + this.moveStep;
    this.move(x, this.position.y);
}

/**
 * move top by step
 */
Robot.prototype.moveTop = function () {
    var y = this.position.y - this.moveStep;
    this.move(this.position.x, y);
};

/**
 * move down by step
 */
Robot.prototype.moveBottom = function () {
    var y = this.position.y + this.moveStep;
    this.move(this.position.x, y);
};

/**
 * follow another robot
 */
Robot.prototype.follow = function (followed) {
    var followedPosition = followed.position,
        collision = new Collision(this.position, followedPosition);

    // follow the rabbit
    if (this.position.x > followedPosition.x) {
        this.moveLeft();
    } else if (this.position.x < followedPosition.x){
        this.moveRight();
    }

    if (this.position.y > followedPosition.y) {
        this.moveTop();
    } else if(this.position.y < followedPosition.y){
        this.moveBottom();
    }

    return collision.isClose(0);
};

/**
 * Block robot's movement
 */
Robot.prototype.block = function () {
    this.blocked = true;
};

Robot.prototype.draw = function (context) {
    context.fillRect(this.position.x, this.position.y, 2, 2);
};
