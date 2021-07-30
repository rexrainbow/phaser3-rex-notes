import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default FSM;

declare namespace FSM {

    interface IStateConfig {
        next?: string | (() => string),
        enter?: Function,
        exit?: Function,
    }

    interface IConfig {
        start?: string,
        states?: { [name: string]: IStateConfig },

        init?: Function,

        extend?: {
            [name: string]: any,
        },

        enable?: boolean,

        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        type StateChangeCallbackType = (state: FSM) => void;
        type ExitStateCallbackType = (state: FSM) => void;
        type EnterStateCallbackType = (state: FSM) => void;
    }
}

declare class FSM extends EventEmitter {
    constructor(config?: FSM.IConfig);

    start(newState: string): this;
    next(): this;
    goto(nextState: string): this;
    state: string;
    readonly prevState: string;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    addState(
        name: string,
        config: FSM.IStateConfig
    ): this;

    addStates(
        config: { [name: string]: FSM.IStateConfig },
    ): this;

}