import ImageBoxBase from './ImageBoxBase';

export default ImageBox;

declare namespace ImageBox {

    /**
     * Configuration for creating an image box.
     */
    interface IConfig {
        /**
         * World x position.
         */
        x?: number,
        /**
         * World y position.
         */
        y?: number,
        /**
         * Texture key.
         */
        key?: string,
        /**
         * Texture frame key.
         */
        frame?: string,

        /**
         * Allow scaling image above its original size.
         */
        scaleUp?: boolean,
        /**
         * Display width.
         */
        width?: number,
        /**
         * Display height.
         */
        height?: number,

        /**
         * Background definition or background game object.
         */
        background?: ImageBoxBase.IRectangle | Phaser.GameObjects.GameObject,
        /**
         * Image game object to use instead of auto-created one.
         */
        image?: Phaser.GameObjects.GameObject,

    }
}

/**
 * Image container with optional background and fit-to-size behavior.
 */
declare class ImageBox extends ImageBoxBase {
    /**
     * Create an image box from configuration.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional image box configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ImageBox.IConfig
    );

    /**
     * Create an image box.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param texture - Texture key.
     * @param frame - Texture frame key.
     * @param config - Optional image box configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        texture?: string,
        frame?: string,
        config?: ImageBox.IConfig
    );

    /**
     * Create an image box using position and configuration.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param config - Optional image box configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        config?: ImageBox.IConfig
    );
}
