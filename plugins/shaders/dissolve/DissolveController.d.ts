// import * as Phaser from 'phaser';

export default DissolveController;

declare namespace DissolveController {
    /**
     * Configuration for a dissolve filter controller.
     */
    interface IConfig {
        /**
         * Texture key of the transition target.
         */
        toTexture?: string,
        /**
         * Optional frame name of the transition target texture.
         */
        toFrame?: string,
        /**
         * Resize mode for mapping the target texture to the source.
         */
        resizeMode?: ResizeModeType

        /**
         * Noise x factor. Randomized when omitted in setNoise.
         */
        noiseX?: number,
        /**
         * Noise y factor. Randomized when omitted in setNoise.
         */
        noiseY?: number,
        /**
         * Noise z factor. Randomized when omitted in setNoise.
         */
        noiseZ?: number,
        /**
         * Start position of the source edge transition.
         */
        fromEdgeStart?: number,
        /**
         * Width of the source edge transition.
         */
        fromEdgeWidth?: number,
        /**
         * Start position of the target edge transition.
         */
        toEdgeStart?: number,
        /**
         * Width of the target edge transition.
         */
        toEdgeWidth?: number,

        /**
         * Dissolve progress in range 0 to 1.
         */
        progress?: number,
    }

    /**
     * Resize mode for mapping the target texture.
     */
    type ResizeModeType = 0 | 1 | 2 | 'stretch' | 'contain' | 'cover';

}

/**
 * Controller for a dissolve transition filter on a camera.
 */
declare class DissolveController extends Phaser.Filters.Controller {
    /**
     * Create a dissolve filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: DissolveController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: DissolveController.IConfig): this;

    /**
     * Set dissolve progress.
     *
     * Value is clamped to range 0 to 1.
     *
     * @param value - Dissolve progress.
     * @returns This controller instance.
     */
    setProgress(value: number): this;
    /**
     * Dissolve progress in range 0 to 1.
     */
    progress: number;

    /**
     * Set noise factors.
     *
     * Any omitted component is randomized.
     *
     * @param x - Noise x factor.
     * @param y - Noise y factor.
     * @param z - Noise z factor.
     * @returns This controller instance.
     */
    setNoise(
        x?: number,
        y?: number,
        z?: number
    ): this;
    /**
     * Noise x factor.
     */
    noiseX: number;
    /**
     * Noise y factor.
     */
    noiseY: number;
    /**
     * Noise z factor.
     */
    noiseZ: number;

    /**
     * Set transition target texture and optional frame.
     *
     * If key is omitted, the default texture is used.
     *
     * @param key - Texture key of the transition target.
     * @param frame - Optional frame name.
     * @param resizeMode - Optional resize mode to apply.
     * @returns This controller instance.
     */
    setTransitionTargetTexture(
        key?: string,
        frame?: string,
        resizeMode?: DissolveController.ResizeModeType
    ): this

    /**
     * Set resize mode for mapping the target texture.
     *
     * @param mode - Resize mode value or name.
     * @returns This controller instance.
     */
    setResizeMode(mode: DissolveController.ResizeModeType): this;
    /**
     * Resize mode as numeric value.
     */
    resizeMode: number;

    /**
     * Set source edge transition range.
     *
     * @param edgeStart - Start position of the source edge transition.
     * @param edgeWidth - Width of the source edge transition.
     * @returns This controller instance.
     */
    setFromEdge(
        edgeStart: number,
        edgeWidth: number
    ): this;
    /**
     * Start position of the source edge transition.
     */
    fromEdgeStart: number;
    /**
     * Width of the source edge transition.
     */
    fromEdgeWidth: number;
    /**
     * Set target edge transition range.
     *
     * @param edgeStart - Start position of the target edge transition.
     * @param edgeWidth - Width of the target edge transition.
     * @returns This controller instance.
     */
    setToEdge(
        edgeStart: number,
        edgeWidth: number
    ): this;
    /**
     * Start position of the target edge transition.
     */
    toEdgeStart: number;
    /**
     * Width of the target edge transition.
     */
    toEdgeWidth: number;

}
