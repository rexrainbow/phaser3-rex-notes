import ContainerLite from '../containerlite/ContainerLite';

export default ImageBox;

declare namespace ImageBox {

    /**
     * Configuration options for creating an ImageBox.
     */
    interface IConfig {
        /**
         * X position.
         */
        x?: number,
        /**
         * Y position.
         */
        y?: number,
        /**
         * Texture key for the image.
         */
        texture?: string,
        /**
         * Frame key for the image.
         */
        frame?: string,

        /**
         * Allow the image to scale up to fit.
         */
        scaleUp?: boolean,
        /**
         * Width of the container.
         */
        width?: number,
        /**
         * Height of the container.
         */
        height?: number,

        /**
         * Background game object.
         */
        background?: Phaser.GameObjects.GameObject,
        /**
         * Image game object.
         */
        image?: Phaser.GameObjects.GameObject,

    }
}

/**
 * A container that displays an image with optional background.
 */
declare class ImageBox extends ContainerLite {
    /**
     * Create an ImageBox with texture and frame.
     *
     * @param scene - The Phaser.Scene that owns this ImageBox.
     * @param x - X position.
     * @param y - Y position.
     * @param texture - Texture key.
     * @param frame - Frame key.
     * @param config - Configuration options.
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
     * Create an ImageBox with position and config.
     *
     * @param scene - The Phaser.Scene that owns this ImageBox.
     * @param x - X position.
     * @param y - Y position.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        config?: ImageBox.IConfig
    );

    /**
     * Create an ImageBox with config only.
     *
     * @param scene - The Phaser.Scene that owns this ImageBox.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ImageBox.IConfig
    );

    /**
     * Image game object.
     */
    image: Phaser.GameObjects.GameObject;

    /**
     * Set the image texture and frame.
     *
     * @param texture - Texture key.
     * @param frame - Frame key.
     * @returns This ImageBox instance.
     */
    setTexture(
        texture?: string,
        frame?: string
    ): this;
    /**
     * Current texture.
     */
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Current frame.
     */
    readonly frame: Phaser.Textures.Frame;

    /**
     * Set horizontal flip.
     *
     * @param value - True to flip horizontally.
     * @returns This ImageBox instance.
     */
    setFlipX(value: boolean): this;
    /**
     * Set vertical flip.
     *
     * @param value - True to flip vertically.
     * @returns This ImageBox instance.
     */
    setFlipY(value: boolean): this;
    /**
     * Toggle horizontal flip.
     *
     * @returns This ImageBox instance.
     */
    toggleFlipX(): this;
    /**
     * Toggle vertical flip.
     *
     * @returns This ImageBox instance.
     */
    toggleFlipY(): this;
    /**
     * Set both horizontal and vertical flip.
     *
     * @param x - True to flip horizontally.
     * @param y - True to flip vertically.
     * @returns This ImageBox instance.
     */
    setFlip(x: boolean, y: boolean): this;
    /**
     * Whether the image is flipped horizontally.
     */
    flipX: boolean;
    /**
     * Whether the image is flipped vertically.
     */
    flipY: boolean;
}
