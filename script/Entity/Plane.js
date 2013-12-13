/**
 * Plane (Canvas) entity
 *
 * @param id
 * @param width
 * @param height
 * @constructor
 */
function Plane(id, width, height) {
    /**
     * @type {HTMLElement}
     */
    this.canvas = $('#'+id);

    /**
     * @type {number}
     */
    this.canvasWidth = width;

    /**
     * @type {number}
     */
    this.canvasHeight = height;

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = this.canvas.get(0).getContext('2d');

    // set canvas resolution
    // I know ther're .width() and .height() but
    // they set a unitless value, whereas we're defining it explicitly as pixles with .attr()
    this.canvas.attr("width", width+"px");
    this.canvas.attr("height", height+"px");
}

/**
 * Animate robots movement
 *
 * @param robots
 */
Plane.prototype.animate = function (robots) {
    var self = this;

    this.clear();

    robots.forEach(function(robot){
        robot.follow(robots[robot.followed]);
        robot.draw(self.context);
    });

    // request new frame
    window.requestAnimFrame(function () {
        self.animate(robots);
    });
};

/**
 * Clear canvas plane
 */
Plane.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
};