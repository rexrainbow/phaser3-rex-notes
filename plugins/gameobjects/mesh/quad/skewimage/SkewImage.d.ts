// import * as Phaser from 'phaser';
import Image from '../image/Image';

export default SkewImage;

declare namespace SkewImage {

    /**
     * Configuration for creating a skew quad image mesh.
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
        frame?: string
    }

}

/**
 * Quad image mesh with skew controls.
 */
declare class SkewImage extends Image {
    /**
     * Create a skew quad image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param key - Texture key.
     * @param frame - Texture frame key.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string | null
    )

    /**
     * Create a skew quad image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SkewImage.IConfig
    )

    /**
     * Skew along x axis in radians.
     */
    skewX: number;
    /**
     * Skew along y axis in radians.
     */
    skewY: number;
    /**
     * Skew along x axis in degrees.
     */
    skewXDeg: number;
    /**
     * Skew along y axis in degrees.
     */
    skewYDeg: number;

    /**
     * Set x-axis skew in radians.
     *
     * @param skewX - Skew value in radians.
     * @returns This skew image instance.
     */
    setSkewX(skewX: number): this;
    /**
     * Set y-axis skew in radians.
     *
     * @param skewY - Skew value in radians.
     * @returns This skew image instance.
     */
    setSkewY(skewY: number): this;
    /**
     * Set skew in radians on both axes.
     *
     * If skewY is omitted, skewX is used for both axes.
     *
     * @param skewX - X-axis skew in radians.
     * @param skewY - Y-axis skew in radians.
     * @returns This skew image instance.
     */
    setSkew(
        skewX: number,
        skewY?: number
    ): this;
    /**
     * Set x-axis skew in degrees.
     *
     * @param skewX - Skew value in degrees.
     * @returns This skew image instance.
     */
    setSkewXDeg(skewX: number): this;
    /**
     * Set y-axis skew in degrees.
     *
     * @param skewY - Skew value in degrees.
     * @returns This skew image instance.
     */
    setSkewYDeg(skewY: number): this;
    /**
     * Set skew in degrees on both axes.
     *
     * If skewY is omitted, skewX is used for both axes.
     *
     * @param skewX - X-axis skew in degrees.
     * @param skewY - Y-axis skew in degrees.
     * @returns This skew image instance.
     */
    setSkewDeg(
        skewX: number,
        skewY?: number
    ): this;
}
