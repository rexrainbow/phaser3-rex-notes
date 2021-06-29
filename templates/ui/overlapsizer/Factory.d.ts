import OverlapSizer from './OverlapSizer';
import { IConfig } from './OverlapSizer';

declare type OverlapSizerFactory = (
    config?: IConfig
) => OverlapSizer;

export default OverlapSizerFactory;
export { OverlapSizer, IConfig };