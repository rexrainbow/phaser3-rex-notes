import OverlapSizer from './OverlapSizer';
import { IConfig } from './OverlapSizer';

declare function Factoty(
    config?: IConfig
): OverlapSizer;

declare function Factoty(
    x: number, y: number,
    config?: IConfig
): OverlapSizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    config?: IConfig
): OverlapSizer;

export default Factoty;