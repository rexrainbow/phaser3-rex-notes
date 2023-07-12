import AddBarrelProperties from './AddBarrelProperties';
import AddBlackWhiteProperties from './colormatrix/AddBlackWhiteProperties';
import AddBloomProperties from './AddBloomProperties';
import AddBlurProperties from './AddBlurProperties';
import AddBrightnessProperties from './colormatrix/AddBrightnessProperties';
import AddBrownProperties from './colormatrix/AddBrownProperties';
import AddContrastProperties from './colormatrix/AddContrastProperties';
import AddDesaturateProperties from './colormatrix/AddDesaturateProperties';
import AddDesaturateLuminanceProperties from './colormatrix/AdddesaturateLuminanceProperties';
import AddGlowProperties from './AddGlowProperties';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties';
import AddHueProperties from './colormatrix/AddHueProperties';
import AddKodachromeProperties from './colormatrix/AddKodachromeProperties';
import AddLSDProperties from './colormatrix/AddLSDProperties';
import AddNegativeProperties from './colormatrix/AddNegativeProperties';
import AddPolaroidProperties from './colormatrix/AddPolaroidProperties';
import AddRevealProperties from './AddRevealProperties';
import AddSaturateProperties from './colormatrix/AddSaturateProperties';
import AddSepiaProperties from './colormatrix/AddSepiaProperties';
import AddShiftToBGRProperties from './colormatrix/AddShiftToBGRProperties';
import AddShineProperties from './AddShineProperties';
import AddTechnicolorProperties from './colormatrix/AddTechnicolorProperties';
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
        brightness?: boolean,
        brown?: boolean,
        contrast?: boolean,
        desaturate?: boolean,
        desaturateLuminance?: boolean,
        glow?: boolean,
        grayscale?: boolean,
        hue?: boolean,
        kodachrome?: boolean,
        lsd?: boolean,
        negative?: bigint,
        polaroid?: boolean,
        reveal?: boolean,
        saturate?: boolean,
        sepia?: boolean,
        shiftToBGR?: boolean,
        shine?: boolean,
        technicolor?: boolean,
        vignette?: boolean,
        vintagePinhole?: boolean,
        wipe?: boolean,
    }
    interface EffectPropertiesGameObject extends
        AddBarrelProperties.BarrelGameObject,
        AddBlackWhiteProperties.BlackWhiteGameObject,
        AddBloomProperties.BloomGameObject,
        AddBlurProperties.BlurGameObject,
        AddBrightnessProperties.BrightnessGameObject,
        AddBrownProperties.BrownGameObject,
        AddContrastProperties.ContrastGameObject,
        AddDesaturateProperties.DesaturateGameObject,
        AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject,
        AddGlowProperties.GlowGameObject,
        AddGrayscaleProperties.GrayscaleGameObject,
        AddHueProperties.HueGameObject,
        AddKodachromeProperties.KodachromeGameObject,
        AddLSDProperties.LSDGameObject,
        AddNegativeProperties.NegativeGameObject,
        AddPolaroidProperties.PolaroidGameObject,
        AddRevealProperties.RevealGameObject,
        AddSaturateProperties.SaturateGameObject,
        AddSepiaProperties.SepiaGameObject,
        AddShiftToBGRProperties.ShiftToBGRGameObject,
        AddShineProperties.ShineGameObject,
        AddTechnicolorProperties.TechnicolorGameObject,
        AddVignetteProperties.VignetteGameObject,
        AddVintagePinholeProperties.VintagePinholeGameObject,
        AddWipeProperties.WipeGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig
): AddEffectProperties.EffectPropertiesGameObject;
