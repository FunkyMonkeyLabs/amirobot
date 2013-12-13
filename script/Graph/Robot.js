Robot.prototype.draw = function (context) {
    context.fillStyle = '#FFFFFF';
    context.fillRect(this.position.x, this.position.y, 2, 2);
};
