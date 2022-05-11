import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default RealTimeTimers;

declare namespace RealTimeTimers {
    interface ITimer {
        name: string,
        start: number,
        period: number
    }

    interface IState {
        timers?: ITimer[];
    }

    type GetTimestampCallbackType = () => number;

    interface IConfig extends IState {
        getTimestampCallback?: GetTimestampCallbackType;
        startTimestamp?: number;
    }

    interface IPeriod {
        day?: number, d?: number,
        hour?: number, h?: number,
        minute?: number, m?: number,
        second?: number, s?: number,
    }

    interface IProgress {
        name: string,
        period: number,
        elapsed: number,
        progress: number
    }
}

declare class RealTimeTimers extends EventEmitter {
    constructor(
        config?: RealTimeTimers.IConfig
    );

    timers: RealTimeTimers.ITimer[];

    resetFromJSON(state?: RealTimeTimers.IState): this;
    toJSON(): RealTimeTimers.IState;

    setStartTimestamp(timestamp?: number): this;
    setGetTimestampCallback(callback?: RealTimeTimers.GetTimestampCallbackType): this;

    addTimer(
        name: string,
        period: number | RealTimeTimers.IPeriod,
        currentTimestamp?: number
    ): this;

    getExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    popExpiredTimers(currentTimestamp?: number): RealTimeTimers.ITimer[];
    getTimersProgress(currentTimestamp?: number): RealTimeTimers.IProgress[];

    getTimers(name: string): RealTimeTimers.ITimer[];

    removeTimers(name: string): this;
    removeTimers(timer: RealTimeTimers.ITimer): this;
    removeTimers(timers: RealTimeTimers.ITimer[]): this;

}