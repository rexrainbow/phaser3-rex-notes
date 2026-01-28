import PathBase from "../PathBase";

/**
 * Arc path geometry.
 */
export default class Arc extends PathBase {
    /**
     * Create an arc.
     * @param x - Center x.
     * @param y - Center y.
     * @param radiusX - Radius x.
     * @param radiusY - Radius y.
     * @param startAngle - Start angle (radians).
     * @param endAngle - End angle (radians).
     * @param anticlockwise - True to draw anticlockwise.
     * @param pie - True to draw as a pie.
     */
    constructor(
        x?: number,
        y?: number,
        radiusX?: number,
        radiusY?: number,
        startAngle?: number,
        endAngle?: number,
        anticlockwise?: boolean,
        pie?: boolean
    );

    /**
     * Set center position.
     * @param x - Center x.
     * @param y - Center y.
     * @returns This instance.
     */
    setCenterPosition(
        x: number,
        y: number
    ): this;
    /**
     * Center x.
     */
    x: number;
    /**
     * Center y.
     */
    y: number;

    /**
     * Set radius values.
     * @param radiusX - Radius x.
     * @param radiusY - Radius y.
     * @returns This instance.
     */
    setRadius(
        radiusX: number,
        radiusY?: number
    ): this;
    /**
     * Radius x.
     */
    radiusX: number;
    /**
     * Radius y.
     */
    radiusY: number;

    /**
     * Set arc angles.
     * @param startAngle - Start angle (radians).
     * @param endAngle - End angle (radians).
     * @param anticlockwise - True to draw anticlockwise.
     * @returns This instance.
     */
    setAngle(
        startAngle: number,
        endAngle: number,
        anticlockwise?: boolean
    ): this;
    /**
     * Start angle.
     */
    startAngle: number;
    /**
     * End angle.
     */
    endAngle: number;
    /**
     * Anticlockwise flag.
     */
    anticlockwise: boolean;

    /**
     * Set pie mode.
     * @param pie - True to draw as pie.
     * @returns This instance.
     */
    setPie(pie: boolean): this;
    /**
     * Pie mode.
     */
    pie: boolean;

    /**
     * Set iteration count.
     * @param iterations - Iteration count.
     * @returns This instance.
     */
    setIterations(iterations: number): this;
    /**
     * Iteration count.
     */
    iterations: number;
}
