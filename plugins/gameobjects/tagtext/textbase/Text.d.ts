// import * as Phaser from 'phaser';
import CanvasGameObjectBase from '../../../utils/types/CanvasGameObjectBase';
import TextStyleBase from '../../textbase/textstyle/TextStyle';

export default Text;

declare namespace Text {

    type MetricsType = {
        /**
         * Ascent value.
         */
        ascent: number,
        /**
         * Descent value.
         */
        descent: number,
        /**
         * Font size value.
         */
        fontSize: number
    };

    type FontConfigType = string |
    {
        /**
         * Font family name.
         */
        fontFamily?: string,
        /**
         * Font size value.
         */
        fontSize?: string,
        /**
         * Font style string.
         */
        fontStyle?: string
    };

    type TextMarginsType = {
        /**
         * Left margin value.
         */
        left?: number
    };

    interface ImageData {
        /**
         * Texture key.
         */
        key: string,
        /**
         * Frame name.
         */
        frame?: string,
        /**
         * Image width.
         */
        width?: number,
        /**
         * Image height.
         */
        height?: number,
        /**
         * Vertical offset.
         */
        y?: number,
        /**
         * Left spacing.
         */
        left?: number,
        /**
         * Right spacing.
         */
        right?: number,
    }

    interface TextStyle extends TextStyleBase {
        /**
         * Inline image definitions.
         */
        images?: ImageData[],
        /**
         * True to enable interactive areas.
         */
        interactive?: boolean,
        /**
         * Cursor style for url tags.
         */
        urlCursor?: string,
    }

    interface IStyle {
        /**
         * Fill color.
         */
        color: string | null,
        /**
         * Stroke color.
         */
        stroke: string | null,
        /**
         * Stroke thickness.
         */
        strokeThickness: number,

        /**
         * Underline color.
         */
        underlineColor: string | null,
        /**
         * Underline thickness.
         */
        underlineThickness: number,
        /**
         * Underline offset.
         */
        underlineOffset: number,

        /**
         * Strikethrough color.
         */
        strikethroughColor: string | null,
        /**
         * Strikethrough thickness.
         */
        strikethroughThickness: number,
        /**
         * Strikethrough offset.
         */
        strikethroughOffset: number,

        /**
         * Background color.
         */
        backgroundColor: string | null,
        /**
         * Secondary background color.
         */
        backgroundColor2: string | null,
        /**
         * True for horizontal gradient background.
         */
        backgroundHorizontalGradient: boolean,

        /**
         * Background stroke color.
         */
        backgroundStrokeColor: string | null,
        /**
         * Background stroke line width.
         */
        backgroundStrokeLineWidth: number,

        /**
         * Background corner radius.
         */
        backgroundCornerRadius: number,
        /**
         * Background corner iteration.
         */
        backgroundCornerIteration: number | undefined,

        /**
         * Shadow color.
         */
        shadowColor: string | null,
        /**
         * Shadow offset x.
         */
        shadowOffsetX: number,
        /**
         * Shadow offset y.
         */
        shadowOffsetY: number,
        /**
         * Shadow blur.
         */
        shadowBlur: number,
        /**
         * True to apply shadow to stroke.
         */
        shadowStroke: boolean,
        /**
         * True to apply shadow to fill.
         */
        shadowFill: boolean,

        /**
         * Line spacing.
         */
        lineSpacing: number,
        /**
         * Maximum lines count.
         */
        maxLines: number,

        /**
         * Render resolution.
         */
        resolution: number,

        /**
         * Fixed width.
         */
        fixedWidth: number,
        /**
         * Fixed height.
         */
        fixedHeight: number,

        /**
         * Horizontal alignment.
         */
        halign: string,
        /**
         * Vertical alignment.
         */
        valign: string,

        /**
         * Wrap width.
         */
        wrapWidth: number | null,
        /**
         * Wrap mode.
         */
        wrapMode: number,

        /**
         * Line height.
         */
        lineHeight: number,
    }

