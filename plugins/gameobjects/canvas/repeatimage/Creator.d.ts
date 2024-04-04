import RepeatImage from './RepeatImage';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number,
        height?: number,
        key?: string,
        frame?: string,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): RepeatImage;