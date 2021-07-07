import FixWidthSizer from './FixWidthSizer';
import { IConfig } from './FixWidthSizer';


declare function Factoty(
    config?: IConfig
): FixWidthSizer;

declare function Factoty(
    x: number, y: number,
    config?: IConfig
): FixWidthSizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    config?: IConfig
): FixWidthSizer;

export default Factoty;