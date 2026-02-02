import ContainerLite from '../../container/containerlite/ContainerLite';

export default ImageBoxBase;

declare namespace ImageBoxBase {
    /**
     * Rectangle style configuration used for auto-created backgrounds.
     */
    interface IRectangle {
        /**
         * Fill color as a hex number.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,
        /**
         * Stroke width.
         */
        strokeWidth?: number,
        /**
         * Stroke color as a hex number.
         */
        strokeColor?: number,
        /**
         * Stroke alpha.
         */
        strokeAlpha?: number,
    }
}

/**
 * Base container for image box game objects.
 */
declare class ImageBoxBase extends ContainerLite {

    /**
     * Optional background game object.
     */
    background: Phaser.GameObjects.GameObject;
    /**
     * Main image game object.
     */
    image: Phaser.GameObjects.GameObject;

    /**
     * Set image texture and frame.
     *
     * @param key - Texture key.
     * @param frame - Texture frame key.
     * @returns This image box instance.
     */
    setTexture(
        key?: string,
        frame?: string
    ): this;
    /**
     * Current texture of the internal image.
     */
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    /**
     * Current texture frame of the internal image.
     */
    readonly frame: Phaser.Textures.Frame;

    /**
     * Set horizontal flip state.
     *
     * @param value - True to flip horizontally.
     * @returns This image box instance.
     */
    setFlipX(value: boolean): this;
    /**
     * Set vertical flip state.
     *
     * @param value - True to flip vertically.
     * @returns This image box instance.
     */
    setFlipY(value: boolean): this;
    /**
     * Toggle horizontal flip state.
     *
     * @returns This image box instance.
     */
    toggleFlipX(): this;
    /**
     * Toggle vertical flip state.
     *
     * @returns This image box instance.
     */
    toggleFlipY(): this;
    /**
     * Set horizontal and vertical flip states.
     *
     * @param x - Horizontal flip state.
     * @param y - Vertical flip state.
     * @returns This image box instance.
     */
    setFlip(
        x: boolean,
        y: boolean
    ): this;
    /**
     * Whether horizontal flip is enabled.
     */
    flipX: boolean;
    /**
     * Whether vertical flip is enabled.
     */
    flipY: boolean;

    /**
     * Set tint colors of the internal image corners.
     *
     * @param topLeft - Top-left tint color.
     * @param topRight - Top-right tint color.
     * @param bottomLeft - Bottom-left tint color.
     * @param bottomRight - Bottom-right tint color.
     * @returns This image box instance.
     */
    setTint(
        topLeft?: number,
        topRight?: number,
        bottomLeft?: number,
        bottomRight?: number
    ): this;
}
