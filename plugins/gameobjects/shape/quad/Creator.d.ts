import Quad from './Quad';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number,
        height?: number,
        fillColor?: number,
        fillAlpha?: number,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): Quad;