import AddBarrelProperties from './AddBarrelProperties';
import AddBloomProperties from './AddBloomProperties';
import AddBlurProperties from './AddBlurProperties';
import AddGlowProperties from './AddGlowProperties';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties';
import AddRevealProperties from './AddRevealProperties';
import AddShineProperties from './AddShineProperties';
import AddVignetteProperties from './AddVignetteProperties';
import AddWipeProperties from './AddWipeProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        barrel?: boolean,
        bloom?: boolean,
        blur?: boolean,
        glow?: boolean,
        grayscale?: boolean,
        reveal?: boolean,
        shine?: boolean,
        vignette?: boolean,
        wipe?: boolean,
    }
    interface EffectPropertiesGameObject extends
        AddBarrelProperties.BarrelGameObject,
        AddBloomProperties.BloomGameObject,
        AddBlurProperties.BlurGameObject,
        AddGlowProperties.GlowGameObject,
        AddGrayscaleProperties.GrayscaleGameObject,
        AddRevealProperties.RevealGameObject,
        AddShineProperties.ShineGameObject,
        AddVignetteProperties.VignetteGameObject,
        AddWipeProperties.WipeGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig
): AddEffectProperties.EffectPropertiesGameObject;
