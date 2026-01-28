import PathBase from "./PathBase";

/**
 * Line path geometry.
 */
export default class Line extends PathBase {
    /**
     * Create a line.
     * @param x0 - Start x.
     * @param y0 - Start y.
     * @param x1 - End x.
     * @param y1 - End y.
     */
    constructor(
        x0?: number,
        y0?: number,
        x1?: number,
        y1?: number
    );

    /**
     * Set start point.
     * @param x - Start x.
     * @param y - Start y.
     * @returns This instance.
     */
    setP0(
        x: number,
        y: number
    ): this;
    /**
     * Start x.
     */
    x0: number;
    /**
     * Start y.
     */
    y0: number;

    /**
     * Set end point.
     * @param x - End x.
     * @param y - End y.
     * @returns This instance.
     */
    setP1(
        x: number,
        y: number
    ): this;
    /**
     * End x.
     */
    x1: number;
    /**
     * End y.
     */
    y1: number;
}
