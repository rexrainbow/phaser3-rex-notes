// import * as Phaser from 'phaser';
import SkewImage from '../skewimage/SkewImage';

export default SkewRenderTexture;

declare namespace SkewRenderTexture {

    /**
     * Configuration for creating a skew quad render texture mesh.
     */
    interface IConfig extends SkewImage.IConfig {
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
 * Skewable quad mesh image backed by a dynamic render texture.
 */
declare class SkewRenderTexture extends SkewImage {
    /**
     * Create a skew quad render texture mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param width - Initial texture width.
     * @param height - Initial texture height.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number
    )

    /**
     * Create a skew quad render texture mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SkewRenderTexture.IConfig
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
     * @returns This skew render texture instance.
     */
    snapshot(
        gameObjects: Phaser.GameObjects.GameObject[],
        config?: SkewRenderTexture.SnapshotIConfig
    ): this;
}
