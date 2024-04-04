import FileDropZone from './FileDropZone';

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
): FileDropZone;