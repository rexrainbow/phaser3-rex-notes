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

class Shapes extends BaseShapes {
    addArc(name) {
        var shape = (new Arc()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addCircle(name) {
        var shape = (new Circle()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addCurve(name) {
        var shape = (new Curve()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addEllipse(name) {
        var shape = (new Ellipse()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addLine(name) {
        var shape = (new Line()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addLines(name) {
        var shape = (new Lines()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addRectangle(name) {
        var shape = (new Rectangle()).setName(name);
        this.addShape(shape);
        return shape;
    }

    addTriangle(name) {
        var shape = (new Triangle()).setName(name);
        this.addShape(shape);
        return shape;
    }
}

export default Shapes;