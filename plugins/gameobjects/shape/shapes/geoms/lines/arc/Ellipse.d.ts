import Arc from './Arc';

/**
 * Ellipse path geometry.
 */
export default class Ellipse extends Arc {
    /**
     * Create an ellipse.
     * @param x - Center x.
     * @param y - Center y.
     * @param radiusX - Radius x.
     * @param radiusY - Radius y.
     */
    constructor(x?: number, y?: number, radiusX?: number, radiusY?: number);
}
