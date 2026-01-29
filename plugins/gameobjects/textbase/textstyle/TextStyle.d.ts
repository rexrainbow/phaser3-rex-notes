/**
 * Base text style configuration.
 */
interface TextStyle {
    /**
     * Font family name.
     */
    fontFamily?: string,
    /**
     * Font size value.
     */
    fontSize?: string | number,
    /**
     * Font style string.
     */
    fontStyle?: string,

    /**
     * Background color.
     */
    backgroundColor?: null | string | number,
    /**
     * Secondary background color.
     */
    backgroundColor2?: null | string | number,
    /**
     * True for horizontal background gradient.
     */
    backgroundHorizontalGradient?: boolean,
    /**
     * Background stroke color.
     */
    backgroundStrokeColor?: null | string | number,
    /**
     * Background stroke line width.
     */
    backgroundStrokeLineWidth?: number,
    /**
     * Background corner radius.
     */
    backgroundCornerRadius?: number,
    /**
     * Background corner iteration.
     */
    backgroundCornerIteration?: null | number,

    /**
     * Text color.
     */
    color?: null | string | number,
    /**
     * Fill color.
     */
    fill?: null | string | number,

    /**
     * Stroke color.
     */
    stroke?: null | string | number,
    /**
     * Stroke thickness.
     */
    strokeThickness?: number,

    /**
     * Shadow configuration.
     */
    shadow?: {
        /**
         * Shadow offset x.
         */
        offsetX?: number,
        /**
         * Shadow offset y.
         */
        offsetY?: number,
        /**
         * Shadow color.
         */
        color?: number | string,
        /**
         * Shadow blur.
         */
        blur?: number,
        /**
         * True to apply shadow to stroke.
         */
        stroke?: boolean,
        /**
         * True to apply shadow to fill.
         */
        fill?: boolean
    },

    /**
     * Underline configuration.
     */
    underline?: {
        /**
         * Underline color.
         */
        color?: number | string,
        /**
         * Underline thickness.
         */
        thickness?: number,
        /**
         * Underline offset.
         */
        offset?: number,
    },

    /**
     * Strikethrough configuration.
     */
    strikethrough?: {
        /**
         * Strikethrough color.
         */
        color?: number | string,
        /**
         * Strikethrough thickness.
         */
        thickness?: number,
        /**
         * Strikethrough offset.
         */
        offset?: number,
    },

    /**
     * Horizontal alignment.
     */
    align?: 'left' | 'center' | 'right',
    /**
     * Horizontal alignment.
     */
    halign?: 'left' | 'center' | 'right',
    /**
     * Vertical alignment.
     */
    valign?: 'top' | 'center' | 'bottom',

    /**
     * Padding configuration.
     */
    padding?: {
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
        bottom?: number,
    },

    /**
     * Maximum lines count.
     */
    maxLines?: number,
    /**
     * Line spacing.
     */
    lineSpacing?: number,
    /**
     * Letter spacing.
     */
    letterSpacing?: number,
    /**
     * True to use fixed line height mode.
     */
    fixedLineHeightMode?: boolean,

    /**
     * Fixed width.
     */
    fixedWidth?: number,
    /**
     * Fixed height.
     */
    fixedHeight?: number,

    /**
     * Render resolution.
     */
    resolution?: number,

    /**
     * Test string for measurements.
     */
    testString?: string,

    /**
     * Wrap configuration.
     */
    wrap?: {
        /**
         * Wrap mode.
         */
        mode?: 0 | 1 | 2 | 3 | 'none' | 'word' | 'char' | 'character' | 'mix'
        /**
         * Wrap width.
         */
        width?: null | number,
    },

    /**
     * Word wrap configuration.
     */
    wordWrap?: {
        /**
         * Word wrap width.
         */
        width?: number,
    },

    /**
     * Metrics configuration.
     */
    metrics?: boolean |
    {
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
    },
}

export default TextStyle;
