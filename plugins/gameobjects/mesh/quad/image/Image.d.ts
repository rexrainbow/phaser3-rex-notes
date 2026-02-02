// import * as Phaser from 'phaser';
import Mesh from '../../mesh/Mesh';
import Vertex from '../../mesh/vertex/Vertex';

export default Image;

declare namespace Image {
    /**
     * Configuration for creating a quad image mesh.
     */
    interface IConfig {
        /**
         * World x position.
         */
        x?: number,
        /**
         * World y position.
         */
        y?: number,
        /**
         * Texture key.
         */
        key?: string,
        /**
         * Texture frame key.
         */
        frame?: string,

        /**
         * Enable nine-point mode.
         */
        ninePointMode?: boolean,
        /**
         * Enable right-to-left mapping in four-point mode.
         */
        rtl?: boolean,
    }

}

/**
 * Quad image mesh game object.
 */
declare class Image extends Mesh {
    /**
     * Create a quad image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param key - Texture key.
     * @param frame - Texture frame key.
     * @param config - Optional mesh configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    /**
     * Create a quad image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional mesh configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Image.IConfig
    )

    /**
     * Top-left vertex.
     */
    readonly topLeft: Vertex;
    /**
     * Top-center vertex.
     */
    readonly topCenter: Vertex;
    /**
     * Top-right vertex.
     */
    readonly topRight: Vertex;
    /**
     * Center-left vertex.
     */
    readonly centerLeft: Vertex;
    /**
     * Center vertex.
     */
    readonly center: Vertex;
    /**
     * Center-right vertex.
     */
    readonly centerRight: Vertex;
    /**
     * Bottom-left vertex.
     */
    readonly bottomLeft: Vertex;
    /**
     * Bottom-center vertex.
     */
    readonly bottomCenter: Vertex;
    /**
     * Bottom-right vertex.
     */
    readonly bottomRight: Vertex;
}
