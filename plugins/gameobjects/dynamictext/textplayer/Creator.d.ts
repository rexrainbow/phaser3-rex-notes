import TextPlayer from './TextPlayer';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number,
        height?: number,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): TextPlayer;