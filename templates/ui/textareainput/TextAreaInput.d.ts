// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import CanvasInput from '../canvasinput/CanvasInput';


export default TextAreaInput;

declare namespace TextAreaInput {

    /**
     * Configuration options for creating a TextAreaInput.
     */
    interface IConfig extends Scrollable.IConfig {
        /**
         * Spacing configuration for the TextAreaInput layout.
         */
        space?: {
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

            /**
             * Spacing configuration for the text container.
             */
            text?: number | {
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
             * Space above the header.
             */
            header?: number,
            /**
             * Space below the footer.
             */
            footer?: number,
        },

        /**
         * Disable the scroller when set to false.
         */
        scroller?: false,

        /**
         * Text input configuration or game object.
         */
        text?: CanvasInput.IConfig | Phaser.GameObjects.GameObject,
        /**
         * Keep the area scrollable even when content fits.
         */
        alwaysScrollable?: boolean,

        /**
         * Initial content string.
         */
        content?: string
    }

}

/**
 * A scrollable text area input with editable content.
 */
declare class TextAreaInput extends Scrollable {
    /**
     * Create a TextAreaInput.
     *
     * @param scene - The Phaser.Scene that owns this TextAreaInput.
     * @param config - Configuration options for the TextAreaInput.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TextAreaInput.IConfig
    );

    /**
     * Replace the text content.
     *
     * @param text - The text to set.
     * @returns This TextAreaInput instance.
     */
    setText(text: string): this;
    /**
     * Append text content.
     *
     * @param text - The text to append.
     * @returns This TextAreaInput instance.
     */
    appendText(text: string): this;
    /**
     * Current text content.
     */
    text: string;
    /**
     * Current input value.
     */
    value: string;

    /**
     * Enable or disable read-only mode.
     *
     * @param enable - Whether to enable read-only mode.
     * @returns This TextAreaInput instance.
     */
    setReadOnly(enable?: boolean): this;
    /**
     * Whether the input is read-only.
     */
    readOnly: boolean;

    /**
     * Scroll to a specific line index.
     *
     * @param lineIndex - The target line index.
     * @returns This TextAreaInput instance.
     */
    scrollToLine(lineIndex: number): this;
    /**
     * Scroll to the next line.
     *
     * @param lineCount - The number of lines to move.
     * @returns This TextAreaInput instance.
     */
    scrollToNextLine(lineCount?: number): this;

    /**
     * Current line index.
     */
    readonly lineIndex: number;
    /**
     * Height of a line.
     */
    readonly lineHeight: number;
    /**
     * Total number of lines.
     */
    readonly linesCount: number;
}
