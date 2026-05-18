import { Geom as PhaserGeom } from 'phaser';
const RectangleContains = PhaserGeom.Rectangle.Contains;

var HitAreaCallback = function(shape?: any, x?: any, y?: any, gameObject?: any) {
    if (!RectangleContains(shape, x, y)) {
        return false;
    }

    return gameObject.isInTouching();
}

export default HitAreaCallback;