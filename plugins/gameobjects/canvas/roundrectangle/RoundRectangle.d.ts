import Canvas from '../canvas/Canvas';

export default RoundRectangle;

declare namespace RoundRectangle {
    /**
     * 2D radius value.
     */
    interface IRadiusXY {
        /**
         * Horizontal radius.
         */
        x?: number,
        /**
         * Vertical radius.
         */
        y?: number
    }

    /**
     * Radius value accepted by each corner.
     */
    type CornerRadiusType = number | IRadiusXY;

    /**
     * Radius configuration for rounded rectangle corners.
     */
    interface IRadiusConfig {
        /**
         * Top-left corner radius.
         */
        tl?: CornerRadiusType,
        /**
         * Top-right corner radius.
         */
        tr?: CornerRadiusType,
        /**
         * Bottom-left corner radius.
         */
        bl?: CornerRadiusType,
        /**
         * Bottom-right corner radius.
         */
        br?: CornerRadiusType,

        /**
         * Shared horizontal radius.
         */
        x?: number,
        /**
         * Shared vertical radius.
         */
        y?: number,
    }

    /**
     * Full radius and iteration configuration.
     */
    interface IRadiusAdvancedConfig {
        /**
         * Radius value.
         */
        radius?: number | IRadiusConfig,
        /**
         * Corner curve iteration count.
         */
        iteration?: number
    }

    /**
     * Constructor radius argument type.
     */
    type RadiusInputType = number | IRadiusConfig | IRadiusAdvancedConfig;
}

/**
 * Canvas game object that draws a rounded rectangle.
 */
declare class RoundRectangle extends Canvas {
    /**
     * Create a rounded rectangle object.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Rectangle width.
     * @param height - Rectangle height.
     * @param radiusConfig - Radius or radius configuration.
     * @param fillStyle - Primary fill color style.
     * @param strokeStyle - Stroke color style.
     * @param lineWidth - Stroke line width.
     * @param fillColor2 - Secondary fill color style.
     * @param isHorizontalGradient - True for horizontal fill gradient.
     * @param resolution - Canvas texture resolution.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        radiusConfig?: RoundRectangle.RadiusInputType,
        fillStyle?: number | string | null,
        strokeStyle?: number | string | null,
        lineWidth?: number,

        fillColor2?: number | string | null,
        isHorizontalGradient?: boolean,

        resolution?: number,
    );

    /**
     * Current primary fill style.
     */
    fillStyle: string;
    /**
     * Current secondary fill style.
     */
    fillColor2: string;
    /**
     * Current gradient direction flag.
     */
    isHorizontalGradient: boolean;
    /**
     * Set fill styles.
     *
     * @param fillStyle - Primary fill color style.
     * @param fillColor2 - Secondary fill color style.
     * @param isHorizontalGradient - True for horizontal fill gradient.
     * @returns This game object.
     */
    setFillStyle(
        fillStyle?: number | string | null,
        fillColor2?: number | string | null,
        isHorizontalGradient?: boolean
    ): this;

    /**
     * Current stroke style.
     */
    strokeStyle: string;
    /**
     * Current stroke line width.
     */
    lineWidth: number;
    /**
     * Set stroke style.
     *
     * @param strokeStyle - Stroke color style.
     * @param lineWidth - Stroke line width.
     * @returns This game object.
     */
    setStrokeStyle(
        strokeStyle?: number | string | null,
        lineWidth?: number
    ): this;

    /**
     * Current radius setting.
     */
    radius: number | RoundRectangle.IRadiusConfig;
    /**
     * Set radius value.
     *
     * @param value - Radius value or radius config.
     * @returns This game object.
     */
    setRadius(
        value?: number | RoundRectangle.IRadiusConfig
    ): this;

    /**
     * Current corner curve iteration count.
     */
    iteration: number;
    /**
     * Set corner curve iteration count.
     *
     * @param value - Iteration count.
     * @returns This game object.
     */
    setIteration(value?: number): this;
}
