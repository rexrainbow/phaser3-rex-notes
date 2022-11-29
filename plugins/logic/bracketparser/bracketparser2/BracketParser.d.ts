import EventEmitter from '../../../utils/eventemitter/EventEmitter';
export default BracketParser;

declare namespace BracketParser {
    type ValueConvertCallback = (s: string) => any;

    interface IConfig {
        delimiters?: string | [string, string],
        valueConvert?: boolean | ValueConvertCallback,

        eventEmitter?: EventEmitter | false,

        loop?: boolean
    }

    namespace Events {
        type StartCallbackType = (parser: BracketParser) => void;
        type CompleteCallbackType = (parser: BracketParser) => void;
        type PauseCallbackType = (parser: BracketParser) => void;
        type ResumeCallbackType = (parser: BracketParser) => void;

        type TagOnCallbackType = (payload: { [name: string]: any }) => void;
        type AnyTagOnCallbackType = (tagName: string, payload: { [name: string]: any }) => void;
        type TagOffCallbackType = (payload: { [name: string]: any }) => void;
        type AnyTagOffCallbackType = (tagName: string, payload: { [name: string]: any }) => void;
        type ContentCallbackType = (content: string) => void;
    }
}

declare class BracketParser extends EventEmitter {
    constructor(
        config?: BracketParser.IConfig
    );

    start(text: string): this;

    pause(): this;
    pauseUntilEvent(
        eventEmitter: EventEmitter,
        eventName: string
    ): this;

    next(): this;

    restart(): this;

    skipEvent(): this;

    readonly isRunning: boolean;
    readonly isPaused: boolean;

    setDelimiters(delimiterLeft: string, delimiterRight?: string): this;
}