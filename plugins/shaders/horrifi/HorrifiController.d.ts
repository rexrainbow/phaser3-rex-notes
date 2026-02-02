// import * as Phaser from 'phaser';
export default HorrifiController;

declare namespace HorrifiController {
    /**
     * Configuration for a horrifi filter controller.
     */
    interface IConfig {
        /**
         * Default enable state applied to all sub effects.
         */
        enable?: boolean,

        /**
         * Enable bloom effect.
         */
        bloomEnable?: boolean,
        /**
         * Bloom blur radius.
         */
        bloomRadius?: number,
        /**
         * Bloom intensity.
         */
        bloomIntensity?: number,
        /**
         * Bloom threshold.
         */
        bloomThreshold?: number,
        /**
         * Bloom texel width.
         */
        bloomTexelWidth?: number,
        /**
         * Bloom texel height.
         */
        bloomTexelHeight?: number,

        /**
         * Enable chromatic aberration effect.
         */
        chromaticEnable?: boolean,
        /**
         * Chromatic aberration intensity.
         */
        chabIntensity?: number,

        /**
         * Enable vignette effect.
         */
        vignetteEnable?: boolean,
        /**
         * Vignette strength.
         */
        vignetteStrength?: number,
        /**
         * Vignette intensity.
         */
        vignetteIntensity?: number,

        /**
         * Enable noise effect.
         */
        noiseEnable?: boolean,
        /**
         * Noise strength.
         */
        noiseStrength?: number,
        /**
         * Noise seed value.
         */
        noiseSeed?: number,

        /**
         * Enable VHS effect.
         */
        vhsEnable?: boolean,
        /**
         * VHS effect strength.
         */
        vhsStrength?: number,

        /**
         * Enable scanlines effect.
         */
        scanlinesEnable?: boolean,
        /**
         * Scanline strength.
         */
        scanStrength?: number,

        /**
         * Enable CRT effect.
         */
        crtEnable?: boolean,
        /**
         * CRT cell width.
         */
        crtWidth?: number,
        /**
         * CRT cell height.
         */
        crtHeight?: number,

    }
}

/**
 * Controller for a combined horror-style post-processing filter.
 */
