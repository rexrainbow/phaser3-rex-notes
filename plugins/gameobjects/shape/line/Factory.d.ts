import Line from './Line';

export default function (
    config?: Line.IConfig
): Line;

export default function (
    points?: Line.PointType[],
    lineWidth?: number,
    color?: number,
    alpha?: number,
    lineType?: Line.LineType
): Line;