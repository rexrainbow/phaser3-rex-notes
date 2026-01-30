// import * as Phaser from 'phaser';
import TitleLabel from '../titlelabel/TitleLabel';


export default TextBox;

declare namespace TextBox {

    /**
     * Configuration options for creating a TextBox.
     */
    interface IConfig extends TitleLabel.IConfig {
        /**
         * Typing mode for content display.
         */
        typingMode?: 0 | 1 | 'page' | 'line',

        /**
         * Page configuration.
         */
        page?: {
            /**
             * Maximum lines per page.
             */
            maxLines?: number,
            /**
             * Page break string.
             */
            pageBreak?: string,
        },

        /**
         * Typing configuration.
         */
        type?: {
            /**
             * Typing speed in milliseconds.
             */
            speed?: number,
            /**
             * Typing direction mode.
             */
            typeMode?: 0 | 1 | 2 | 3 | 'left-to-right' | 'right-to-left' | 'middle-to-sides' | 'sides-to-middle',
            /**
             * Called to transform text during typing.
             *
             * @param text - The current text.
             * @param isLastChar - Whether this is the last character.
             * @param insertIdx - The insertion index.
             * @returns The transformed text.
             */
            setTextCallback?: (
                text: string,
                isLastChar: boolean,
                insertIdx: number
            ) => string;
            /**
             * Scope used for setTextCallback.
             */
            setTextCallbackScope?: object
        }
    }
}

/**
 * A text box with typing and paging support.
 */
declare class TextBox extends TitleLabel {
    /**
     * Create a TextBox.
     *
     * @param scene - The Phaser.Scene that owns this TextBox.
     * @param config - Configuration options for the TextBox.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TextBox.IConfig
    );

    /**
     * Start typing content from the beginning.
     *
     * @param content - The content to type.
     * @param typingSpeed - Typing speed in milliseconds.
     * @returns This TextBox instance.
     */
    start(
        content: string,
        typingSpeed?: number
    ): this;
    /**
     * Append and type more content.
     *
     * @param content - The content to append and type.
     * @param typingSpeed - Typing speed in milliseconds.
     * @returns This TextBox instance.
     */
    more(
        content: string,
        typingSpeed?: number
    ): this;

    /**
     * Stop typing.
     *
     * @param showAllText - Whether to reveal all text.
     * @returns This TextBox instance.
     */
    stop(showAllText?: boolean): this;
    /**
     * Show the last page of content.
     *
     * @returns This TextBox instance.
     */
    showLastPage(): this;
    /**
     * Pause typing.
     *
     * @returns This TextBox instance.
     */
    pause(): this;
    /**
     * Resume typing.
     *
     * @returns This TextBox instance.
     */
    resume(): this;
    /**
     * Whether typing is in progress.
     */
    readonly isTyping: boolean;

    /**
     * Set typing speed.
     *
     * @param speed - Typing speed in milliseconds.
     * @returns This TextBox instance.
     */
    setTypeSpeed(speed: number): this;
    /**
     * Set typing speed.
     *
     * @param speed - Typing speed in milliseconds.
     * @returns This TextBox instance.
     */
    setTypingSpeed(speed: number): this;

    /**
     * Type the next page of content.
     *
     * @returns This TextBox instance.
     */
    typeNextPage(): this;
    /**
     * Whether the current page is the end of a page.
     */
    readonly isPageEnd: boolean;
    /**
     * Whether the current page is the last page.
     */
    readonly isLastPage: boolean;
    /**
     * Whether the current page is the first page.
     */
    readonly isFirstPage: boolean;
    /**
     * Current page index.
     */
    readonly pageIndex: number;
    /**
     * Total number of pages.
     */
    readonly pageCount: number;
}
