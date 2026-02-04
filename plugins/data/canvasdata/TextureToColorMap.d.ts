import CanvasData from "./canvasdata/CanvasData";

export default TextureTColorMap;

declare namespace TextureTColorMap {
    /**
     * Configuration options for selecting a region from the source texture.
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
 * Convert a game object or frame texture into color map data.
 *
 * @param gameObject - Source game object or texture frame.
 * @param config - Optional region selection configuration.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the source texture.
 */
declare function TextureTColorMap(
    gameObject: Phaser.GameObjects.GameObject | Phaser.Textures.Frame,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

/**
 * Convert a game object or frame texture into color map data.
 *
 * @param gameObject - Source game object or texture frame.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the source texture.
 */
declare function TextureTColorMap(
    gameObject: Phaser.GameObjects.GameObject | Phaser.Textures.Frame,
    out?: CanvasData
): CanvasData;

/**
 * Convert a texture frame into color map data.
 *
 * @param key - Texture key in the texture manager.
 * @param frameName - Frame name inside the texture, or null for the default frame.
 * @param config - Optional region selection configuration.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the texture frame.
 */
declare function TextureTColorMap(
    key: string,
    frameName: string | null,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

/**
 * Convert a texture frame into color map data.
 *
 * @param key - Texture key in the texture manager.
 * @param frameName - Frame name inside the texture, or null for the default frame.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the texture frame.
 */
declare function TextureTColorMap(
    key: string,
    frameName: string | null,
    out?: CanvasData
): CanvasData;

/**
 * Convert a texture into color map data.
 *
 * @param key - Texture key in the texture manager.
 * @param config - Optional region selection configuration.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the texture.
 */
declare function TextureTColorMap(
    key: string,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

/**
 * Convert a texture into color map data.
 *
 * @param key - Texture key in the texture manager.
 * @param out - Optional output canvas data object to reuse.
 * @returns Color map data generated from the texture.
 */
declare function TextureTColorMap(
    key: string,
    out?: CanvasData
): CanvasData;
