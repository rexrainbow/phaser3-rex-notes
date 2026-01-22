// import * as Phaser from 'phaser';

export default RoundRectangle;

declare namespace RoundRectangle {

    /**
     * Corner radius with convex flag.
     */
    type CornerRadiusType = {
        /**
         * Radius x.
         */
        x: number,
        /**
         * Radius y.
         */
        y: number,
        /**
         * True if convex.
         */
        convex: boolean
    };

    /**
     * Radius value or per-axis config.
     */
    type RadiusType = number | { x?: number, y?: number };

    interface IRadiusConfig {
        /**
         * Top-left radius.
         */
        tl?: RadiusType,
        /**
         * Top-right radius.
         */
        tr?: RadiusType,
        /**
         * Bottom-left radius.
         */
        bl?: RadiusType,
        /**
         * Bottom-right radius.
         */
        br?: RadiusType,

        /**
         * Uniform radius x.
         */
        x?: number,
        /**
         * Uniform radius y.
         */
        y?: number,
    }

    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,
        /**
         * Radius configuration.
         */
        radius?: number | IRadiusConfig |
        ({
            /**
             * Radius configuration.
             */
            radius?: (number | IRadiusConfig),
            /**
             * Corner iteration.
             */
            iteration?: number
        }),

        /**
         * Fill color.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,

        /**
         * Stroke color.
         */
        strokeColor?: number,
        /**
         * Stroke alpha.
         */
        strokeAlpha?: number,
        /**
         * Stroke width.
         */
        strokeWidth?: number,

        /**
         * Shape type.
         */
        shape?: 0 | 'rectangle' | 1 | 'circle',
    }

}

/**
 * Rounded rectangle shape game object.
 */
declare class RoundRectangle extends Phaser.GameObjects.Shape {
    /**
     * Create a rounded rectangle.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     * @param radiusConfig - Radius configuration.
     * @param fillColor - Fill color.
     * @param fillAlpha - Fill alpha.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radiusConfig?: number | RoundRectangle.IRadiusConfig |
            ({
                radius?: (number | RoundRectangle.IRadiusConfig),
                iteration?: number
            }),
        fillColor?: number,
        fillAlpha?: number
    );

    /**
     * Create a rounded rectangle from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: RoundRectangle.IConfig
    )

    /**
     * Resize the shape.
     * @param width - New width.
     * @param height - New height.
     * @returns This instance.
     */
    resize(width: number, height: number): this;

    /**
     * Set corner iteration.
     * @param iteration - Iteration value.
     * @returns This instance.
     */
    setIteration(iteration: number): this;
    /**
     * Corner iteration value.
     */
    iteration: number;

    /**
     * Set radius for all corners.
     * @param value - Radius config.
     * @returns This instance.
     */
    setRadius(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    /**
     * Radius value.
     */
    radius: number;

    /**
     * Set top-left radius.
     * @param value - Radius config.
     * @returns This instance.
     */
    setRadiusTL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    /**
     * Top-left radius.
     */
    radiusTL: number;

    /**
     * Set top-right radius.
     * @param value - Radius config.
     * @returns This instance.
     */
    setRadiusTR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    /**
     * Top-right radius.
     */
    radiusTR: number;

    /**
     * Set bottom-left radius.
     * @param value - Radius config.
     * @returns This instance.
     */
    setRadiusBL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    /**
     * Bottom-left radius.
     */
    radiusBL: number;

    /**
     * Set bottom-right radius.
     * @param value - Radius config.
     * @returns This instance.
     */
    setRadiusBR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    /**
     * Bottom-right radius.
     */
    radiusBR: number;

    /**
     * Corner radius data.
     */
    readonly cornerRadius: {
        /**
         * Top-left corner radius.
         */
        tl: RoundRectangle.CornerRadiusType,
        /**
         * Top-right corner radius.
         */
        tr: RoundRectangle.CornerRadiusType,
        /**
         * Bottom-left corner radius.
         */
        bl: RoundRectangle.CornerRadiusType,
        /**
         * Bottom-right corner radius.
         */
        br: RoundRectangle.CornerRadiusType,
    };
}
