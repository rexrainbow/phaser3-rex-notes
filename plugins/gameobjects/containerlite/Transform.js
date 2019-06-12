const RotateAround = Phaser.Math.RotateAround;

export default {
    worldToLocal(point) {
        // Transform
        point.x -= this.x;
        point.y -= this.y;
        // Rotate
        RotateAround(point, 0, 0, -this.rotation);
        // Scale
        point.x /= this.scaleX;
        point.y /= this.scaleY;
        // Flip
        point.x *= ((!this.flipX) ? 1 : -1);
        point.y *= ((!this.flipY) ? 1 : -1);
        return point;
    },

    localToWorld(point) {
        // Flip
        point.x *= ((!this.flipX) ? 1 : -1);
        point.y *= ((!this.flipY) ? 1 : -1);
        // Scale
        point.x *= this.scaleX;
        point.y *= this.scaleY;
        // Rotate
        RotateAround(point, 0, 0, this.rotation);
        // Transform
        point.x += this.x;
        point.y += this.y;
        return point;
    }
};