declare class HorrifiController extends Phaser.Filters.Controller {
    /**
     * Create a horrifi filter controller.
     *
     * @param camera - Camera that owns this filter controller.
     * @param config - Optional initial configuration.
     */
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: HorrifiController.IConfig
    );

    /**
     * Apply configuration values to this controller.
     *
     * @param o - Configuration to apply.
     * @returns This controller instance.
     */
    resetFromJSON(o?: HorrifiController.IConfig): this;

    /**
     * Enable or disable bloom effect.
     *
     * @param enable - True to enable bloom.
     * @returns This controller instance.
     */
    setBloomEnable(enable?: boolean): this;
    /**
     * Set bloom blur radius.
     *
     * @param value - Bloom radius.
     * @returns This controller instance.
     */
    setBloomRadius(value: number): this;
    /**
     * Set bloom intensity.
     *
     * @param value - Bloom intensity.
     * @returns This controller instance.
     */
    setBloomIntensity(value: number): this;
    /**
     * Set bloom threshold.
     *
     * @param value - Bloom threshold.
     * @returns This controller instance.
     */
    setBloomThreshold(value: number): this;
    /**
     * Set bloom texel size.
     *
     * If height is omitted, width is used for both dimensions.
     *
     * @param width - Bloom texel width.
     * @param height - Bloom texel height.
     * @returns This controller instance.
     */
    setBloomTexelSize(
        width: number,
        height?: number
    ): this;
    /**
     * Whether bloom effect is enabled.
     */
    bloomEnable: boolean;
    /**
     * Bloom blur radius.
     */
    bloomRadius: number;
    /**
     * Bloom intensity.
     */
    bloomIntensity: number;
    /**
     * Bloom threshold.
     */
    bloomThreshold: number;
    /**
     * Bloom texel width.
     */
    bloomTexelWidth: number;
    /**
     * Bloom texel height.
     */
    bloomTexelHeight: number;

    /**
     * Enable or disable chromatic aberration effect.
     *
     * @param enable - True to enable chromatic aberration.
     * @returns This controller instance.
     */
    setChromaticEnable(enable?: boolean): this;
    /**
     * Set chromatic aberration intensity.
     *
     * @param value - Chromatic aberration intensity.
     * @returns This controller instance.
     */
    setChabIntensity(value: number): this;
    /**
     * Whether chromatic aberration effect is enabled.
     */
    chromaticEnable: boolean;
    /**
     * Chromatic aberration intensity.
     */
    chabIntensity: number;

    /**
     * Enable or disable vignette effect.
     *
     * @param enable - True to enable vignette.
     * @returns This controller instance.
     */
    setVignetteEnable(enable?: boolean): this;
    /**
     * Set vignette strength.
     *
     * @param value - Vignette strength.
     * @returns This controller instance.
     */
    setVignetteStrength(value: number): this;
    /**
     * Set vignette intensity.
     *
     * @param value - Vignette intensity.
     * @returns This controller instance.
     */
    setVignetteIntensity(value: number): this;
    /**
     * Whether vignette effect is enabled.
     */
    vignetteEnable: boolean;
    /**
     * Vignette strength.
     */
    vignetteStrength: number;
    /**
     * Vignette intensity.
     */
    vignetteIntensity: number;

    /**
     * Enable or disable noise effect.
     *
     * @param enable - True to enable noise.
     * @returns This controller instance.
     */
    setNoiseEnable(enable?: boolean): this;
    /**
     * Set noise strength.
     *
     * @param value - Noise strength.
     * @returns This controller instance.
     */
    setNoiseStrength(value: number): this;
    /**
     * Set noise seed.
     *
     * @param value - Noise seed value.
     * @returns This controller instance.
     */
    setNoiseSeed(value: number): this;
    /**
     * Whether noise effect is enabled.
     */
    noiseEnable: boolean;
    /**
     * Noise strength.
     */
    noiseStrength: number;
    /**
     * Noise seed value.
     */
    noiseSeed: number;

    /**
     * Enable or disable VHS effect.
     *
     * @param enable - True to enable VHS effect.
     * @returns This controller instance.
     */
    setVHSEnable(enable?: boolean): this;
    /**
     * Set VHS strength.
     *
     * @param value - VHS effect strength.
     * @returns This controller instance.
     */
    setVhsStrength(value: number): this;
    /**
     * Whether VHS effect is enabled.
     */
    vhsEnable: boolean;
    /**
     * VHS effect strength.
     */
    vhsStrength: number;

    /**
     * Enable or disable scanlines effect.
     *
     * @param enable - True to enable scanlines effect.
     * @returns This controller instance.
     */
    setScanlinesEnable(enable?: boolean): this;
    /**
     * Set scanline strength.
     *
     * @param value - Scanline strength.
     * @returns This controller instance.
     */
    setScanStrength(value: number): this;
    /**
     * Whether scanlines effect is enabled.
     */
    scanlinesEnable: boolean;
    /**
     * Scanline strength.
     */
    scanStrength: number;

    /**
     * Enable or disable CRT effect.
     *
     * @param enable - True to enable CRT effect.
     * @returns This controller instance.
     */
    setCRTEnable(enable?: boolean): this;
    /**
     * Set CRT cell size.
     *
     * If height is omitted, width is used for both dimensions.
     *
     * @param width - CRT cell width.
     * @param height - CRT cell height.
     * @returns This controller instance.
     */
    setCrtSize(
        width: number,
        height?: number
    ): this;
    /**
     * Whether CRT effect is enabled.
     */
    crtEnable: boolean;
    /**
     * CRT cell width.
     */
    crtWidth: number;
    /**
     * CRT cell height.
     */
    crtHeight: number;
}
