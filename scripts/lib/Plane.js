define(function() {
    'use strict';

    var Plane = function(id, width, height) {
        /**
         * @type {HTMLElement}
         */
        this.canvas = $('#' + id);

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
        this.canvas.attr("width", width + "px");
        this.canvas.attr("height", height + "px");

        this.context.fillStyle = '#FFFFFF';
    };

    /**
     * Animate robots movement
     *
     * @param robots
     */
    Plane.prototype.animate = function(robots) {
        var self = this,
            followed,
            followedReached = false;

        this.clear();

        robots.forEach(function(robot) {
            robot.draw(self.context);

            // followed = robots[robot.followed];
            // followedReached = robot.follow(followed);

            if (_.random(0, 4)) {
                robot.moveStep = 5;
                followed = robots[robot.followed];
                followedReached = robot.follow(followed);
            } else {
                robot.moveStep = 1;
                // robot.position.x += _.random(-1, 1);
                if (robot.position.y >= robot.limit.y || robot.position.y <= 0) {
                    robot.position.y = 0;
                    robot.position.x = _.random(0, robot.limit.x);
                    // robot.moveStep = -robot.moveStep;
                }
                robot.moveBottom();
            }
        });

        // request new frame
        window.requestAnimFrame(function() {
            self.animate(robots);
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
