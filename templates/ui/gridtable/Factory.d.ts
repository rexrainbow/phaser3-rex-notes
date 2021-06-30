import GridTable from './GridTable';
import { IConfig } from './GridTable';

declare type GridTableFactory = (
    config?: IConfig
) => GridTable;

export default GridTableFactory;