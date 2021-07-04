import RoundRectangle from './RoundRectangle';
import { IRadiusConfig } from '../../../plugins/roundrectangle';

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
    fillColor?: number,
    fillAlpha?: number

): RoundRectangle;