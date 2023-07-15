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

    interface EffectPropertiesGameObject extends
        EffectProperties.AddBarrelProperties.BarrelGameObject,
        EffectProperties.AddBlackWhiteProperties.BlackWhiteGameObject,
        EffectProperties.AddBloomProperties.BloomGameObject,
        EffectProperties.AddBlurProperties.BlurGameObject,
        EffectProperties.AddBokehProperties.BokehGameObject,
        EffectProperties.AddBrightnessProperties.BrightnessGameObject,
        EffectProperties.AddBrownProperties.BrownGameObject,
        EffectProperties.AddCircleProperties.CircleGameObject,
        EffectProperties.AddContrastProperties.ContrastGameObject,
        EffectProperties.AddDesaturateProperties.DesaturateGameObject,
        EffectProperties.AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject,
        EffectProperties.AddDisplacementProperties.DisplacementGameObject,
        EffectProperties.AddGlowProperties.GlowGameObject,
        EffectProperties.AddGradientProperties.GradientGameObject,
        EffectProperties.AddGrayscaleProperties.GrayscaleGameObject,
        EffectProperties.AddHueProperties.HueGameObject,
        EffectProperties.AddKodachromeProperties.KodachromeGameObject,
        EffectProperties.AddLSDProperties.LSDGameObject,
        EffectProperties.AddNegativeProperties.NegativeGameObject,
        EffectProperties.AddPixelateProperties.PixelateGameObject,
        EffectProperties.AddPolaroidProperties.PolaroidGameObject,
        EffectProperties.AddRevealProperties.RevealGameObject,
        EffectProperties.AddSaturateProperties.SaturateGameObject,
        EffectProperties.AddSepiaProperties.SepiaGameObject,
        EffectProperties.AddShadowProperties.ShadowGameObject,
        EffectProperties.AddShiftToBGRProperties.ShiftToBGRGameObject,
        EffectProperties.AddShineProperties.ShineGameObject,
        EffectProperties.AddTechnicolorProperties.TechnicolorGameObject,
        EffectProperties.AddTiltShiftProperties.TiltShiftGameObject,
        EffectProperties.AddVignetteProperties.VignetteGameObject,
        EffectProperties.AddVintagePinholeProperties.VintagePinholeGameObject,
        EffectProperties.AddWipeProperties.WipeGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig | string | string[]
): AddEffectProperties.EffectPropertiesGameObject;
