// import * as Phaser from 'phaser';
import Image from '../image/Image';
export default RenderTexture;

declare namespace RenderTexture {

    /**
     * Configuration for creating a perspective render texture mesh.
     */
    interface IConfig extends Image.IConfig {
        /**
         * Initial texture width.
         */
        width?: number,
        /**
         * Initial texture height.
         */
        height?: number,
    }

    /**
     * Configuration for snapshot rendering into the internal render texture.
     */
    interface SnapshotIConfig {
        /**
         * Snapshot origin x.
         */
        x?: number,
        /**
         * Snapshot origin y.
         */
        y?: number,
        /**
         * Snapshot width.
         */
        width?: number,
        /**
         * Snapshot height.
         */
        height?: number,
        /**
         * Extra padding around snapshot bounds.
         */
        padding?: number,
    }

}

/**
 * Perspective mesh image backed by a dynamic render texture.
 */
declare class RenderTexture extends Image {
    /**
     * Create a perspective render texture mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position or configuration object.
     * @param y - World y position.
     * @param width - Initial texture width.
     * @param height - Initial texture height.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number | RenderTexture.IConfig,
        y?: number,
        width?: number,
        height?: number,
        config?: RenderTexture.IConfig
    )

    /**
     * Internal render texture used by this game object.
     */
    readonly rt: Phaser.GameObjects.RenderTexture;

    /**
     * Render game objects into the internal render texture.
     *
     * @param gameObjects - Game objects to render.
     * @param config - Optional snapshot configuration.
     * @returns This render texture instance.
     */
    snapshot(
        gameObjects: Phaser.GameObjects.GameObject[],
        config?: RenderTexture.SnapshotIConfig
    ): this;
}
