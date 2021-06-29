import TagText from './TagText';
import { TextStyle } from '../../../plugins/tagtext';

declare type TagTextFactory = (
    x?: number, y?: number,
    content?: string,
    style?: TextStyle
) => TagText;

export default TagTextFactory;