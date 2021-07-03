import DynamicText from "./DynamicText";
import { IConfig } from '../../../plugins/gameobjects/dynamictext/dynamictext/DynamicText';

declare type DynamicTextFactory = (
    config?: IConfig
) => DynamicText;

export default DynamicTextFactory;