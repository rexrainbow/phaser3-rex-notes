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