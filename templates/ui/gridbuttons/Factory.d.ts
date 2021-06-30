import GridButtons from './GridButtons';
import { IConfig } from './GridButtons';

declare type GridButtonsFactory = (
    config?: IConfig
) => GridButtons;

export default GridButtonsFactory;