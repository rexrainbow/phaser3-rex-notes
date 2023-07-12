import AddBarrelProperties from './AddBarrelProperties';
import AddBlackWhiteProperties from './colormatrix/AddBlackWhiteProperties';
import AddBloomProperties from './AddBloomProperties';
import AddBlurProperties from './AddBlurProperties';
import AddBrownProperties from './colormatrix/AddBrownProperties';
import AddDesaturateLuminanceProperties from './colormatrix/AdddesaturateLuminanceProperties';
import AddGlowProperties from './AddGlowProperties';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties';
import AddKodachromeProperties from './colormatrix/AddKodachromeProperties';
import AddLSDProperties from './colormatrix/AddLSDProperties';
import AddNegativeProperties from './colormatrix/AddNegativeProperties';
import AddPolaroidProperties from './colormatrix/AddPolaroidProperties';
import AddRevealProperties from './AddRevealProperties';
import AddSepiaProperties from './colormatrix/AddSepiaProperties';
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
        brown?: boolean,
        desaturateLuminance?: boolean,
        glow?: boolean,
        grayscale?: boolean,
        kodachrome?: boolean,
        lsd?: boolean,
        negative?: bigint,
        polaroid?: boolean,
        reveal?: boolean,
        sepia?: boolean,
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
        AddBrownProperties.BrownGameObject,
        AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject,
        AddGlowProperties.GlowGameObject,
        AddGrayscaleProperties.GrayscaleGameObject,
        AddKodachromeProperties.KodachromeGameObject,
        AddLSDProperties.LSDGameObject,
        AddNegativeProperties.NegativeGameObject,
        AddPolaroidProperties.PolaroidGameObject,
        AddRevealProperties.RevealGameObject,
        AddSepiaProperties.SepiaGameObject,
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
