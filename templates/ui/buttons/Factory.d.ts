import Buttons from './Buttons';
import { IConfig } from './Buttons';

declare type ButtonsFactory = (
    config?: IConfig
) => Buttons;

export default ButtonsFactory;