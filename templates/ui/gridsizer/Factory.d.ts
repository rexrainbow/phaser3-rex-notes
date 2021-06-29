import GridSizer from './GridSizer';
import { IConfig } from './GridSizer';

declare type GridSizerFactory = (
    config?: IConfig
) => GridSizer;

export default GridSizerFactory;