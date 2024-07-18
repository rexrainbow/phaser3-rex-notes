import Timer from './timer/Timer';

export default CSVScenarioLogic;

declare namespace CSVScenarioLogic {
    type TimeUnitType = 0 | 1 | 'ms' | 's' | 'sec';
    type ConvertCallbackType = (s: string, instruction: any[]) => any;

    interface IConfig {
        timeUnit?: TimeUnitType,
        prefix?: RegExp,
        argsConvert?: true | ConvertCallbackType,
        argsConvertScope?: object,
        delimiter?: string,
        translateCommandNameCallback?: (commandName: string) => string,
    }

    interface IStartConfig {
        label?: string
        offset?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            scope: object, scenario: CSVScenarioLogic
        ) => void;

        type LabelChangeCallbackType = (
            lastLabel: string, prevLabel: string,
            scope: object, scenario: CSVScenarioLogic
        ) => void;

        type LogCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenarioLogic
        ) => void;

        type ErrorCallbackType = (
            msg: string,
            scope: object, scenario: CSVScenarioLogic
        ) => void;
    }
}

declare class CSVScenarioLogic extends Phaser.Events.EventEmitter {
    constructor(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    );

    boot(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    ): this;

    createTimer(
        parent?: Object,
        config?: CSVScenarioLogic.IConfig
    ): Timer;

    load(
        csvString: string,
        scope: object,
        config?: CSVScenarioLogic.IConfig
    ): this;
    scope: object;

    append(csvString: string): this;

    start(config?: CSVScenarioLogic.IStartConfig): this;
    play(config?: CSVScenarioLogic.IStartConfig): this;
    playPromise(config?: CSVScenarioLogic.IStartConfig): Promise<any>;

    continue(eventName: string): this;
    continue(force: true): this;

    pause(): this;

    resume(): this;

    clear(): this;

    readonly isRunning: boolean;
    readonly isPaused: boolean;
    readonly lastLabel: string;
    readonly lastCustomCommandName: string;
    readonly previousLabel: string;

    setTimeScale(timeScale: number): this;
    timeScale: number;
}