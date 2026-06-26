import StencilMaskContainer from './StencilMaskContainer';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig, StencilMaskContainer.IConfig {
        x?: number,
        y?: number,
        children?: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): StencilMaskContainer;
