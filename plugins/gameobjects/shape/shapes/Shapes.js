import Render from './render/Render.js';
import Clear from '../../../utils/object/Clear.js';

const Shape = Phaser.GameObjects.Shape;
const RemoveItem = Phaser.Utils.Array.Remove;

class Shapes extends Shape {
    constructor(scene, x, y, width, height) {
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

        this._width = -1;
        this._height = -1;
        this.shapes = {};

        this.setPosition(x, y);
        this.setSize(width, height);

        this.updateDisplayOrigin();
        this.dirty = true;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setSize(value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setSize(this._width, value);
    }

    setSize(width, height) {
        this._width = width;
        this._height = height;
        this.dirty = true;
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

    updateData() {
        var shapes = this.geom;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];
            if (shape.isDirty) {
                shape.updateData();
            }
        }
        return this;
    }

    clear() {
        this.geom.length = 0;
        Clear(this.shapes);
        return this;
    }

    getShape(name) {
        return this.shapes[name];
    }

    addShape(shape) {
        this.geom.push(shape);
        var name = shape.name;
        if (name) {
            this.shapes[name] = shape;
        }
        this.dirty = true;
        return this;
    }

    deleteShape(name) {
        var shape = this.getShape(name);
        if (shape) {
            delete this.shapes[name];
            RemoveItem(this.geom, shape);
        }
        return this;
    }
}

Object.assign(
    Shapes.prototype,
    Render
);

export default Shapes;