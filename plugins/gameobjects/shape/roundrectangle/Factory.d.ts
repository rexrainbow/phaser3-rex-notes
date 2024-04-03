import RoundRectangle from './RoundRectangle';

export default function (
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    radiusConfig?: number | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),
    fillColor?: number,
    fillAlpha?: number
): RoundRectangle;

export default function (
    config?: RoundRectangle.IConfig
): RoundRectangle;