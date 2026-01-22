import EventEmitter from '../../../utils/eventemitter/EventEmitter';
export default BracketParser;

declare namespace BracketParser {
    /**
     * Convert a string value.
     */
    type ValueConvertCallback = (s: string) => any;
    /**
     * Translate tag name.
     */
    type TranslateTagNameCallbackType = (s: string) => string;

    interface IConfig {
        /**
         * True to allow tags across multiple lines.
         */
        multipleLinesTag?: boolean,
        /**
         * Tag delimiters.
         */
        delimiters?: string | [string, string],
        /**
         * Value conversion setting.
         */
        valueConvert?: boolean | ValueConvertCallback,
        /**
         * Translate tag name callback.
         */
        translateTagNameCallback?: TranslateTagNameCallbackType,

        /**
         * Event emitter or false to disable.
         */
        eventEmitter?: EventEmitter | false,

        /**
         * True to loop parsing.
         */
        loop?: boolean
    }
}

/**
 * Base bracket parser with start/pause control.
 */
declare class BracketParser extends EventEmitter {
    /**
     * Create a bracket parser.
     * @param config - Parser configuration.
     */
    constructor(
        config?: BracketParser.IConfig
    );

    /**
     * Start parsing text.
     * @param text - Text to parse.
     * @returns This instance.
     */
    start(text: string): this;

    /**
     * Pause parsing.
     * @returns This instance.
     */
    pause(): this;
    /**
     * Pause until an event is emitted.
     * @param eventEmitter - Event emitter.
     * @param eventName - Event name.
     * @returns This instance.
     */
    pauseUntilEvent(
        eventEmitter: EventEmitter,
        eventName: string
    ): this;

    /**
     * Parse the next token.
     * @returns This instance.
     */
    next(): this;

    /**
     * Restart parsing.
     * @returns This instance.
     */
    restart(): this;

    /**
     * Skip current event.
     * @returns This instance.
     */
    skipEvent(): this;

    /**
     * True if parser is running.
     */
    readonly isRunning: boolean;
    /**
     * True if parser is paused.
     */
    readonly isPaused: boolean;

    /**
     * Set delimiters.
     * @param delimiterLeft - Left delimiter.
     * @param delimiterRight - Right delimiter.
     * @returns This instance.
     */
    setDelimiters(delimiterLeft: string, delimiterRight?: string): this;
    /**
     * Set translate tag name callback.
     * @param callback - Callback function.
     * @returns This instance.
     */
    setTranslateTagNameCallback(callback?: BracketParser.TranslateTagNameCallbackType): this;

    /**
     * Last parsed tag source.
     */
    readonly lastTagSource: string;
}
