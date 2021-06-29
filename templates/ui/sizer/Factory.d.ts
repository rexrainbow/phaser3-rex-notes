import Sizer from './Sizer';
import { IConfig } from './Sizer';

declare type SizerFactory = (
    config?: IConfig
) => Sizer;

export default SizerFactory;