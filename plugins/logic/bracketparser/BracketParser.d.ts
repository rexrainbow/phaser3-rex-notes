import EventEmitter from "../../utils/eventemitter/EventEmitter";
export default BracketParser;

declare namespace BracketParser {
    type ValueConvertCallback = (s: string) => any;

    interface IConfig {
        delimiters?: string | [string, string],
        valueConvert?: boolean | ValueConvertCallback,
        regex?: {
            tag?: string,
            value?: string,
        },

        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type StartCallbackType = (parser: BracketParser) => void;
        type CompleteCallbackType = (parser: BracketParser) => void;
        type PauseCallbackType = (parser: BracketParser) => void;
        type ResumeCallbackType = (parser: BracketParser) => void;

        type TagOnCallbackType = (...values: any) => void;
        type AnyTagOnCallbackType = (tagName: string, ...values: any) => void;
        type TagOffCallbackType = () => void;
        type AnyTagOffCallbackType = (tagName: string) => void;
        type ContentCallbackType = (content: string) => void;
    }
}

declare class BracketParser extends EventEmitter {
    constructor(
        config?: BracketParser.IConfig
    );

    start(text: string): this;
    pause(): this;
    next(): this;

    skipEvent(): this;

    readonly isRunning: boolean;
    readonly isPaused: boolean;
}