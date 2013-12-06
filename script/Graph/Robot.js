Robot.prototype.bind = function (container) {
    this.container = container;
};

Robot.prototype.draw = function () {
    if (this.element == undefined) {
        this.element = $("<span></span>");
        this.element
            .attr({
                class: "robot",
                id: this.id
            })
            .css({
                position: "absolute",
                top: this.position.y,
                left: this.position.x
            })
            .appendTo(this.container);
        return;
    }

    this.element.css({
        top: this.position.y,
        left: this.position.x
    })
};