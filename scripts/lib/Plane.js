define(function() {
    'use strict';

    var Plane = function(id, width, height) {
        /**
         * @type {HTMLElement}
         */
        this.canvas = $('#' + id);
        // set canvas resolution
        // I know ther're .width() and .height() but
        // they set a unitless value, whereas we're defining it explicitly as pixles with .attr()
        this.canvas.attr("width", width + "px");
        this.canvas.attr("height", height + "px");

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
        this.context.fillStyle = '#FFFFFF';
    };

    /**
     * Set robots collection
     * @param robots
     */
    Plane.prototype.setRobots = function(robots) {
        this.robots = robots;
    };

    /**
     * Animate robots behave
     */
    Plane.prototype.animate = function() {
        var self = this;

        this.clear();

        this.robots.forEach(function(robot) {
            robot.behave();
            robot.draw(self.context);
        });

        window.requestAnimFrame(function() {
            self.animate();
        });
    };


    /**
     * Clear canvas plane
     */
    Plane.prototype.clear = function() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };

    return Plane;
});
