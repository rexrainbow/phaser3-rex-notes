import RenderBase from '../renderbase/RenderBase';
import Style from './Style';

export default class CharData extends RenderBase {
    readonly style: Style;
    readonly type: 'text';

    readonly textWidth: number;
    readonly textHeight: number;
    readonly ascent: number;
    readonly descent: number;

}