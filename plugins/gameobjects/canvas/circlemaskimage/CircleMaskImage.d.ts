import Canvas from '../canvas/Canvas';

export default CircleMaskImage;

declare namespace CircleMaskImage {
    /**
     * Mask shape types supported by circle mask image.
     */
    type MaskType = null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle';

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
     * Per-corner radius configuration for rounded rectangle mask.
     */
    interface ICornerRadiusConfig {
        /**
         * Top-left corner radius.
         */
        tl?: number | IRadiusXY,
        /**
         * Top-right corner radius.
         */
        tr?: number | IRadiusXY,
        /**
         * Bottom-left corner radius.
         */
        bl?: number | IRadiusXY,
        /**
         * Bottom-right corner radius.
         */
        br?: number | IRadiusXY
    }

    /**
     * Radius config value accepted by circle mask image.
     */
    type RadiusType = number | IRadiusXY | ICornerRadiusConfig;

    /**
     * Configuration options for creating a circle-mask image.
     */
    interface IConfig {
        /**
         * Mask shape type.
         */
        maskType?: MaskType,
        /**
         * Radius configuration of mask shape.
         */
        radius?: RadiusType,

        /**
         * Background color filled before masking.
         */
        backgroundColor?: string,

        /**
         * Stroke color of mask outline.
         */
        strokeColor?: string,
        /**
         * Stroke line width of mask outline.
         */
        strokeLineWidth?: number,
    }
}

/**
 * Canvas image object rendered with circle/ellipse/rounded-rectangle mask.
 */
declare class CircleMaskImage extends Canvas {
    /**
     * Create a circle-mask image object.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param key - Source texture key.
     * @param frame - Source frame key.
     * @param config - Mask type or mask configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string,
        config?:
            CircleMaskImage.MaskType |
            CircleMaskImage.IConfig
    );

    /**
     * Set source texture and mask configuration.
     *
     * @param key - Source texture key.
     * @param frame - Source frame key.
     * @param config - Mask type or mask configuration.
     * @returns This game object.
     */
    setTexture(
        key?: string,
        frame?: string,
        config?:
            CircleMaskImage.MaskType |
            CircleMaskImage.IConfig
    ): this;
}
