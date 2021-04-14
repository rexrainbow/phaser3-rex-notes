import Render from './render/Render.js';
import Clear from '../../../utils/object/Clear.js';

const Shape = Phaser.GameObjects.Shape;
const RemoveItem = Phaser.Utils.Array.Remove;

class BaseShapes extends Shape {
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

    setDirty(value) {
        if (value === undefined) {
            value = true;
        }
        this.dirty = value;
        return this;
    }

    setSize(width, height) {
        this.dirty = this.dirty || (this._width !== width) || (this._height !== height);
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = width;
            input.hitArea.height = height;
        }
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

    updateShapes() {

    }

    updateData() {
        this.updateShapes();
        var shapes = this.geom;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];
            if (shape.dirty) {
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

    getShapes() {
        return this.geom;
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
    BaseShapes.prototype,
    Render
);

export default BaseShapes;