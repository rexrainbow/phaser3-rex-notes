import RenderBase from '../renderbase/RenderBase';

/**
 * Character render bob for dynamic text.
 */
export default class CharData extends RenderBase {
    /**
     * Bob type.
     */
    readonly type: 'text';

    /**
     * Text width.
     */
    readonly textWidth: number;
    /**
     * Text height.
     */
    readonly textHeight: number;
    /**
     * Ascent value.
     */
    readonly ascent: number;
    /**
     * Descent value.
     */
    readonly descent: number;

}
