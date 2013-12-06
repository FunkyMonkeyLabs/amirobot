function Collision(positionA, positionB) {
    this.positions = [
        positionA,
        positionB
    ];
}

Collision.prototype.isClose = function(tolerance) {
    var distance = {
        x: Math.abs(this.positions[0].x - this.positions[1].x),
        y: Math.abs(this.positions[0].y - this.positions[1].y)
    };

    if ((distance.x == 0
        && distance.y == 0)
        || (
            tolerance != undefined
            && distance.x < tolerance
            && distance.y < tolerance)
        ) {
        return true;
    }

    return false;
}