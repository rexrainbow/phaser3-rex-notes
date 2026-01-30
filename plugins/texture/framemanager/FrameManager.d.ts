export default FrameManager;

declare namespace FrameManager {
    /**
     * Configuration options for creating a FrameManager.
     */
    interface IConfig {
        /**
         * Texture key.
         */
        key: string,
        /**
         * Texture width.
         */
        width?: number,
        /**
         * Texture height.
         */
        height?: number,
        /**
         * Cell width.
         */
        cellWidth?: number,
        /**
         * Cell height.
         */
        cellHeight?: number,
        /**
         * Cell padding.
         */
        cellPadding?: number,
        /**
         * Number of columns.
         */
        columns?: number,
        /**
         * Number of rows.
         */
        rows?: number,        
        /**
         * Fill color.
         */
        fillColor?: string | number,
        /**
         * Use dynamic texture.
         */
        useDynamicTexture?: boolean
    }

    /**
     * Draw callback for canvas frames.
     *
     * @param canvasElem - Canvas element.
     * @param context - 2D context.
     * @param frameSize - Frame size.
     */
    type DrawCanvasFrameCallback = (
        canvasElem: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        frameSize: {
            width: number,
            height: number
        }
    ) => void;

    /**
     * Draw callback for dynamic texture frames.
     *
     * @param texture - Dynamic texture.
     * @param frameSize - Frame size.
     */
    type DrawDynamicTextureFrameCallback = (
        texture: Phaser.Textures.DynamicTexture,
        frameSize: {
            width: number,
            height: number
        }
    ) => void
}

/**
 * Manager for packing and drawing frames into a texture.
 */
declare class FrameManager {
    /**
     * Create a FrameManager with explicit dimensions.
     *
     * @param scene - Scene or game instance.
     * @param key - Texture key.
     * @param width - Texture width.
     * @param height - Texture height.
     * @param cellWidth - Cell width.
     * @param cellHeight - Cell height.
     * @param fillColor - Fill color.
     * @param useDynamicTexture - Whether to use a dynamic texture.
     */
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        fillColor?: string | number,
        useDynamicTexture?: boolean
    );

    /**
     * Create a FrameManager without fill color.
     *
     * @param scene - Scene or game instance.
     * @param key - Texture key.
     * @param width - Texture width.
     * @param height - Texture height.
     * @param cellWidth - Cell width.
     * @param cellHeight - Cell height.
     * @param useDynamicTexture - Whether to use a dynamic texture.
     */
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        key: string,
        width?: number,
        height?: number,
        cellWidth?: number,
        cellHeight?: number,
        useDynamicTexture?: boolean
    );

    /**
     * Create a FrameManager with config object.
     *
     * @param scene - Scene or game instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        config: FrameManager.IConfig
    );

    /**
     * Whether dynamic texture is used.
     */
    readonly useDynamicTexture: boolean;
    /**
     * Texture key.
     */
    readonly key: string;
    /**
     * Texture instance.
     */
    readonly texture: Phaser.Textures.CanvasTexture | Phaser.Textures.DynamicTexture;
    /**
     * Canvas element when using canvas texture.
     */
    readonly canvas: HTMLCanvasElement | undefined;
    /**
     * Canvas context when using canvas texture.
     */
    readonly context: CanvasRenderingContext2D | undefined;
    /**
     * Texture width.
     */
    readonly width: number;
    /**
     * Texture height.
     */
    readonly height: number;
    /**
     * Cell width.
     */
    readonly cellWidth: number;
    /**
     * Cell height.
     */
    readonly cellHeight: number;
    /**
     * True if no more frames can be added.
     */
    readonly isFull: boolean;

    /**
     * Destroy the manager.
     */
    destroy(): void;

    /**
     * Stop drawing or updating.
     *
     * @returns This FrameManager instance.
     */
    stop(): this;

    /**
     * Add a camera for updates.
     *
     * @param camera - Camera instance.
     * @returns This FrameManager instance.
     */
    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera
    ): this;

    /**
     * Draw a frame using a callback.
     *
     * @param frameName - Frame name or index.
     * @param callback - Draw callback.
     * @param scope - Callback scope.
     * @returns This FrameManager instance.
     */
    draw(
        frameName: string | number,
        callback: FrameManager.DrawCanvasFrameCallback | FrameManager.DrawDynamicTextureFrameCallback,
        scope?: object
    ): this;

    /**
     * Paste a game object into a frame.
     *
     * @param frameName - Frame name or index.
     * @param gameObject - Source game object.
     * @returns This FrameManager instance.
     */
    paste(
        frameName: string | number,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Add an empty frame.
     *
     * @param frameName - Frame name or index.
     * @param width - Frame width.
     * @param height - Frame height.
     * @returns This FrameManager instance.
     */
    addEmptyFrame(
        frameName: string | number,
        width?: number,
        height?: number
    ): this;

    /**
     * Update the texture.
     *
     * @returns This FrameManager instance.
     */
    updateTexture(): this;

    /**
     * Remove a frame.
     *
     * @param frameName - Frame name or index.
     * @returns This FrameManager instance.
     */
    remove(
        frameName: string | number
    ): this;

    /**
     * Clear all frames.
     *
     * @returns This FrameManager instance.
     */
    clear(): this;

    /**
     * Check if a frame exists.
     *
     * @param frameName - Frame name or index.
     * @returns True if the frame exists.
     */
    contains(
        frameName: string | number
    ): boolean;
}