    namespace Events {
        /**
         * Callback for any area hit.
         */
        type AnyAreaCallbackType = (
            key: string,
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;

        /**
         * Callback for a specific area hit.
         */
        type AreaCallbackType = (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number
        ) => void;
    }

}

/**
 * Tag text game object rendered on a canvas.
 */
declare class Text extends CanvasGameObjectBase {
    /**
     * Create a text object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param content - Text content.
     * @param style - Text style.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,

        style?: Text.TextStyle
    );

    /**
     * Canvas element.
     */
    canvas: HTMLCanvasElement;
    /**
     * Canvas 2D context.
     */
    context: CanvasRenderingContext2D;

    /**
     * Enable or disable RTL layout.
     * @param rtl - True to enable RTL.
     * @returns This instance.
     */
    setRTL(rtl?: boolean): this;

    /**
     * Current text content.
     */
    text: string;
    /**
     * Set text content.
     * @param text - Text content.
     * @returns This instance.
     */
    setText(text: string | number | string[]): this;
    /**
     * Append text content.
     * @param text - Text content to append.
     * @param addCR - True to add a line break before text.
     * @returns This instance.
     */
    appendText(
        text: string | number | string[],
        addCR?: boolean
    ): this;

    /**
     * Get plain text without tags.
     * @param start - Start index.
     * @param end - End index.
     * @returns The plain text.
     */
    getPlainText(
        start?: number, end?: number
    ): string;
    /**
     * Get plain text from a provided string.
     * @param text - Source text.
     * @param start - Start index.
     * @param end - End index.
     * @returns The plain text.
     */
    getPlainText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    /**
     * Get wrapped text lines.
     * @param start - Start index.
     * @param end - End index.
     * @returns Wrapped lines.
     */
    getWrappedText(
        start?: number, end?: number
    ): string[];
    /**
     * Get wrapped text lines from a provided string.
     * @param text - Source text.
     * @param start - Start index.
     * @param end - End index.
     * @returns Wrapped lines.
     */
    getWrappedText(
        text?: string | undefined,
        start?: number, end?: number
    ): string[];

