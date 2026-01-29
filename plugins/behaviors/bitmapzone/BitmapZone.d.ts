export default BitmapZone;

declare namespace BitmapZone {
    /**
     * BitmapZone configuration.
     */
    interface IConfig {
        /**
         * Zone x.
         */
        x?: number,
        /**
         * Zone y.
         */
        y?: number,
        /**
         * Zone width.
         */
        width?: number,
        /**
         * Zone height.
         */
        height?: number,

        /**
         * Scale x.
         */
        scaleX?: number,
        /**
         * Scale y.
         */
        scaleY?: number,
        /**
         * Offset x.
         */
        offsetX?: number,
        /**
         * Offset y.
         */
        offsetY?: number,
    }
}

/**
 * Bitmap zone helper for random point sampling.
 */
declare class BitmapZone {
    /**
     * Create a BitmapZone.
     * @param gameObject - Source game object.
     * @param config - BitmapZone configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: BitmapZone.IConfig
    );

    /**
     * Random point callback.
     */
    getRandomPoint: Phaser.Types.GameObjects.Particles.RandomZoneSourceCallback;

    /**
     * Set offset.
     * @param offsetX - Offset x.
     * @param offsetY - Offset y.
     * @returns This instance.
     */
    setOffset(offsetX?: number, offsetY?: number): this;
    /**
     * Offset x.
     */
    offsetX: number;
    /**
     * Offset y.
     */
    offsetY: number;

    /**
     * Set scale.
     * @param scaleX - Scale x.
     * @param scaleY - Scale y.
     * @returns This instance.
     */
    setScale(scaleX?: number, scaleY?: number): this;
    /**
     * Scale x.
     */
    scaleX: number;
    /**
     * Scale y.
     */
    scaleY: number;
}
