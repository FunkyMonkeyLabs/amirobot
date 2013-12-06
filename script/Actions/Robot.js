/**
 * @param integer x
 * @param integer y
 */
Robot.prototype.move = function (x, y) {
    if (true === this.blocked) {
        return;
    }

    this.position = {
        x: x,
        y: y
    }

    this.draw();
};

/**
 * move left 1px
 */
Robot.prototype.moveLeft = function () {
    var x = this.position.x - 1;
    this.move(x, this.position.y);
};

/**
 * move right 1px
 */
Robot.prototype.moveRight = function () {
    var x = this.position.x + 1;
    this.move(x, this.position.y);
}

/**
 * move top 1px
 */
Robot.prototype.moveTop = function () {
    var y = this.position.y - 1;
    this.move(this.position.x, y);
};

/**
 * move down 1px
 */
Robot.prototype.moveBottom = function () {
    var y = this.position.y + 1;
    this.move(this.position.x, y);
};

/**
 * follow another robot
 */
Robot.prototype.follow = function () {
    var followed = robots[this.followed],
        followedPosition = followed.position,
        collision = new Collision(this.position, followedPosition);

    if (true === this.blocked) {
        return;
    }

    if (collision.isClose(2)) {
        this.block();
    }

    // watch the limit
    switch (true) {
        case (this.position.x == this.limit.x):
            this.moveLeft();
            break;

        case (this.position.y == this.limit.y):
            this.moveTop();
            break;

        case (this.position.x == 0):
            this.moveRight();
            break;

        case (this.position.y == 0):
            this.moveBottom();
            break;
    }

    if (this.position.y == 0
        || this.position.x == 0
        || this.position.x == this.limit.x
        || this.position.y == this.limit.y) {
        return;
    }

    // follow the rabbit
    if (this.position.x > followedPosition.x) {
        this.moveLeft();
    } else {
        this.moveRight();
    }

    if (this.position.y > followedPosition.y) {
        this.moveTop();
    } else {
        this.moveBottom();
    }
};

Robot.prototype.block = function () {
    this.blocked = true;
    $(window).trigger("blockRobot");
}