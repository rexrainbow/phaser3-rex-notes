import * as EffectProperties from './EffectProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        /**
         * Enable barrel effect.
         */
        barrel?: boolean,
        /**
         * Enable black/white effect.
         */
        blackWhite?: boolean,
        /**
         * Enable bloom effect.
         */
        bloom?: boolean,
        /**
         * Enable blur effect.
         */
        blur?: boolean,
        /**
         * Enable bokeh effect.
         */
        bokeh?: boolean,
        /**
         * Enable brightness effect.
         */
        brightness?: boolean,
        /**
         * Enable brown effect.
         */
        brown?: boolean,
        /**
         * Enable circle effect.
         */
        circle?: boolean,
        /**
         * Enable contrast effect.
         */
        contrast?: boolean,
        /**
         * Enable desaturate effect.
         */
        desaturate?: boolean,
        /**
         * Enable desaturate luminance effect.
         */
        desaturateLuminance?: boolean,
        /**
         * Enable displacement effect.
         */
        displacement?: boolean,
        /**
         * Enable glow effect.
         */
        glow?: boolean,
        /**
         * Enable gradient effect.
         */
        gradient?: boolean,
        /**
         * Enable grayscale effect.
         */
        grayscale?: boolean,
        /**
         * Enable hue effect.
         */
        hue?: boolean,
        /**
         * Enable kodachrome effect.
         */
        kodachrome?: boolean,
        /**
         * Enable lsd effect.
         */
        lsd?: boolean,
        /**
         * Enable negative effect.
         */
        negative?: boolean,
        /**
         * Enable pixelate effect.
         */
        pixelate?: boolean,
        /**
         * Enable polaroid effect.
         */
        polaroid?: boolean,
        /**
         * Enable reveal effect.
         */
        reveal?: boolean,
        /**
         * Enable saturate effect.
         */
        saturate?: boolean,
        /**
         * Enable sepia effect.
         */
        sepia?: boolean,
        /**
         * Enable shadow effect.
         */
        shadow?: boolean,
        /**
         * Enable shift-to-BGR effect.
         */
        shiftToBGR?: boolean,
        /**
         * Enable shine effect.
         */
        shine?: boolean,
        /**
         * Enable technicolor effect.
         */
        technicolor?: boolean,
        /**
         * Enable tilt-shift effect.
         */
        tiltShift?: boolean,
        /**
         * Enable vignette effect.
         */
        vignette?: boolean,
        /**
         * Enable vintage pinhole effect.
         */
        vintagePinhole?: boolean,
        /**
         * Enable wipe effect.
         */
        wipe?: boolean,
    }

    interface EffectProperties extends
        EffectProperties.AddBarrelProperties.Barrel,
        EffectProperties.AddBlackWhiteProperties.BlackWhite,
        EffectProperties.AddBloomProperties.Bloom,
        EffectProperties.AddBlurProperties.Blur,
        EffectProperties.AddBokehProperties.Bokeh,
        EffectProperties.AddBrightnessProperties.Brightness,
        EffectProperties.AddBrownProperties.Brown,
        EffectProperties.AddCircleProperties.Circle,
        EffectProperties.AddContrastProperties.Contrast,
        EffectProperties.AddDesaturateProperties.Desaturate,
        EffectProperties.AddDesaturateLuminanceProperties.DesaturateLuminance,
        EffectProperties.AddDisplacementProperties.Displacement,
        EffectProperties.AddGlowProperties.Glow,
        EffectProperties.AddGradientProperties.Gradient,
        EffectProperties.AddGrayscaleProperties.Grayscale,
        EffectProperties.AddHueProperties.Hue,
        EffectProperties.AddKodachromeProperties.Kodachrome,
        EffectProperties.AddLSDProperties.LSD,
        EffectProperties.AddNegativeProperties.Negative,
        EffectProperties.AddPixelateProperties.Pixelate,
        EffectProperties.AddPolaroidProperties.Polaroid,
        EffectProperties.AddRevealProperties.Reveal,
        EffectProperties.AddSaturateProperties.Saturate,
        EffectProperties.AddSepiaProperties.Sepia,
        EffectProperties.AddShadowProperties.Shadow,
        EffectProperties.AddShiftToBGRProperties.ShiftToBGR,
        EffectProperties.AddShineProperties.Shine,
        EffectProperties.AddTechnicolorProperties.Technicolor,
        EffectProperties.AddTiltShiftProperties.TiltShift,
        EffectProperties.AddVignetteProperties.Vignette,
        EffectProperties.AddVintagePinholeProperties.VintagePinhole,
        EffectProperties.AddWipeProperties.Wipe { }

    interface EffectPropertiesGameObject extends EffectProperties, Phaser.GameObjects.GameObject {
        clearAllEffects: () => Phaser.GameObjects.GameObject;
    }

    interface EffectPropertiesCamera extends EffectProperties, Phaser.Cameras.Scene2D.BaseCamera {
        clearAllEffects: () => Phaser.Cameras.Scene2D.BaseCamera;
    }

    /**
     * Effect config type.
     */
    type ConfigType = true | IConfig | string | string[]
}

/**
 * Add effect properties to a game object.
 * @param gameObject - Target game object.
 * @param config - Effect configuration.
 * @returns Game object with effect properties.
 */
declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: AddEffectProperties.ConfigType,
): AddEffectProperties.EffectPropertiesGameObject;

/**
 * Add effect properties to a camera.
 * @param camera - Target camera.
 * @param config - Effect configuration.
 * @returns Camera with effect properties.
 */
declare function AddEffectProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera,
    config?: AddEffectProperties.ConfigType,
): AddEffectProperties.EffectPropertiesCamera;
