export default ShatterImage;

declare namespace ShatterImage {
    /**
     * Callback that returns ring radii used for shatter triangulation.
     */
    type GetRingRadiusListCallback = (width: number, height: number) => number[];

    /**
     * Configuration for creating a shatter image mesh.
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
        key: string,
        /**
         * Texture frame key.
         */
        frame?: string,

        /**
         * Ring radii list or generator callback.
         */
        ringRadiusList?: number[] | GetRingRadiusListCallback,
        /**
         * Number of samples per ring.
         */
        samplesPerRing?: number,
        /**
         * Radial variation factor.
         */
        variation?: number,

    }

    /**
     * Configuration used when re-shattering an image.
     */
    interface ShatterIConfig {
        /**
         * Shatter center x in world coordinates.
         */
        centerX?: number,
        /**
         * Shatter center y in world coordinates.
         */
        centerY?: number,
        /**
         * Ring radii list or generator callback.
         */
        ringRadiusList?: number[] | GetRingRadiusListCallback,
        /**
         * Number of samples per ring.
         */
        samplesPerRing?: number,
        /**
         * Radial variation factor.
         */
        variation?: number,
    }
}

/**
 * Mesh image that can be shattered into many triangle faces.
 */
declare class ShatterImage extends Phaser.GameObjects.Mesh {
    /**
     * Create a shatter image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param key - Texture key.
     * @param frame - Texture frame key.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string,
        config?: ShatterImage.IConfig
    );

    /**
     * Create a shatter image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ShatterImage.IConfig
    );

    /**
     * Rebuild faces using shatter triangulation.
     *
     * @param centerX - Shatter center x in world coordinates.
     * @param centerY - Shatter center y in world coordinates.
     * @param config - Optional shatter configuration.
     * @returns This shatter image instance.
     */
    shatter(
        centerX?: number,
        centerY?: number,
        config?: ShatterImage.ShatterIConfig
    ): this;
    /**
     * Rebuild faces using shatter triangulation.
     *
     * @param config - Optional shatter configuration.
     * @returns This shatter image instance.
     */
    shatter(
        config?: ShatterImage.ShatterIConfig
    ): this;
    /**
     * Last shatter center in local coordinates.
     */
    readonly shatterCenter: { x: number, y: number };

    /**
     * Ring radii list or generator callback.
     */
    ringRadiusList: number[] | ShatterImage.GetRingRadiusListCallback;
    /**
     * Set ring radii list or generator callback.
     *
     * @param ringRadiusList - Ring radii list or generator callback.
     * @returns This shatter image instance.
     */
    setRingRadiusList(ringRadiusList: number[] | ShatterImage.GetRingRadiusListCallback): this;

    /**
     * Number of samples per ring.
     */
    samplesPerRing: number;
    /**
     * Set number of samples per ring.
     *
     * @param samplesPerRing - Number of samples per ring.
     * @returns This shatter image instance.
     */
    setSamplesPerRing(samplesPerRing: number): this;

    /**
     * Radial variation factor.
     */
    variation: number;
    /**
     * Set radial variation factor.
     *
     * @param variation - Radial variation factor.
     * @returns This shatter image instance.
     */
    setVariation(variation: number): this;

    /**
     * Reset image to a single quad face.
     *
     * @returns This shatter image instance.
     */
    resetImage(): this;
}
