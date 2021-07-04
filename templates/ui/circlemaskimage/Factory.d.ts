import CircleMaskImage from './CircleMaskImage';
import { IConfig } from '../../../plugins/circlemaskimage';

export default function (
    x?: number, y?: number,
    key?: string, frame?: string,
    config?:
        null | 0 | 1 | 2 | 'circle' | 'ellipse' | 'roundRectangle' |
        IConfig
): CircleMaskImage;