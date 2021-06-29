import Knob from './Knob';
import { IConfig } from './Knob';

declare type KnobFactory = (
    config?: IConfig
) => Knob;

export default KnobFactory;
export { Knob, IConfig };