export default {
    draw(graphics?: any, isFill?: any, isStroke?: any) {
        var points = this.toPoints();
        if (isFill?: any) {
            graphics.fillPoints(points, this.closePath, this.closePath);
        }
        if (isStroke?: any) {
            graphics.strokePoints(points, this.closePath, this.closePath);
        }

        return this;
    }
}