import NumberBar from './NumberBar';
import { IConfig } from './NumberBar';

declare type NumberBarFactory = (
    config?: IConfig
) => NumberBar;

export default NumberBarFactory;