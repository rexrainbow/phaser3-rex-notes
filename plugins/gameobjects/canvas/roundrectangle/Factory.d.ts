import RoundRectangle from './RoundRectangle';

export default function (
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig?: number | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),
    fillStyle?: number | string | null,
    strokeStyle?: number | string | null,
    lineWidth?: number,

    fillColor2?: number | string | null,
    isHorizontalGradient?: boolean,

    resolution?: number,
): RoundRectangle;