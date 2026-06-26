import StencilContainers from './StencilContainers';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        x?: number,
        y?: number,
        children?: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): StencilContainers;
