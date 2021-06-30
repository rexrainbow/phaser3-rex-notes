import Slider from './Slider';
import { IConfig } from './Slider';

declare type SliderFactory = (
    config?: IConfig
) => Slider;

export default SliderFactory;