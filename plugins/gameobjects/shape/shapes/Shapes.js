import Render from './render/Render.js';

const Shape = Phaser.GameObjects.Shape;

class Shapes extends Shape {
    constructor(scene, x, y, width, height,) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = width;
        }

        super(scene, 'rexShapes', []);
        this.setPosition(x, y);

        this.updateDisplayOrigin();
        this.dirty = true;
    }

    updateData() {
        var shapes = this.geom;
        return this;
    }

}

Object.assign(
    Shapes.prototype,
    Render
);

export default Shapes;