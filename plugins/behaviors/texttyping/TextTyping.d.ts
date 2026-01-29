import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TextTyping;

declare namespace TextTyping {

    /**
     * Typing mode identifiers.
     */
    type TypeModeType = 0 | 1 | 2 | 3 | 'left-to-right' | 'right-to-left' | 'middle-to-sides' | 'sides-to-middle';
    /**
     * Callback to set text per character.
     */
    type SetTextCallbackType = (text: string, isLastChar: boolean, insertIndex: number) => string;

    /**
     * TextTyping configuration.
     */
    interface IConfig {
        /**
         * Typing speed.
         */
        speed?: number,
        /**
         * Typing mode.
         */
        typeMode?: TypeModeType,
        /**
         * Callback to set text.
         */
        setTextCallback?: SetTextCallbackType,
        /**
         * Callback scope for setText.
         */
        setTextCallbackScope?: Object,
        /**
         * True to wrap typing.
         */
        wrap?: boolean,

        /**
         * Initial text.
         */
        text?: string,
        /**
         * Typing start index.
         */
        typingIndex?: number,
        /**
         * Elapsed time in ms.
         */
        elapsed?: number | null,
    }

    namespace Events {
        /**
         * Typing callback.
         */
        type TypingCallbackType = () => void;
        /**
         * Typing complete callback.
         */
        type TypingCompleteCallbackType = (typing: TextTyping, txt: string) => void;
    }
}

/**
 * Text typing behavior for a game object.
 */
declare class TextTyping extends ComponentBase {
    /**
     * Create a TextTyping behavior.
     * @param gameObject - Target game object.
     * @param config - TextTyping configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTyping.IConfig
    );

    /**
     * Start typing content.
     * @param content - Text content.
     * @param speed - Typing speed.
     * @param startIndex - Start index.
     * @returns This instance.
     */
    start(
        content: string,
        speed?: number,
        startIndex?: number
    ): this;

    /**
     * Start typing content from a line.
     * @param content - Text content.
     * @param lineIndex - Line index.
     * @param speed - Typing speed.
     * @param offsetIndex - Offset index in line.
     * @returns This instance.
     */
    startFromLine(
        content: string,
        lineIndex?: number,
        speed?: number,
        offsetIndex?: number,
    ): this;

    /**
     * Current typing index.
     */
    readonly typingIndex: number;
    /**
     * Total text length.
     */
    readonly textLength: number;

    /**
     * Append text.
     * @param content - Text content.
     * @returns This instance.
     */
    appendText(content: string): this;

    /**
     * Stop typing.
     * @param showAllText - True to show all text.
     * @returns This instance.
     */
    stop(showAllText?: boolean): this;

    /**
     * Pause typing.
     * @returns This instance.
     */
    pause(): this;
    /**
     * Resume typing.
     * @returns This instance.
     */
    resume(): this;

    /**
     * Set typing speed.
     * @param speed - Typing speed.
     * @returns This instance.
     */
    setTypeSpeed(speed: number): this;
    /**
     * Set typing speed.
     * @param speed - Typing speed.
     * @returns This instance.
     */
    setTypingSpeed(speed: number): this;
    /**
     * Typing speed.
     */
    speed: number;

    /**
     * Set typing mode.
     * @param mode - Typing mode.
     * @returns This instance.
     */
    setTypeMode(mode: TextTyping.TypeModeType): this;
    /**
     * Typing mode value.
     */
    typeMode: number;

    /**
     * True if typing is in progress.
     */
    readonly isTyping: boolean;
}
