// import * as Phaser from 'phaser';
import Image from '../image/Image';

export default RenderTexture;

declare namespace RenderTexture {

    /**
     * Configuration for creating a delaunay render texture mesh.
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

}

/**
 * Delaunay image mesh backed by a dynamic render texture.
 */
declare class RenderTexture extends Image {
    /**
     * Create a delaunay render texture mesh.
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
     * Create a delaunay render texture mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        config?: RenderTexture.IConfig
    )

    /**
     * Internal render texture used by this game object.
     */
    readonly rt: Phaser.GameObjects.RenderTexture;
}
