import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default FSMBase;

declare namespace FSMBase {

    /**
     * Configuration for a single state.
     */
    interface IStateConfig {
        /**
         * State name.
         */
        name?: string,
        /**
         * Next state name or resolver.
         */
        next?: string | ((this: FSMBase) => string),
        /**
         * Enter callback.
         */
        enter?: (this: FSMBase) => void,
        /**
         * Exit callback.
         */
        exit?: (this: FSMBase) => void,
    }

    /**
     * Configuration options for creating an FSMBase.
     */
    interface IConfig {
        /**
         * Start state name.
         */
        start?: string,
        /**
         * State configuration map.
         */
        states?: { [name: string]: IStateConfig },

        /**
         * Init callback.
         */
        init?: Function,

        /**
         * Extension data.
         */
        extend?: {
            [name: string]: any,
        },

        /**
         * Enable the state machine.
         */
        enable?: boolean,

        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        /**
         * State change callback.
         */
        type StateChangeCallbackType = (state: FSMBase) => void;
        /**
         * Exit state callback.
         */
        type ExitStateCallbackType = (state: FSMBase) => void;
        /**
         * Enter state callback.
         */
        type EnterStateCallbackType = (state: FSMBase) => void;
    }
}

/**
 * Base finite state machine with event support.
 */
declare class FSMBase extends EventEmitter {
    /**
     * Create an FSMBase.
     *
     * @param config - Configuration options.
     */
    constructor(config?: FSMBase.IConfig);

    /**
     * Start the state machine.
     *
     * @param newState - State name to start.
     * @returns This FSMBase instance.
     */
    start(newState: string): this;
    /**
     * Advance to the next state.
     *
     * @returns This FSMBase instance.
     */
    next(): this;
    /**
     * Go to a specific state.
     *
     * @param nextState - State name to go to.
     * @returns This FSMBase instance.
     */
    goto(nextState: string): this;
    /**
     * Current state name.
     */
    state: string;
    /**
     * Previous state name.
     */
    readonly prevState: string;

    /**
     * Enable or disable the state machine.
     *
     * @param enable - Whether to enable.
     * @returns This FSMBase instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enabled state.
     *
     * @returns This FSMBase instance.
     */
    toggleEnable(): this;
    /**
     * Whether the state machine is enabled.
     */
    enable: boolean;

    /**
     * Add a state by name.
     *
     * @param name - State name.
     * @param state - State configuration.
     * @returns This FSMBase instance.
     */
    addState(
        name: string,
        state: FSMBase.IStateConfig
    ): this;
    /**
     * Add a state by config.
     *
     * @param state - State configuration.
     * @returns This FSMBase instance.
     */
    addState(state: FSMBase.IStateConfig): this;

    /**
     * Add multiple states by map.
     *
     * @param states - State configuration map.
     * @returns This FSMBase instance.
     */
    addStates(
        states: { [name: string]: FSMBase.IStateConfig }
    ): this;
    /**
     * Add multiple states by list.
     *
     * @param states - State configuration list.
     * @returns This FSMBase instance.
     */
    addStates(
        states: FSMBase.IStateConfig[]
    ): this;

    /**
     * Run a method by name.
     *
     * @param methodName - Method name.
     * @param args - Method arguments.
     * @returns Method result.
     */
    runMethod(
        methodName: string,
        ...args: unknown[]
    ): unknown;
}
