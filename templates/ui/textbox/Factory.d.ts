import TextBox from './TextBox';
import { IConfig } from './TextBox';

declare type TextBoxFactory = (
    config?: IConfig
) => TextBox;

export default TextBoxFactory;
export { TextBox, IConfig };