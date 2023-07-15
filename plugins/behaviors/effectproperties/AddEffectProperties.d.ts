import AddBarrelProperties from './AddBarrelProperties';
import AddBlackWhiteProperties from './colormatrix/AddBlackWhiteProperties';
import AddBloomProperties from './AddBloomProperties';
import AddBlurProperties from './AddBlurProperties';
import AddBokehProperties from './AddBokehProperties';
import AddBrightnessProperties from './colormatrix/AddBrightnessProperties';
import AddBrownProperties from './colormatrix/AddBrownProperties';
import AddCircleProperties from './AddCircleProperties';
import AddContrastProperties from './colormatrix/AddContrastProperties';
import AddDesaturateProperties from './colormatrix/AddDesaturateProperties';
import AddDesaturateLuminanceProperties from './colormatrix/AddDesaturateLuminanceProperties';
import AddDisplacementProperties from './AddDisplacementProperties';
import AddGlowProperties from './AddGlowProperties';
import AddGradientProperties from './AddGradientProperties';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties';
import AddHueProperties from './colormatrix/AddHueProperties';
import AddKodachromeProperties from './colormatrix/AddKodachromeProperties';
import AddLSDProperties from './colormatrix/AddLSDProperties';
import AddNegativeProperties from './colormatrix/AddNegativeProperties';
import AddPixelateProperties from './AddPixelateProperties';
import AddPolaroidProperties from './colormatrix/AddPolaroidProperties';
import AddRevealProperties from './AddRevealProperties';
import AddSaturateProperties from './colormatrix/AddSaturateProperties';
import AddSepiaProperties from './colormatrix/AddSepiaProperties';
import AddShadowProperties from './AddShadowProperties';
import AddShiftToBGRProperties from './colormatrix/AddShiftToBGRProperties';
import AddShineProperties from './AddShineProperties';
import AddTechnicolorProperties from './colormatrix/AddTechnicolorProperties';
import AddTiltShiftProperties from './AddTiltShiftProperties';
import AddVignetteProperties from './AddVignetteProperties';
import AddVintagePinholeProperties from './colormatrix/AddVintagePinholeProperties';
import AddWipeProperties from './AddWipeProperties';

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
        AddBarrelProperties.BarrelGameObject,
        AddBlackWhiteProperties.BlackWhiteGameObject,
        AddBloomProperties.BloomGameObject,
        AddBlurProperties.BlurGameObject,
        AddBokehProperties.BokehGameObject,
        AddBrightnessProperties.BrightnessGameObject,
        AddBrownProperties.BrownGameObject,
        AddCircleProperties.CircleGameObject,
        AddContrastProperties.ContrastGameObject,
        AddDesaturateProperties.DesaturateGameObject,
        AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject,
        AddDisplacementProperties.DisplacementGameObject,
        AddGlowProperties.GlowGameObject,
        AddGradientProperties.GradientGameObject,
        AddGrayscaleProperties.GrayscaleGameObject,
        AddHueProperties.HueGameObject,
        AddKodachromeProperties.KodachromeGameObject,
        AddLSDProperties.LSDGameObject,
        AddNegativeProperties.NegativeGameObject,
        AddPixelateProperties.PixelateGameObject,
        AddPolaroidProperties.PolaroidGameObject,
        AddRevealProperties.RevealGameObject,
        AddSaturateProperties.SaturateGameObject,
        AddSepiaProperties.SepiaGameObject,
        AddShadowProperties.ShadowGameObject,
        AddShiftToBGRProperties.ShiftToBGRGameObject,
        AddShineProperties.ShineGameObject,
        AddTechnicolorProperties.TechnicolorGameObject,
        AddTiltShiftProperties.TiltShiftGameObject,
        AddVignetteProperties.VignetteGameObject,
        AddVintagePinholeProperties.VintagePinholeGameObject,
        AddWipeProperties.WipeGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig | string | string[]
): AddEffectProperties.EffectPropertiesGameObject;
