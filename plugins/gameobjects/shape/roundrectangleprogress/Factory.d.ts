import RoundRectangleProgress from './RoundRectangleProgress';

export default function (
    config?: RoundRectangleProgress.IConfig
): RoundRectangleProgress;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    config?: RoundRectangleProgress.IConfig
): RoundRectangleProgress;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    barColor?: string | number,
    value?: number,
    config?: RoundRectangleProgress.IConfig
): RoundRectangleProgress;
