import CustomProgress from './CustomProgress';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): CustomProgress;