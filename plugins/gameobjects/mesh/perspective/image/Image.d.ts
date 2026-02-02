// import * as Phaser from 'phaser';

export default Image;

declare namespace Image {

    /**
     * Configuration for creating a perspective mesh image.
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
         * Skip rendering when the first face is back-facing.
         */
        hideBackFace?: boolean,
        /**
         * Grid cell width used when rebuilding vertices.
         */
        gridWidth?: number,
        /**
         * Grid cell height used when rebuilding vertices.
         */
        gridHeight?: number
    }

}

/**
 * Perspective image mesh game object.
 */
declare class Image extends Phaser.GameObjects.Mesh {
    /**
     * Create a perspective image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position or configuration object.
     * @param y - World y position.
     * @param key - Texture key.
     * @param frame - Texture frame key.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number | Image.IConfig,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    /**
     * Set rotation around all axes in radians.
     *
     * @param rotationX - Rotation around x axis.
     * @param rotationY - Rotation around y axis.
     * @param rotationZ - Rotation around z axis.
     * @returns This image instance.
     */
    setRotationXYZ(
        rotationX?: number,
        rotationY?: number,
        rotationZ?: number
    ): this;
    /**
     * Set rotation around x axis in radians.
     *
     * @param rotationX - Rotation around x axis.
     * @returns This image instance.
     */
    setRotationX(rotationX?: number): this;
    /**
     * Set rotation around y axis in radians.
     *
     * @param rotationY - Rotation around y axis.
     * @returns This image instance.
     */
    setRotationY(rotationY?: number): this;
    /**
     * Set rotation around z axis in radians.
     *
     * @param rotationZ - Rotation around z axis.
     * @returns This image instance.
     */
    setRotationZ(rotationZ?: number): this;
    /**
     * Rotation around x axis in radians.
     */
    rotationX: number;
    /**
     * Rotation around y axis in radians.
     */
    rotationY: number;
    /**
     * Rotation around z axis in radians.
     */
    rotationZ: number;

    /**
     * Set rotation around all axes in degrees.
     *
     * @param angleX - Rotation around x axis in degrees.
     * @param angleY - Rotation around y axis in degrees.
     * @param angleZ - Rotation around z axis in degrees.
     * @returns This image instance.
     */
    setAngleXYZ(
        angleX?: number,
        angleY?: number,
        angleZ?: number
    ): this;
    /**
     * Set rotation around x axis in degrees.
     *
     * @param angleX - Rotation around x axis in degrees.
     * @returns This image instance.
     */
    setAngleX(angleX?: number): this;
    /**
     * Set rotation around y axis in degrees.
     *
     * @param angleY - Rotation around y axis in degrees.
     * @returns This image instance.
     */
    setAngleY(angleY?: number): this;
    /**
     * Set rotation around z axis in degrees.
     *
     * @param angleZ - Rotation around z axis in degrees.
     * @returns This image instance.
     */
    setAngleZ(angleZ?: number): this;
    /**
     * Rotation around x axis in degrees.
     */
    angleX: number;
    /**
     * Rotation around y axis in degrees.
     */
    angleY: number;
    /**
     * Rotation around z axis in degrees.
     */
    angleZ: number;
}
