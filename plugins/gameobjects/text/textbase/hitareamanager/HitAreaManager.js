import Pool from '../../../../pool.js';

const Rectangle = Phaser.Geom.Rectangle;

var RectanglePool = new Pool();
class HitAreaManager {
    constructor() {
        this.hitAreas = [];
    }

    destroy() {
        this.clear();
    }

    clear() {
        RectanglePool.pushMultiple(this.hitAreas);
        return this;
    }

    add(key, x, y, width, height) {
        var rectangle = RectanglePool.pop();
        if (rectangle === null) {
            rectangle = new Rectangle(x, y, width, height);
        } else {
            rectangle.setTo(x, y, width, height);
        }
        rectangle.key = key;
        this.hitAreas.push(rectangle);
        return this;
    }

    getFirstHitArea(x, y) {
        var hitAreas = this.hitAreas, hitArea;
        for (var i = 0, cnt = hitAreas.length; i < cnt; i++) {
            hitArea = hitAreas[i];
            if (hitArea.contains(x, y)) {
                return hitArea;
            }
        }
        return null;
    }

    drawBounds(graphics, color, parent) {
        if (color === undefined) {
            color = 0xffffff;
        }

        if (parent) {
            graphics
                .save()
                .scaleCanvas(parent.scaleX, parent.scaleY)
                .rotateCanvas(parent.rotation)
                .translateCanvas(parent.x, parent.y)
        }

        var hitAreas = this.hitAreas, hitArea;
        for (var i = 0, cnt = hitAreas.length; i < cnt; i++) {
            hitArea = hitAreas[i];
            graphics.lineStyle(1, color).strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
        }

        if (parent) {
            graphics
                .restore()
        }
        return this;
    }
}
export default HitAreaManager;