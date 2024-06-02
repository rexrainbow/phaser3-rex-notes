export default {
    worldToLocal(point) {
        // Transform
        point.x -= this.x;
        point.y -= this.y;

        // Rotate
        var c = Math.cos(-this.rotation);
        var s = Math.sin(-this.rotation);
        var tx = point.x;
        var ty = point.y;
        point.x = tx * c - ty * s;
        point.y = tx * s + ty * c;

        // Scale
        point.x /= this.scaleX;
        point.y /= this.scaleY;
        return point;
    },

    localToWorld(point) {
        // Scale
        point.x *= this.scaleX;
        point.y *= this.scaleY;

        // Rotate
        var c = Math.cos(this.rotation);
        var s = Math.sin(this.rotation);
        var tx = point.x;
        var ty = point.y;
        point.x = tx * c - ty * s;
        point.y = tx * s + ty * c;

        // Transform
        point.x += this.x;
        point.y += this.y;
        return point;
    }
};