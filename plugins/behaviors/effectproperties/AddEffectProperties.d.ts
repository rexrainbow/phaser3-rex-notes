import * as EffectProperties from './EffectProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        barrel?: boolean,
        blackWhite?: boolean,
        blur?: boolean,
        bokeh?: boolean,
        brightness?: boolean,
        brown?: boolean,
        contrast?: boolean,
        desaturate?: boolean,
        desaturateLuminance?: boolean,
        displacement?: boolean,
        glow?: boolean,
        grayscale?: boolean,
        hue?: boolean,
        kodachrome?: boolean,
        lsd?: boolean,
        negative?: boolean,
        pixelate?: boolean,
        polaroid?: boolean,
        saturate?: boolean,
        sepia?: boolean,
        shadow?: boolean,
        shiftToBGR?: boolean,
        technicolor?: boolean,
        tiltShift?: boolean,
        vintagePinhole?: boolean,
    }

    interface EffectProperties extends
        EffectProperties.AddBarrelProperties.Barrel,
        EffectProperties.AddBlackWhiteProperties.BlackWhite,
        EffectProperties.AddBlockyProperties.Blocky,
        EffectProperties.AddBlurProperties.Blur,
        EffectProperties.AddBokehProperties.Bokeh,
        EffectProperties.AddBrightnessProperties.Brightness,
        EffectProperties.AddBrownProperties.Brown,
        EffectProperties.AddContrastProperties.Contrast,
        EffectProperties.AddDesaturateProperties.Desaturate,
        EffectProperties.AddDesaturateLuminanceProperties.DesaturateLuminance,
        EffectProperties.AddDisplacementProperties.Displacement,
        EffectProperties.AddGlowProperties.Glow,
        EffectProperties.AddGrayscaleProperties.Grayscale,
        EffectProperties.AddHueProperties.Hue,
        EffectProperties.AddKodachromeProperties.Kodachrome,
        EffectProperties.AddLSDProperties.LSD,
        EffectProperties.AddNegativeProperties.Negative,
        EffectProperties.AddPixelateProperties.Pixelate,
        EffectProperties.AddPolaroidProperties.Polaroid,
        EffectProperties.AddSaturateProperties.Saturate,
        EffectProperties.AddSepiaProperties.Sepia,
        EffectProperties.AddShadowProperties.Shadow,
        EffectProperties.AddShiftToBGRProperties.ShiftToBGR,
        EffectProperties.AddTechnicolorProperties.Technicolor,
        EffectProperties.AddTiltShiftProperties.TiltShift,
        EffectProperties.AddVintagePinholeProperties.VintagePinhole{ }

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
