// import * as Phaser from 'phaser';
export default HorrifiController;

declare namespace HorrifiController {
    interface IConfig {
        enable?: boolean,

        // Bloom
        bloomEnable?: boolean,
        bloomRadius?: number, bloomIntensity?: number, bloomThreshold?: number,
        bloomTexelWidth?: number, bloomTexelHeight?: number,

        // Chromatic abberation
        chromaticEnable?: boolean,
        chabIntensity?: number,

        // Vignette
        vignetteEnable?: boolean,
        vignetteStrength?: number, vignetteIntensity?: number,

        // Noise
        noiseEnable?: boolean,
        noiseStrength?: number,
        noiseSeed?: number,

        // VHS
        vhsEnable?: boolean,
        vhsStrength?: number,

        // Scanlines
        scanlinesEnable?: boolean,
        scanStrength?: number,

        // CRT
        crtEnable?: boolean,
        crtWidth?: number, crtHeight?: number,

    }
}

declare class HorrifiController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: HorrifiController.IConfig
    );

    resetFromJSON(o?: HorrifiController.IConfig): this;

    // Bloom
    setBloomEnable(enable?: boolean): this;
    setBloomRadius(value: number): this;
    setBloomIntensity(value: number): this;
    setBloomThreshold(value: number): this;
    setBloomTexelSize(width: number, height?: number): this;
    bloomEnable: boolean;
    bloomRadius: number;
    bloomIntensity: number;
    bloomThreshold: number;
    bloomTexelWidth: number;
    bloomTexelHeight: number;

    // Chromatic abberation
    setChromaticEnable(enable?: boolean): this;
    setChabIntensity(value: number): this;
    chromaticEnable: boolean;
    chabIntensity: number;

    // Vignette
    setVignetteEnable(Genable?: boolean): this;
    setVignetteStrength(value: number): this;
    setVignetteIntensity(value: number): this;
    vignetteEnable: boolean;
    vignetteStrength: number;
    vignetteIntensity: number;

    // Noise
    setNoiseEnable(enable?: boolean): this;
    setNoiseStrength(value: number): this;
    setNoiseSeed(value: number): this;
    noiseEnable: boolean;
    noiseStrength: number;
    noiseSeed: number;

    // VHS
    setVHSEnable(enable?: boolean): this;
    setVhsStrength(value: number): this;
    vhsEnable: boolean;
    vhsStrength: number;

    // Scanlines
    setScanlinesEnable(enable?: boolean): this;
    setScanStrength(value: number): this;
    scanlinesEnable: boolean;
    scanStrength: number;

    // CRT
    setCRTEnable(enable?: boolean): this;
    setCrtSize(width: number, height?: number): this;
    crtEnable: boolean;
    crtWidth: number;
    crtHeight: number;
}