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
}

declare class CSVScenario extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: CSVScenario.IConfig
    );

    load(
        csvString: string,
        scope: Object,
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