import EventEmitter from '../../../utils/eventemitter/EventEmitter';
export default BracketParser;

declare namespace BracketParser {
    type ValueConvertCallback = (s: string) => any;

    interface IConfig {
        multipleLinesTag?: boolean,
        delimiters?: string | [string, string],
        valueConvert?: boolean | ValueConvertCallback,

        eventEmitter?: EventEmitter | false,

        loop?: boolean
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