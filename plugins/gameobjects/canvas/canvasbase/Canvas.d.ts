// import * as Phaser from 'phaser';
import CanvasGameObjectBase from '../../../utils/types/CanvasGameObjectBase';

/**
 * Canvas-backed game object with texture update helpers.
 */
export default class Canvas extends CanvasGameObjectBase {
    /**
     * Create a canvas game object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The canvas width.
     * @param height - The canvas height.
     * @param resolution - Canvas resolution.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        resolution?: number,
    );

    /**
     * Current resolution value.
     */
    readonly resolution: number;
    /**
     * Set resolution.
     * @param resolution - Resolution value.
     * @returns This instance.
     */
    setResolution(resolution: number): this;

    /**
     * Canvas element.
     */
    canvas: HTMLCanvasElement;
    /**
     * Canvas 2D context.
     */
    context: CanvasRenderingContext2D;
    /**
     * Get the canvas element.
     * @param readOnly - True to return without marking dirty.
     * @returns The canvas element.
     */
    getCanvas(readOnly?: boolean): HTMLCanvasElement;
    /**
     * Get the canvas 2D context.
     * @param readOnly - True to return without marking dirty.
     * @returns The 2D context.
     */
    getContext(readOnly?: boolean): CanvasRenderingContext2D;

    /**
     * Set size of the game object.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    setSize(width: number, height: number): this;
    /**
     * Resize the canvas.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    resize(width: number, height: number): this;
    /**
     * Set the canvas size.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    setCanvasSize(width: number, height: number): this;

    /**
     * Mark the canvas as needing redraw.
     * @returns This instance.
     */
    needRedraw(): this;
    /**
     * True if the canvas is dirty.
     */
    dirty: boolean;

    /**
     * Clear the canvas.
     * @returns This instance.
     */
    clear(): this;
    /**
     * Fill the canvas with a color.
     * @param color - Fill color.
     * @returns This instance.
     */
    fill(color: string): this;

    /**
     * Update the texture from the canvas.
     * @param callback - Optional draw callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    updateTexture(
        callback?: (canvasElem: HTMLCanvasElement, context: CanvasRenderingContext2D) => void,
        scope?: object
    ): this;

    /**
     * Generate a texture from the canvas.
     * @param key - Texture key.
     * @param x - Source x.
     * @param y - Source y.
     * @param width - Source width.
     * @param height - Source height.
     * @returns This instance.
     */
    generateTexture(
        key: string | number,
        x?: number, y?: number,
        width?: number, height?: number
    ): this;

    /**
     * Load a texture into the canvas.
     * @param key - Texture key.
     * @param frame - Frame name.
     * @returns This instance.
     */
    loadTexture(
        key: string,
        frame?: string,
    ): this;

    /**
     * Draw a frame to the canvas.
     * @param key - Texture key.
     * @param frame - Frame name.
     * @param dx - Destination x.
     * @param dy - Destination y.
     * @param dWidth - Destination width.
     * @param dHeight - Destination height.
     * @param sxOffset - Source x offset.
     * @param syOffset - Source y offset.
     * @param sWidth - Source width.
     * @param sHeight - Source height.
     * @returns This instance.
     */
    drawFrame(
        key: string,
        frame?: string,
        dx?: number,
        dy?: number,
        dWidth?: number,
        dHeight?: number,
        sxOffset?: number,
        syOffset?: number,
        sWidth?: number,
        sHeight?: number,
    ): this;

    /**
     * Get canvas data URL.
     * @param type - Mime type.
     * @param encoderOptions - Encoder options.
     * @returns Data URL string.
     */
    getDataURL(
        type?: string,
        encoderOptions?: number
    ): string;

    /**
     * Get pixel color at a position.
     * @param x - X position.
     * @param y - Y position.
     * @returns The color.
     */
    getPixel(
        x: number, y: number
    ): Phaser.Display.Color;

    /**
     * Set pixel color at a position.
     * @param x - X position.
     * @param y - Y position.
     * @param r - Red value or color object.
     * @param g - Green value.
     * @param b - Blue value.
     * @param a - Alpha value.
     * @returns This instance.
     */
    setPixel(
        x: number, y: number,
        r: number | Phaser.Display.Color,
        g?: number,
        b?: number,
        a?: number
    ): this;

}
