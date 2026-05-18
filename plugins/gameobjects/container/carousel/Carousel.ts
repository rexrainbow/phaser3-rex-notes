import GridTable from '../gridtable/GridTable';
import Methods from './methods/Methods';

class Carousel extends GridTable {
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.columns = 1; // Force columns to 1
        if (!config.hasOwnProperty('clampTableOXY')) {
            config.clampTableOXY = false;
        }

        super(scene, x, y, width, height, config);
        this.type = 'rexCarousel';

    }
}

// mixin
Object.assign(
    Carousel.prototype,
    Methods
);

export default Carousel;