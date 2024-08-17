import RoundRectangle from './RoundRectangle';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        width: number;
        height: number;
        radiusConfig?: number | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        });
        fillStyle?: number | string | null;
        strokeStyle?: number | string | null;
        lineWidth?: number;
        fillColor2?: number | string | null;
        isHorizontalGradient?: boolean;
        resolution?: number,
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): RoundRectangle;