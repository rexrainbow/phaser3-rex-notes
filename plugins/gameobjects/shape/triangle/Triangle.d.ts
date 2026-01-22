import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default Triangle;

declare namespace Triangle {
    /**
     * Direction identifiers.
     */
    type DirectionType = 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up';

    interface IPaddingConfig {
        /**
         * Horizontal padding.
         */
        x?: number,
        /**
         * Vertical padding.
         */
        y?: number,

        /**
         * Left padding.
         */
        left?: number,
        /**
         * Right padding.
         */
        right?: number,
        /**
         * Top padding.
         */
        top?: number,
        /**
         * Bottom padding.
         */
        bottom?: number,
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
         * Width of the triangle.
         */
        width?: number,
        /**
         * Height of the triangle.
         */
        height?: number,

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
         * True to draw arrow only.
         */
        arrowOnly?: boolean,

        /**
         * Direction value.
         */
        direction?: DirectionType,
        /**
         * Direction change ease duration.
         */
        easeDuration?: number,
        /**
         * Padding value or configuration.
         */
        padding?: number | IPaddingConfig,

        /**
         * Corner radius value.
         */
        radius?: number,
    }
}

/**
 * Triangle shape with direction and padding controls.
 */
declare class Triangle extends BaseShapes {
    /**
     * Create a triangle.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Triangle.IConfig
    );

    /**
     * Create a triangle.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the triangle.
     * @param height - Height of the triangle.
     * @param fillColor - Fill color.
     * @param fillAlpha - Fill alpha.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        fillColor?: number,
        fillAlpha?: number
    );

    /**
     * Arrow-only flag.
     */
    arrowOnly: boolean;
    /**
     * Set arrow-only flag.
     * @param enable - True to draw arrow only.
     * @returns This instance.
     */
    setArrowOnly(enable?: boolean): this;

    /**
     * Direction change ease duration.
     */
    easeDuration: number;
    /**
     * Set direction change ease duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setEaseDuration(duration?: number): this;

    /**
     * Direction value.
     */
    direction: number;
    /**
     * Set direction value.
     * @param direction - Direction value.
     * @param easeDuration - Ease duration in ms.
     * @returns This instance.
     */
    setDirection(
        direction: Triangle.DirectionType,
        easeDuration?: number
    ): this;
    /**
     * Toggle direction.
     * @param easeDuration - Ease duration in ms.
     * @returns This instance.
     */
    toggleDirection(easeDuration?: number): this;

    /**
     * Current padding.
     */
    padding: {
        left: number,
        right: number,
        top: number,
        bottom: number,
    };
    /**
     * Set padding by values.
     * @param left - Left padding.
     * @param top - Top padding.
     * @param right - Right padding.
     * @param bottom - Bottom padding.
     * @returns This instance.
     */
    setPadding(
        left?: number,
        top?: number,
        right?: number,
        bottom?: number
    ): this;
    /**
     * Set padding by config.
     * @param padding - Padding configuration.
     * @returns This instance.
     */
    setPadding(padding?: Triangle.IPaddingConfig): this;

    /**
     * Corner radius value.
     */
    radius: number;
    /**
     * Set corner radius.
     * @param radius - Corner radius value.
     * @returns This instance.
     */
    setRadius(radius?: number): this;

    /**
     * Vertice rotation in radians.
     */
    verticeRotation: number;
    /**
     * Set vertice rotation.
     * @param rotation - Rotation in radians.
     * @returns This instance.
     */
    setVerticeRotation(rotation: number): this;

    /**
     * Vertice angle in radians.
     */
    verticeAngle: number;
    /**
     * Set vertice angle.
     * @param angle - Angle in radians.
     * @returns This instance.
     */
    setVerticeAngle(angle: number): this;

}
