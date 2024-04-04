import Live2dGameObject from './Live2dGameObject';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        key?: string,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): Live2dGameObject;