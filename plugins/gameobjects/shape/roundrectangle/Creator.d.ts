import RoundRectangle from './RoundRectangle';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width?: number,
        height?: number,
        radius?: number | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),
        fillColor?: number,
        fillAlpha?: number,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): RoundRectangle;