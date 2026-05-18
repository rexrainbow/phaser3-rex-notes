import { FilterName } from './const';
import Methods from './methods/Methods';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class HorrifiController extends PhaserFilters.Controller {
    bloomEnable: any;
    bloomIntensity: any;
    bloomRadius: any;
    bloomTexelHeight: any;
    bloomTexelWidth: any;
    bloomThreshold: any;
    chabIntensity: any;
    chromaticEnable: any;
    crtEnable: any;
    crtHeight: any;
    crtWidth: any;
    noiseEnable: any;
    noiseSeed: any;
    noiseStrength: any;
    now: any;
    scanlinesEnable: any;
    scanStrength: any;
    setBloomEnable: any;
    setBloomIntensity: any;
    setBloomRadius: any;
    setBloomTexelSize: any;
    setBloomThreshold: any;
    setChabIntensity: any;
    setChromaticEnable: any;
    setCRTEnable: any;
    setCrtSize: any;
    setNoiseEnable: any;
    setNoiseSeed: any;
    setNoiseStrength: any;
    setScanlinesEnable: any;
    setScanStrength: any;
    setVHSEnable: any;
    setVhsStrength: any;
    setVignetteEnable: any;
    setVignetteIntensity: any;
    setVignetteStrength: any;
    vhsEnable: any;
    vhsStrength: any;
    vignetteEnable: any;
    vignetteIntensity: any;
    vignetteStrength: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.now = 0;

        // Bloon
        this.bloomEnable = false;
        this.bloomRadius = 0;
        this.bloomIntensity = 0;
        this.bloomThreshold = 0;
        this.bloomTexelWidth = 0;
        this.bloomTexelHeight = 0;

        // Chromatic abberation
        this.chromaticEnable = false;
        this.chabIntensity = 0;

        // Vignette
        this.vignetteEnable = false;
        this.vignetteStrength = 0;
        this.vignetteIntensity = 0;

        // Noise
        this.noiseEnable = false;
        this.noiseStrength = 0;
        this.noiseSeed = Math.random();

        // VHS
        this.vhsEnable = false;
        this.vhsStrength = 0;

        // Scanlines
        this.scanlinesEnable = false;
        this.scanStrength = 0;

        // CRT
        this.crtEnable = false;
        this.crtWidth = 0;
        this.crtHeight = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        var enable = GetValue(o, 'enable', false);

        // Bloom
        this.setBloomEnable(GetValue(o, 'bloomEnable', enable));
        this.setBloomRadius(GetValue(o, 'bloomRadius', 0));
        this.setBloomIntensity(GetValue(o, 'bloomIntensity', 0));
        this.setBloomThreshold(GetValue(o, 'bloomThreshold', 0));
        this.setBloomTexelSize(GetValue(o, 'bloomTexelWidth', 0), GetValue(o, 'bloomTexelHeight'));

        // Chromatic abberation
        this.setChromaticEnable(GetValue(o, 'chromaticEnable', enable));
        this.setChabIntensity(GetValue(o, 'chabIntensity', 0));

        // Vignette
        this.setVignetteEnable(GetValue(o, 'vignetteEnable', enable));
        this.setVignetteStrength(GetValue(o, 'vignetteStrength', 0));
        this.setVignetteIntensity(GetValue(o, 'vignetteIntensity', 0));

        // Noise
        this.setNoiseEnable(GetValue(o, 'noiseEnable', enable));
        this.setNoiseStrength(GetValue(o, 'noiseStrength', 0));
        this.setNoiseSeed(GetValue(0, 'noiseSeed', Math.random()));

        // VHS
        this.setVHSEnable(GetValue(o, 'vhsEnable', enable));
        this.setVhsStrength(GetValue(o, 'vhsStrength', 0));

        // Scanlines
        this.setScanlinesEnable(GetValue(o, 'scanlinesEnable', enable));
        this.setScanStrength(GetValue(o, 'scanStrength', 0));

        // CRT
        this.setCRTEnable(GetValue(o, 'crtEnable', enable));
        this.setCrtSize(GetValue(o, 'crtWidth', 0), GetValue(o, 'crtHeight', undefined));

        return this;
    }
}

Object.assign(
    HorrifiController.prototype,
    Methods
)

export default HorrifiController;