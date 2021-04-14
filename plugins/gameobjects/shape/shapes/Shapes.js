import BaseShapes from './BaseShapes.js';
import {
    Arc,
    Circle,
    Curve,
    Ellipse,
    Line,
    Lines,
    Rectangle,
    Triangle
} from './geoms';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CustomShapes extends BaseShapes {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 64);
            height = GetValue(config, 'height', 64);
        }
        super(scene, x, y, width, height);
        this.type = GetValue(config, 'type', 'rexCustomShapes');
        this.buildShapes(config);
    }

    createShape(shapeType, name) {
        var ShapeClass = ShapeClasses[shapeType];
        var shape = new ShapeClass();
        if (name) {
            shape.setName(name);
        }
        return shape;
    }

    buildShapes(config) {
        var createCallback = GetValue(config, 'create', undefined);
        if (typeof (createCallback) === 'function') {
            createCallback.call(this);
        } else if (IsPlainObject(createCallback)) {
            var shapes = createCallback;
            for (var shapeType in shapes) {
                var name = shapes[shapeType];
                switch (typeof (name)) {
                    case 'number':
                        for (var i = 0; i < name; i++) {
                            this.addShape(this.createShape(shapeType));
                        }
                        break;

                    case 'string':
                        this.addShape(this.createShape(shapeType, name));
                        break;

                    default: //Array
                        var names = name;
                        for (var i = 0, cnt = names.length; i < cnt; i++) {
                            this.addShape(this.createShape(shapeType, names[i]));
                        }
                        break;
                }
            }
        }

        var updateCallback = GetValue(config, 'update', undefined);
        this.updateCallback = updateCallback;
    }

    updateShapes() {
        if (this.updateCallback) {
            this.updateCallback.call(this);
        }
    }
}

const ShapeClasses = {
    arc: Arc,
    circle: Circle,
    curve: Curve,
    ellipse: Ellipse,
    line: Line,
    lines: Lines,
    rectangle: Rectangle,
    triangle: Triangle
}

export default CustomShapes;