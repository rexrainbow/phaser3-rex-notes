import TextArea from './TextArea';
import { IConfig } from './TextArea';

declare type TextAreaFactory = (
    config?: IConfig
) => TextArea;

export default TextAreaFactory;