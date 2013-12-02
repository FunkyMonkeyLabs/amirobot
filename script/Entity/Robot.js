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
}

Robot.prototype.follow = function (follow) {

    /**
     * robot's id to follow
     * @type integer
     */
    this.follow = follow;
};

Robot.prototype.respawn = function (x, y) {
    this.position.x = x;
    this.position.y = y;
};