    /**
     * Get text with tags.
     * @param start - Start index.
     * @param end - End index.
     * @returns The text.
     */
    getText(
        start?: number, end?: number
    ): string;
    /**
     * Get text with tags from a provided string.
     * @param text - Source text.
     * @param start - Start index.
     * @param end - End index.
     * @returns The text.
     */
    getText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    /**
     * Get a substring.
     * @param start - Start index.
     * @param end - End index.
     * @returns The substring.
     */
    getSubString(
        start?: number, end?: number
    ): string;
    /**
     * Get a substring from a provided string.
     * @param text - Source text.
     * @param start - Start index.
     * @param end - End index.
     * @returns The substring.
     */
    getSubString(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    /**
     * Update text layout and rendering.
     * @param runWrap - True to re-run wrapping.
     * @returns This instance.
     */
    updateText(runWrap?: boolean): this;

    /**
     * Set wrap mode.
     * @param mode - Wrap mode value.
     * @returns This instance.
     */
    setWrapMode(
        mode: 0 | 1 | 2 | 3 | 'none' | 'word' | 'char' | 'character' | 'mix'
    ): this;
    /**
     * Set wrap width.
     * @param width - Wrap width.
     * @returns This instance.
     */
    setWrapWidth(width: number): this;
    /**
     * Set word wrap width.
     * @param width - Wrap width.
     * @returns This instance.
     */
    setWordWrapWidth(width: number): this;

    /**
     * Set font configuration.
     * @param font - Font configuration.
     * @returns This instance.
     */
    setFont(font: Text.FontConfigType): this;
    /**
     * Set font family.
     * @param family - Font family name.
     * @returns This instance.
     */
    setFontFamily(family: string): this;
    /**
     * Set font size.
     * @param size - Font size.
     * @returns This instance.
     */
    setFontSize(size: number | string): this;
    /**
     * Set font style.
     * @param style - Font style string.
     * @returns This instance.
     */
    setFontStyle(style: string): this;
    /**
     * Set text style.
     * @param style - Text style config.
     * @returns This instance.
     */
    setStyle(style: Text.TextStyle): this;
    /**
     * Set test string used for measurements.
     * @param string - Test string.
     * @returns This instance.
     */
    setTestString(string: string): this;

    /**
     * Set text color.
     * @param color - Color value.
     * @returns This instance.
     */
    setColor(
        color?: null | string | number
    ): this;
    /**
     * Set fill color.
     * @param color - Color value.
     * @returns This instance.
     */
    setFill(
        color?: null | string | number
    ): this;

    /**
     * Set stroke color and thickness.
     * @param color - Stroke color.
     * @param thickness - Stroke thickness.
     * @returns This instance.
     */
    setStroke(
        color?: null | string | number,
        thickness?: number
    ): this;

    /**
     * Set underline color, thickness, and offset.
     * @param color - Underline color.
     * @param thickness - Underline thickness.
     * @param ofset - Underline offset.
     * @returns This instance.
     */
    setUnderline(
        color?: null | string | number,
        thickness?: number,
        ofset?: number
    ): this;
    /**
     * Set underline color.
     * @param color - Underline color.
     * @returns This instance.
     */
    setUnderlineColor(
        color?: null | string | number
    ): this;
    /**
     * Set underline thickness.
     * @param thickness - Underline thickness.
     * @returns This instance.
     */
    setUnderlineThinkness(thickness: number): this;
    /**
     * Set underline offset.
     * @param ofset - Underline offset.
     * @returns This instance.
     */
    setUnderlineOffset(ofset: number): this;

    /**
     * Set strikethrough color, thickness, and offset.
     * @param color - Strikethrough color.
     * @param thickness - Strikethrough thickness.
     * @param ofset - Strikethrough offset.
     * @returns This instance.
     */
    setStrikethrough(
        color?: null | string | number,
        thickness?: number,
        ofset?: number
    ): this;
    /**
     * Set strikethrough color.
     * @param color - Strikethrough color.
     * @returns This instance.
     */
    setStrikethroughColor(
        color?: null | string | number
    ): this;
    /**
     * Set strikethrough thickness.
     * @param thickness - Strikethrough thickness.
     * @returns This instance.
     */
    setStrikethroughThinkness(thickness: number): this;
    /**
     * Set strikethrough offset.
     * @param ofset - Strikethrough offset.
     * @returns This instance.
     */
    setStrikethroughOffset(ofset: number): this;

    /**
     * Set background colors and gradient direction.
     * @param color - Primary background color.
     * @param color2 - Secondary background color.
     * @param isHorizontalGradient - True for horizontal gradient.
     * @returns This instance.
     */
    setBackgroundColor(
        color?: null | string | number,
        color2?: null | string | number,
        isHorizontalGradient?: boolean
    ): this;
    /**
     * Set background stroke color and width.
     * @param color - Stroke color.
     * @param lineWidth - Stroke width.
     * @returns This instance.
     */
    setBackgroundStrokeColor(
        color?: null | string | number,
        lineWidth?: number
    ): this;
    /**
     * Set background corner radius.
     * @param radius - Corner radius.
     * @param iteration - Corner iteration.
     * @returns This instance.
     */
    setBackgroundCornerRadius(
        radius?: number,
        iteration?: number
    ): this;

    /**
     * Set shadow properties.
     * @param x - Shadow offset x.
     * @param y - Shadow offset y.
     * @param color - Shadow color.
     * @param blur - Shadow blur.
     * @param shadowStroke - True to apply to stroke.
     * @param shadowFill - True to apply to fill.
     * @returns This instance.
     */
    setShadow(
        x?: number, y?: number,
        color?: null | string | number,
        blur?: number,
        shadowStroke?: boolean,
        shadowFill?: boolean
    ): this;
    /**
     * Set shadow offset.
     * @param x - Offset x.
     * @param y - Offset y.
     * @returns This instance.
     */
    setShadowOffset(x: number, y: number): this;
    /**
     * Set shadow color.
     * @param color - Shadow color.
     * @returns This instance.
     */
    setShadowColor(color?: null | string | number): this;
    /**
     * Set shadow blur.
     * @param blur - Blur value.
     * @returns This instance.
     */
    setShadowBlur(blur: number): this;
    /**
     * Enable or disable shadow on stroke.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    setShadowStroke(enabled?: boolean): this;
    /**
     * Enable or disable shadow on fill.
     * @param enabled - True to enable.
     * @returns This instance.
     */
    setShadowFill(enabled?: boolean): this;

    /**
     * Set alignment.
     * @param align - Horizontal alignment.
     * @returns This instance.
     */
    setAlign(align?: 'left' | 'center' | 'right'): this;
    /**
     * Set horizontal alignment.
     * @param align - Horizontal alignment.
     * @returns This instance.
     */
    setHAlign(align?: 'left' | 'center' | 'right'): this;
    /**
     * Set vertical alignment.
     * @param align - Vertical alignment.
     * @returns This instance.
     */
    setVAlign(align?: 'top' | 'center' | 'bottom'): this;

    /**
     * Add an inline image tag.
     * @param imgKey - Image key.
     * @param config - Image configuration.
     * @returns This instance.
     */
    addImage(
        imgKey: string,
        config?: Text.ImageData
    ): this;

    /**
     * Draw bounds of interactive areas.
     * @param graphics - Graphics object to draw to.
     * @param color - Line color.
     * @returns This instance.
     */
    drawAreaBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    /**
     * Set line spacing.
     * @param value - Line spacing value.
     * @returns This instance.
     */
    setLineSpacing(value: number): this;
    /**
     * Line spacing value.
     */
    lineSpacing: number;

    /**
     * Set letter spacing.
     * @param value - Letter spacing value.
     * @returns This instance.
     */
    setLetterSpacing(value: number): this;
    /**
     * Letter spacing value.
     */
    letterSpacing: number;

    /**
     * Set x offset.
     * @param value - X offset value.
     * @returns This instance.
     */
    setXOffset(value: number): this;

    /**
     * Set padding.
     * @param left - Left padding or padding object.
     * @param top - Top padding.
     * @param right - Right padding.
     * @param bottom - Bottom padding.
     * @returns This instance.
     */
    setPadding(
        left?: number | {
            /**
             * Left padding.
             */
            left?: number,
            /**
             * Right padding.
             */
            right?: number,
            /**
             * Top padding.
             */
            top?: number,
            /**
             * Bottom padding.
             */
            bottom?: number
        },
        top?: number,
        right?: number,
        bottom?: number,
    ): this;

    /**
     * Set maximum line count.
     * @param max - Max lines.
     * @returns This instance.
     */
    setMaxLines(max?: number): this;

    /**
     * Measure text margins.
     * @param testString - String for measurement.
     * @param out - Optional output object.
     * @returns The margins object.
     */
    measureTextMargins(
        testString: string,
        out?: Text.TextMarginsType
    ): Text.TextMarginsType;

    /**
     * Set render resolution.
     * @param value - Resolution value.
     * @returns This instance.
     */
    setResolution(value: number): this;

    /**
     * Set fixed size.
     * @param width - Fixed width.
     * @param height - Fixed height.
     * @returns This instance.
     */
    setFixedSize(width?: number, height?: number): this;
    /**
     * Set size.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    setSize(width?: number, height?: number): this;
    /**
     * Resize the text object.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    resize(width?: number, height?: number): this;

    /**
     * Get text metrics.
     * @returns Metrics object.
     */
    getTextMetrics(): Text.MetricsType;

    /**
     * Set text metrics.
     * @param metrics - Metrics object.
     * @param font - Font configuration.
     * @returns This instance.
     */
    setTextMetrics(
        metrics: Text.MetricsType,
        font: Text.FontConfigType
    ): this;

    /**
     * Generate a texture from text.
     * @param key - Texture key.
     * @param x - Source x.
     * @param y - Source y.
     * @param width - Source width.
     * @param height - Source height.
     * @returns This instance.
     */
    generateTexture(
        key: string,
        x?: number, y?: number,
        width?: number, height?: number
    ): this;

    /**
     * Set cursor for url tags.
     * @param cursor - Cursor style.
     * @returns This instance.
     */
    setUrlTagCursor(cursor?: string): this;
    /**
     * Current url cursor style.
     */
    urlTagCursor: string;

    /**
     * Get hit area key from world coordinates.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param camera - Scene camera.
     * @returns Hit area key.
     */
    getHitArea(
        worldX: number, worldY: number,
        camera: Phaser.Cameras.Scene2D.Camera
    ): string;

    /**
     * Current resolved style object.
     */
    style: Text.IStyle;

    /**
     * Padding values.
     */
    padding: {
        /**
         * Left padding.
         */
        left: number,
        /**
         * Right padding.
         */
        right: number,
        /**
         * Top padding.
         */
        top: number,
        /**
         * Bottom padding.
         */
        bottom: number
    };
}
