// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';


export default TextArea;

declare namespace TextArea {

    /**
     * Configuration options for creating a TextArea.
     */
    interface IConfig extends Scrollable.IConfig {
        /**
         * Spacing configuration for the TextArea layout.
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
         * The text game object to display in the TextArea.
         */
        text: Phaser.GameObjects.GameObject,
        /**
         * The width of the text area.
         */
        textWidth?: number | undefined,
        /**
         * The height of the text area.
         */
        textHeight?: number | undefined,
        /**
         * Enable a mask for the text area.
         */
        textMask?: boolean,
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
 * A scrollable text area with line-based navigation.
 */
declare class TextArea extends Scrollable {
    /**
     * Create a TextArea.
     *
     * @param scene - The Phaser.Scene that owns this TextArea.
     * @param config - Configuration options for the TextArea.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TextArea.IConfig
    );

    /**
     * Current text content.
     */
    text: string;
    /**
     * Replace the text content.
     *
     * @param text - The text to set.
     * @returns This TextArea instance.
     */
    setText(text: string): this;
    /**
     * Append text content.
     *
     * @param text - The text to append.
     * @returns This TextArea instance.
     */
    appendText(text: string): this;

    /**
     * Scroll to a specific line index.
     *
     * @param lineIndex - The target line index.
     * @param duration - Scroll duration in milliseconds.
     * @param ease - The easing name.
     * @returns This TextArea instance.
     */
    scrollToLine(
        lineIndex: number,
        duration?: number,
        ease?: string
    ): this;
    /**
     * Scroll to the next line.
     *
     * @param lineCount - The number of lines to move.
     * @param duration - Scroll duration in milliseconds.
     * @param ease - The easing name.
     * @returns This TextArea instance.
     */
    scrollToNextLine(
        lineCount?: number,
        duration?: number,
        ease?: string
    ): this;

    /**
     * Current line index.
     */
    readonly lineIndex: number;
    /**
     * Total number of lines.
     */
    readonly linesCount: number;
}
