import Arc from './Arc';

class Circle extends Arc {
    constructor(x?: any, y?: any, radius?: any) {
        super(x, y, radius, radius, 0, 360);
    }
}

export default Circle;