/**
 * Robot entity
 *
 * @param id
 * @param position
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
}