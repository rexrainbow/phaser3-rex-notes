export default SpiralCurve;

declare namespace SpiralCurve {
    /**
     * Configuration options for creating a SpiralCurve.
     */
    interface IConfig {
        /**
         * Start x position of the spiral center interpolation.
         */
        startX?: number,
        /**
         * End x position of the spiral center interpolation.
         */
        endX?: number,
        /**
         * Easing function name for x interpolation.
         */
        easeX?: string,
        /**
         * Start y position of the spiral center interpolation.
         */
        startY?: number,
        /**
         * End y position of the spiral center interpolation.
         */
        endY?: number,
        /**
         * Easing function name for y interpolation.
         */
        easeY?: string,

        /**
         * Fixed x position of the spiral center.
         */
        x?: number,
        /**
         * Fixed y position of the spiral center.
         */
        y?: number,

        /**
         * Start x radius interpolation value.
         */
        startXRadius?: number,
        /**
         * End x radius interpolation value.
         */
        endXRadius?: number,
        /**
         * Easing function name for x radius interpolation.
         */
        easeXRadius?: string,

        /**
         * Start y radius interpolation value.
         */
        startYRadius?: number,
        /**
         * End y radius interpolation value.
         */
        endYRadius?: number,
        /**
         * Easing function name for y radius interpolation.
         */
        easeYRadius?: string,

        /**
         * Start radius interpolation value.
         */
        startRadius?: number,
        /**
         * End radius interpolation value.
         */
        endRadius?: number,

        /**
         * Start angle in degrees.
         */
        startAngle?: number,
        /**
         * End angle in degrees.
         */
        endAngle?: number,
        /**
         * Easing function name for angle interpolation.
         */
        easeAngle?: string,

        /**
         * Curve rotation in degrees.
         */
        rotation?: number
    }
}

/**
 * Spiral curve implementation with interpolated center, radius, and angle.
 * Angle-related values are in degrees.
 */
declare class SpiralCurve extends Phaser.Curves.Curve {
    /**
     * Create a SpiralCurve from configuration.
     *
     * @param config - Spiral curve configuration.
     */
    constructor(
        config?: SpiralCurve.IConfig
    );

    /**
     * Create a SpiralCurve from primitive parameters.
     *
     * @param x - Center x position.
     * @param y - Center y position.
     * @param startRadius - Start radius.
     * @param endRadius - End radius.
     * @param startAngle - Start angle in degrees.
     * @param endAngle - End angle in degrees.
     * @param rotation - Curve rotation in degrees.
     */
    constructor(
        x?: number,
        y?: number,
        startRadius?: number,
        endRadius?: number,
        startAngle?: number,
        endAngle?: number,
        rotation?: number
    );

    /**
     * Set start x position.
     *
     * @param x - Start x position.
     * @returns This SpiralCurve instance.
     */
    setStartX(x: number): this;
    /**
     * Set start y position.
     *
     * @param y - Start y position.
     * @returns This SpiralCurve instance.
     */
    setStartY(y: number): this;
    /**
     * Start x position.
     */
    startX: number;
    /**
     * Start y position.
     */
    startY: number;
    /**
     * Start point vector.
     */
    readonly p0: { x: number, y: number };

    /**
     * Set end x position.
     *
     * @param x - End x position.
     * @returns This SpiralCurve instance.
     */
    setEndX(x: number): this;
    /**
     * Set end y position.
     *
     * @param y - End y position.
     * @returns This SpiralCurve instance.
     */
    setEndY(y: number): this;
    /**
     * End x position.
     */
    endX: number;
    /**
     * End y position.
     */
    endY: number;
    /**
     * End point vector.
     */
    readonly p1: { x: number, y: number };

    /**
     * Set start x radius.
     *
     * @param radius - Start x radius.
     * @returns This SpiralCurve instance.
     */
    setStartXRadius(radius: number): this;
    /**
     * Set start y radius.
     *
     * @param radius - Start y radius.
     * @returns This SpiralCurve instance.
     */
    setStartYRadius(radius: number): this;
    /**
     * Start x radius.
     */
    startXRadius: number;
    /**
     * Start y radius.
     */
    startYRadius: number;
    /**
     * Set end x radius.
     *
     * @param radius - End x radius.
     * @returns This SpiralCurve instance.
     */
    setEndXRadius(radius: number): this;
    /**
     * Set end y radius.
     *
     * @param radius - End y radius.
     * @returns This SpiralCurve instance.
     */
    setEndYRadius(radius: number): this;
    /**
     * End x radius.
     */
    endXRadius: number;
    /**
     * End y radius.
     */
    endYRadius: number;

    /**
     * Set start angle in degrees.
     *
     * @param degrees - Start angle in degrees.
     * @returns This SpiralCurve instance.
     */
    setStartAngle(degrees: number): this;
    /**
     * Set end angle in degrees.
     *
     * @param degrees - End angle in degrees.
     * @returns This SpiralCurve instance.
     */
    setEndAngle(degrees: number): this;
    /**
     * Start angle in degrees.
     */
    startAngle: number;
    /**
     * End angle in degrees.
     */
    endAngle: number;
}
