import GridSizer from './GridSizer';
import { IConfig } from './GridSizer';


declare function Factoty(
    config?: IConfig
): GridSizer;

declare function Factoty(
    x: number, y: number,
    config?: IConfig
): GridSizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    config?: IConfig
): GridSizer;

declare function Factoty(
    x: number, y: number,
    width: number, height: number,
    column: number, row: number,
    config?: IConfig
): GridSizer;

export default Factoty;