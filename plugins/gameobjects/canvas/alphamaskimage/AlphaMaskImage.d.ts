import Canvas from '../canvas/Canvas';

export default AlphaMaskImage;

declare namespace AlphaMaskImage {

    /**
     * Configuration options for creating an alpha-mask image.
     */
    interface IConfig {
        /**
         * Alpha mask source settings.
         */
        mask: {
            /**
             * Texture key of the mask image.
             */
            key: string,
            /**
             * Optional frame of the mask image.
             */
            frame?: string,
            /**
             * Set to true to invert alpha mask effect.
             */
            invertAlpha?: boolean,
            /**
             * Scale applied to the mask texture.
             */
            scale?: number,
        },

        /**
         * Background color filled before applying mask.
         */
        backgroundColor?: string,
    }
}

/**
 * Canvas game object that renders texture with alpha mask.
 */
declare class AlphaMaskImage extends Canvas {
    /**
     * Create an alpha-mask image object.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param key - Source texture key.
     * @param frame - Source frame key.
     * @param config - Optional alpha-mask configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string,
        config?: AlphaMaskImage.IConfig
    );

    /**
     * Set source texture and optional mask configuration.
     *
     * @param key - Source texture key.
     * @param frame - Source frame key.
     * @param config - Optional alpha-mask configuration.
     * @returns This game object.
     */
    setTexture(
        key?: string,
        frame?: string,
        config?: AlphaMaskImage.IConfig
    ): this;
}
