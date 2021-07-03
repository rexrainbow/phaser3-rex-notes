import TextPlayer from "./TextPlayer";
import { IConfig } from '../../../plugins/gameobjects/dynamictext/textplayer/TextPlayer';

declare type TextPlayerFactory = (
    config?: IConfig
) => TextPlayer;

export default TextPlayerFactory;