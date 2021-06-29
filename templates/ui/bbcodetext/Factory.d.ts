import BBCodeText from './BBCodeText';
import { TextStyle } from '../../../plugins/bbcodetext';

declare type BBCodeTextFactory = (
    x?: number, y?: number,
    content?: string,
    style?: TextStyle
) => BBCodeText;

export default BBCodeTextFactory;
export { BBCodeText, TextStyle };