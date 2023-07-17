import * as EffectProperties from './EffectProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        barrel?: boolean,
        blackWhite?: boolean,
        bloom?: boolean,
        blur?: boolean,
        bokeh?: boolean,
        brightness?: boolean,
        brown?: boolean,
        circle?: boolean,
        contrast?: boolean,
        desaturate?: boolean,
        desaturateLuminance?: boolean,
        displacement?: boolean,
        glow?: boolean,
        gradient?: boolean,
        grayscale?: boolean,
        hue?: boolean,
        kodachrome?: boolean,
        lsd?: boolean,
        negative?: boolean,
        pixelate?: boolean,
        polaroid?: boolean,
        reveal?: boolean,
        saturate?: boolean,
        sepia?: boolean,
        shadow?: boolean,
        shiftToBGR?: boolean,
        shine?: boolean,
        technicolor?: boolean,
        tiltShift?: boolean,
        vignette?: boolean,
        vintagePinhole?: boolean,
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

    type ConfigType = true | IConfig | string | string[]
}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: AddEffectProperties.ConfigType,
): AddEffectProperties.EffectPropertiesGameObject;

declare function AddEffectProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera,
    config?: AddEffectProperties.ConfigType,
): AddEffectProperties.EffectPropertiesCamera;
