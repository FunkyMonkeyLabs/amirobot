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
        collision = new Collision(this.position, followedPosition),
        // random behavior generates interesting results
        modifier = getRandom(0, 1) ? 0 : getRandom(-25, 25);

//    if (collision.isClose(2)) {
//        this.block();
//    }

    // follow the rabbit
    if (this.position.x > followedPosition.x) {
        this.moveLeft();
    } else if (this.position.x < followedPosition.x){
        this.moveRight();
    } else {
        // make some random behaviour
        this.move(this.position.x + modifier, this.position.y);
    }

    if (this.position.y > followedPosition.y) {
        this.moveTop();
    } else if(this.position.y < followedPosition.y){
        this.moveBottom();
    } else {
        // make some random behaviour
        this.move(this.position.x, this.position.y + modifier);
    }
};

/**
 * Block robot's movement
 */
Robot.prototype.block = function () {
    this.blocked = true;
};