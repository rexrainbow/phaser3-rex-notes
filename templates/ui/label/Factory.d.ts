import Label from './Label';
import { IConfig } from './Label';

declare type LabelFactory = (
    config?: IConfig
) => Label;

export default LabelFactory;