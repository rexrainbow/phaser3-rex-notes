export default CSVScenario;

declare namespace CSVScenario {
    type TimeUnitType = 0 | 1 | 'ms' | 's' | 'sec';
    type ConvertCallbackType = (s: string, instruction: any[]) => any;

    interface IConfig {
        timeUnit?: TimeUnitType,
        prefix?: RegExp,
        argsConvert?: true | ConvertCallbackType,
        argsConvertScope?: object,
        delimiter?: string
    }

    interface IStartConfig {
        label?: string
        offset?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            scope: object, scenario: CSVScenario
        ) => void;

        type LabelChangeCallbackType = (
            lastLabel: string, prevLabel: string,
            scope: object, scenario: CSVScenario
        ) => void;

        type LogCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenario
        ) => void;

        type ErrorCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenario
        ) => void;
    }
}

declare class CSVScenario extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: CSVScenario.IConfig
    );

    load(
        csvString: string,
        scope: object,
        config?: CSVScenario.IConfig
    ): this;

    append(
        csvString: string
    ): this;

    start(
        config?: CSVScenario.IStartConfig
    ): this;

    continue(eventName: string): this;

    pause(): this;

    resume(): this;

    clear(): this;

    readonly isRunning: boolean;
    readonly isPaused: boolean;
    readonly lastLabel: string;
    readonly previousLabel: string;
}