import AddGlowProperties from './AddGlowProperties';
import AddGrayscaleProperties from './AddGrayscaleProperties';

export default AddEffectProperties;

declare namespace AddEffectProperties {
    interface IConfig {
        glow?: boolean,
        grayscale?: boolean,
    }
    interface EffectPropertiesGameObject extends
        AddGlowProperties.GlowGameObject,
        AddGrayscaleProperties.GrayscaleGameObject { }

}

declare function AddEffectProperties(
    gameObject: Phaser.GameObjects.GameObject,
    config?: true | AddEffectProperties.IConfig
): AddEffectProperties.EffectPropertiesGameObject;
