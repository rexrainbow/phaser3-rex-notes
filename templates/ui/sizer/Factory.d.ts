import Sizer from './Sizer';
import { IConfig, orientationTypes } from './Sizer';

declare function Factoty(
    config?: IConfig
): Sizer;

declare function Factoty(
    x: number, y: number,
    config?: IConfig
): Sizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    config?: IConfig
): Sizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    orientation?: orientationTypes,
    config?: IConfig
): Sizer;

export default Factoty;