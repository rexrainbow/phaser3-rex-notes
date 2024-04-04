import LineProgress from './LineProgress';

export default function (
    config?: LineProgress.IConfig
): LineProgress;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    config?: LineProgress.IConfig
): LineProgress;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    barColor?: string | number,
    value?: number,
    config?: LineProgress.IConfig
): LineProgress;

