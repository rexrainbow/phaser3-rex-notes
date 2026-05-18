import Arc from './Arc';

class Ellipse extends Arc {
    constructor(x?: any, y?: any, radiusX?: any, radiusY?: any) {
        super(x, y, radiusX, radiusY, 0, 360);
    }
}

export default Ellipse;