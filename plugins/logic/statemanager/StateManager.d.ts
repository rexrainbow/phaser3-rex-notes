import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default StateManager;

declare namespace StateManager {

    interface IState {
        name?: string,
        next?: string | (() => string),
        enter?: Function,
        exit?: Function,
    }

    interface IConfig {
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type StateChangeCallbackType = (state: StateManager) => void;
        type ExitStateCallbackType = (state: StateManager) => void;
        type EnterStateCallbackType = (state: StateManager) => void;
    }
}

declare class StateManager extends EventEmitter {
    constructor(config?: StateManager.IConfig);

    start(newState: string): this;
    next(): this;
    goto(nextState: string): this;
    state: string;
    readonly prevState: string;
    readonly stateList: string[];

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    addState(
        name: string,
        state: StateManager.IState
    ): this;
    addState(
        state: StateManager.IState
    ): this;

    addStates(
        state: StateManager.IState[]
    ): this;
    addStates(
        states: { [name: string]: StateManager.IState },
    ): this;

    runMethod(
        methodName: string,
        ...args: unknown[]
    ): unknown;

    update(
        time: number,
        delta: number
    ): void;

    preupdate(
        time: number,
        delta: number
    ): void;

    postupdate(
        time: number,
        delta: number
    ): void;
}