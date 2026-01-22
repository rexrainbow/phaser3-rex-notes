import RenderBase from '../renderbase/RenderBase';

/**
 * Background render bob for dynamic text.
 */
export default class Background extends RenderBase {
    /**
     * Bob type.
     */
    readonly type: 'background';
    /**
     * Horizontal scroll factor.
     */
    scrollFactorX: 0;
    /**
     * Vertical scroll factor.
     */
    scrollFactorY: 0;

    /**
     * Set background colors and gradient.
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
     * Set background stroke.
     * @param color - Stroke color.
     * @param lineWidth - Stroke width.
     * @returns This instance.
     */
    setStroke(
        color?: string | number | null,
        lineWidth?: number
    ): this;

    /**
     * Set corner radius.
     * @param radius - Corner radius.
     * @param iteration - Corner iteration.
     * @returns This instance.
     */
    setCornerRadius(
        radius?: number,
        iteration?: number | null
    ): this;

}
