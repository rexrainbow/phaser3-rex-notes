import FixWidthSizer from './FixWidthSizer';
import { IConfig } from './FixWidthSizer';

declare type FixWidthSizerFactory = (
    config?: IConfig
) => FixWidthSizer;

export default FixWidthSizerFactory;
export { FixWidthSizer, IConfig };