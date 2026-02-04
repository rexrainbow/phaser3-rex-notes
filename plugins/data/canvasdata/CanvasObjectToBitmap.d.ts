import CanvasData from "./canvasdata/CanvasData";

export default CanvasObjectToBitmap;

declare namespace CanvasObjectToBitmap {
    /**
     * Configuration options for selecting a region from the source object.
     */
    interface IConfig {
        /**
         * Left position of the capture region in source coordinates.
         */
        x?: number,
        /**
         * Top position of the capture region in source coordinates.
         */
        y?: number,
        /**
         * Width of the capture region.
         */
        width?: number,
        /**
         * Height of the capture region.
         */
        height?: number,
    }
}

/**
 * Convert a game object render result into bitmap data.
 *
 * @param gameObject - Source game object to capture.
 * @param config - Optional region selection configuration.
 * @param out - Optional output canvas data object to reuse.
 * @returns Bitmap data generated from the source object.
 */
declare function CanvasObjectToBitmap(
    gameObject: Phaser.GameObjects.GameObject,
    config?: CanvasObjectToBitmap.IConfig,
    out?: CanvasData
): CanvasData;

/**
 * Convert a game object render result into bitmap data.
 *
 * @param gameObject - Source game object to capture.
 * @param out - Optional output canvas data object to reuse.
 * @returns Bitmap data generated from the source object.
 */
declare function CanvasObjectToBitmap(
    gameObject: Phaser.GameObjects.GameObject,
    out?: CanvasData
): CanvasData;
