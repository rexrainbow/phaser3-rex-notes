import FullWindowRectangle from './FullWindowRectangle';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        color?: number,
        alpha?: number,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): FullWindowRectangle;