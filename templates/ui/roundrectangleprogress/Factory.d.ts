import RoundRectangleProgress from './RoundRectangleProgress';

export default function (
    config?: RoundRectangleProgress.IConfig
): RoundRectangleProgress;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    radiusConfig?: number | RoundRectangleProgress.IRadiusConfig |
        ({
            radius?: (number | RoundRectangleProgress.IRadiusConfig),
            iteration?: number
        }),
    barColor?: string | number,
    value?: number,
    config?: RoundRectangleProgress.IConfig
): RoundRectangleProgress;