import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TextTyping;

declare namespace TextTyping {

    type TypeModeType = 0 | 1 | 2 | 3 | 'left-to-right' | 'right-to-left' | 'middle-to-sides' | 'sides-to-middle';
    type SetTextCallbackType = (text: string, isLastChar: boolean, insertIndex: number) => string;

    interface IConfig {
        speed?: number,
        typeMode?: TypeModeType,
        setTextCallback?: SetTextCallbackType,
        setTextCallbackScope?: Object,
        wrap?: boolean,

        text?: string,
        typingIndex?: number,
        elapsed?: number | null,
    }

    namespace Events {
        type TypingCallbackType = () => void;
        type TypingCompleteCallbackType = (typing: TextTyping, txt: string) => void;
    }
}

declare class TextTyping extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextTyping.IConfig
    );

    start(
        content: string,
        speed?: number,
        startIndex?: number
    ): this;

    startFromLine(
        content: string,
        lineIndex?: number,
        speed?: number,
        offsetIndex?: number,
    ): this;

    readonly typingIndex: number;
    readonly textLength: number;

    appendText(content: string): this;

    stop(showAllText?: boolean): this;

    pause(): this;
    resume(): this;

    setTypeSpeed(speed: number): this;
    setTypingSpeed(speed: number): this;
    speed: number;

    setTypeMode(mode: TextTyping.TypeModeType): this;
    typeMode: number;

    readonly isTyping: boolean;
}