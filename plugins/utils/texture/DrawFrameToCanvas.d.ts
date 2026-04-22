export default DrawFrameToCanvas;

/**
 * Draw a texture frame to a canvas or 2D rendering context.
 *
 * @param frame - Source texture frame.
 * @param canvasOrContext - Target canvas or 2D rendering context.
 * @param x - Destination x position.
 * @param y - Destination y position.
 * @param width - Destination width.
 * @param height - Destination height.
 * @param color - Optional tint fill color.
 * @param autoRound - Round destination position before drawing.
 * @param tintMode - Optional tint mode.
 */
declare function DrawFrameToCanvas(
    frame: Phaser.Textures.Frame,
    canvasOrContext: HTMLCanvasElement | CanvasRenderingContext2D,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: string | CanvasGradient | CanvasPattern | null,
    autoRound?: boolean,
    tintMode?: number
): void;
