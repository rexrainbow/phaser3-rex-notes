import StencilMaskLayer from './StencilMaskLayer';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        children?: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): StencilMaskLayer;
