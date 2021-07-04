import RoundRectangleCanvas from './RoundRectangleCanvas';
import { IRadiusConfig } from '../../../plugins/roundrectanglecanvas';

export default function (
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig?: number | ({ x?: number, y?: number }) | IRadiusConfig |
        ({
            radius?: (number | ({ x?: number, y?: number }) | IRadiusConfig),
            iteration?: number
        }),
    fillStyle?: number | string | null,
    strokeStyle?: number | string | null,
    lineWidth?: number,

    fillColor2?: number | string | null,
    isHorizontalGradient?: boolean

): RoundRectangleCanvas;