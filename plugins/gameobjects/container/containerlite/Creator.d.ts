import ContainerLite from './ContainerLite';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number,
        height?: number,
        children?: Phaser.GameObjects.GameObject[],
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): ContainerLite;