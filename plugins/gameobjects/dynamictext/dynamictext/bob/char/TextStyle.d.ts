export interface IConfigTextStyle {
    /**
     * True to enable bold style.
     */
    bold?: boolean,
    /**
     * True to enable italic style.
     */
    italic?: boolean,
    /**
     * Font size value.
     */
    fontSize?: string | number,
    /**
     * Font family name.
     */
    fontFamily?: string,
    /**
     * Text color.
     */
    color?: string | number | null,
    /**
     * Stroke color.
     */
    stroke?: string | number | null,
    /**
     * Stroke thickness.
     */
    strokeThickness?: number,
    /**
     * Shadow color.
     */
    shadowColor?: string | number | null,
    /**
     * Shadow offset x.
     */
    shadowOffsetX?: number,
    /**
     * Shadow offset y.
     */
    shadowOffsetY?: number,
    /**
     * Shadow blur.
     */
    shadowBlur?: number,
    /**
     * Background color.
     */
    backgroundColor?: string | number | null,
    /**
     * Background height.
     */
    backgroundHeight?: number,
    /**
     * Background bottom y.
     */
    backgroundBottomY?: number,
    /**
     * Background left x.
     */
    backgroundLeftX?: number,
    /**
     * Background right x.
     */
    backgroundRightX?: number,
    /**
     * Offset x.
     */
    offsetX?: number,
    /**
     * Offset y.
     */
    offsetY?: number,
    /**
     * Left spacing.
     */
    leftSpace?: number,
    /**
     * Right spacing.
     */
    rightSpace?: number,
}

/**
 * Text style controller for dynamic text characters.
 */
export default class TextStyle {
    /**
     * Modify style with overrides.
     * @param o - Style overrides.
     * @returns This instance.
     */
    modify(o?: IConfigTextStyle): this;

    /**
     * Enable or disable bold style.
     * @param bold - True to enable bold.
     * @returns This instance.
     */
    setBold(bold?: boolean): this;
    /**
     * Bold state.
     */
    bold: boolean;
    /**
     * Enable or disable italic style.
     * @param italic - True to enable italic.
     * @returns This instance.
     */
    setItalic(italic?: boolean): this;
    /**
     * Italic state.
     */
    italic: boolean;

    /**
     * Set font size.
     * @param fontSize - Font size value.
     * @returns This instance.
     */
    setFontSize(fontSize: string | number): this;
    /**
     * Font size value.
     */
    fontSize: string;

    /**
     * Set font family.
     * @param fontFamily - Font family name.
     * @returns This instance.
     */
    setFontFamily(fontFamily: string): this;
    /**
     * Font family name.
     */
    fontFamily: string;

    /**
     * Combined font string.
     */
    readonly font: string;

    /**
     * Set text color.
     * @param color - Color value.
     * @returns This instance.
     */
    setColor(color?: number | string | null): this;
    /**
     * Text color.
     */
    color: string | null;

    /**
     * Set stroke color and thickness.
     * @param stroke - Stroke color.
     * @param strokeThickness - Stroke thickness.
     * @returns This instance.
     */
    setStrokeStyle(
        stroke?: number | string | null,
        strokeThickness?: number
    ): this;
    /**
     * Stroke color.
     */
    stroke: string | null;
    /**
     * Stroke thickness.
     */
    strokeThickness: number;

    /**
     * Set shadow color.
     * @param color - Shadow color.
     * @returns This instance.
     */
    setShadowColor(color?: number | string | null): this;
    /**
     * Shadow color.
     */
    shadowColor: string | null;
    /**
     * Set shadow offset.
     * @param offsetX - Offset x.
     * @param offsetY - Offset y.
     * @returns This instance.
     */
    setShadowOffset(offsetX?: number, offsetY?: number): this;
    /**
     * Shadow offset x.
     */
    shadowOffsetX: number;
    /**
     * Shadow offset y.
     */
    shadowOffsetY: number;
    /**
     * Set shadow blur.
     * @param blur - Blur value.
     * @returns This instance.
     */
    setShadowBlur(blur?: number): this;
    /**
     * Shadow blur value.
     */
    shaodwBlur: number;
    /**
     * Set shadow properties.
     * @param color - Shadow color.
     * @param offsetX - Offset x.
     * @param offsetY - Offset y.
     * @param blur - Blur value.
     * @returns This instance.
     */
    setShadow(
        color?: number | string | null,
        offsetX?: number,
        offsetY?: number,
        blur?: number
    ): this;

    /**
     * Set background color.
     * @param color - Background color.
     * @returns This instance.
     */
    setBackgroundColor(color?: number | string | null): this;

    /**
     * Set offset x.
     * @param offsetX - Offset x.
     * @returns This instance.
     */
    setOffsetX(offsetX?: number): this;
    /**
     * Offset x.
     */
    offsetX: number;
    /**
     * Set offset y.
     * @param offsetY - Offset y.
     * @returns This instance.
     */
    setOffsetY(offsetY?: number): this;
    /**
     * Offset y.
     */
    offsetY: number;
    /**
     * Set offsets.
     * @param offsetX - Offset x.
     * @param offsetY - Offset y.
     * @returns This instance.
     */
    setOffset(offsetX?: number, offsetY?: number): this;

    /**
     * Set left spacing.
     * @param space - Left spacing.
     * @returns This instance.
     */
    setLeftSpace(space?: number): this;
    /**
     * Left spacing.
     */
    leftSpace: number;
    /**
     * Set right spacing.
     * @param space - Right spacing.
     * @returns This instance.
     */
    setRightSpace(space?: number): this;
    /**
     * Right spacing.
     */
    rightSpace: number;
    /**
     * Set left and right spacing.
     * @param leftSpace - Left spacing.
     * @param rightSpace - Right spacing.
     * @returns This instance.
     */
    setSpace(leftSpace?: number, rightSpace?: number): this;

}
