import RenderBase from '../renderbase/RenderBase';

/**
 * Inner bounds render bob for dynamic text.
 */
export default class InnerBounds extends RenderBase {
    /**
     * Bob type.
     */
    readonly type: 'innerbounds';
    /**
     * Horizontal scroll factor.
     */
    scrollFactorX: 0;
    /**
     * Vertical scroll factor.
     */
    scrollFactorY: 0;

    /**
     * Set inner bounds colors and gradient.
     * @param color - Primary color.
     * @param color2 - Secondary color.
     * @param isHorizontalGradient - True for horizontal gradient.
     * @returns This instance.
     */
    setColor(
        color?: string | number | null,
        color2?: string | number | null,
        isHorizontalGradient?: boolean
    ): this;

    /**
     * Set inner bounds stroke.
     * @param color - Stroke color.
     * @param lineWidth - Stroke width.
     * @returns This instance.
     */
    setStroke(
        color?: string | number | null,
        lineWidth?: number
    ): this;

}
