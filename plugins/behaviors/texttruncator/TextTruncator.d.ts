export default TextTruncator;

declare namespace TextTruncator {
    /**
     * TextTruncator configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Truncation symbol.
         */
        symbol?: string,
        /**
         * Maximum width.
         */
        maxWidth?: number,
        /**
         * Maximum height.
         */
        maxHeight?: number,
        /**
         * Initial text.
         */
        text?: string,
    }
}
/**
 * Text truncation helper for a game object.
 */
declare class TextTruncator {
    /**
     * Create a TextTruncator.
     * @param gameObject - Target game object.
     * @param config - TextTruncator configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTruncator.IConfig
    );

    /**
     * Enable or disable truncation.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: number;

    /**
     * Set truncation symbol.
     * @param symbol - Symbol string.
     * @returns This instance.
     */
    setSymbol(symbol: string): this;
    /**
     * Truncation symbol.
     */
    symbol: string;

    /**
     * Set maximum width.
     * @param width - Max width.
     * @returns This instance.
     */
    setMaxWidth(width?: number): this;
    /**
     * Maximum width.
     */
    maxWidth: number;

    /**
     * Set maximum height.
     * @param height - Max height.
     * @returns This instance.
     */
    setMaxHeight(height?: number): this;
    /**
     * Maximum height.
     */
    maxHeight: number;

    /**
     * Set text value.
     * @param text - Text value.
     * @returns This instance.
     */
    setText(text?: string | string[] | number): this;
    /**
     * Append text.
     * @param text - Text to append.
     * @returns This instance.
     */
    appendText(text?: string | string[] | number): this;
    /**
     * Current text value.
     */
    text: string;

    /**
     * Recalculate and update truncated text.
     * @returns This instance.
     */
    updateText(): this;
}
