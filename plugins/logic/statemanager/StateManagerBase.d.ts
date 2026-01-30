import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default StateManagerBase;

declare namespace StateManagerBase {

    /**
     * Configuration for a single state.
     */
    interface IState {
        /**
         * State name.
         */
        name?: string,
        /**
         * Next state name or resolver.
         */
        next?: string | (() => string),
        /**
         * Enter callback.
         */
        enter?: Function,
        /**
         * Exit callback.
         */
        exit?: Function,
    }

    /**
     * Configuration options for creating a StateManagerBase.
     */
    interface IConfig {
        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        /**
         * State change callback.
         */
        type StateChangeCallbackType = (state: StateManagerBase) => void;
        /**
         * Exit state callback.
         */
        type ExitStateCallbackType = (state: StateManagerBase) => void;
        /**
         * Enter state callback.
         */
        type EnterStateCallbackType = (state: StateManagerBase) => void;
    }
}

/**
 * Base state manager with event support.
 */
declare class StateManagerBase extends EventEmitter {
    /**
     * Create a StateManagerBase.
     *
     * @param config - Configuration options.
     */
    constructor(config?: StateManagerBase.IConfig);

    /**
     * Start the state manager.
     *
     * @param newState - State name to start.
     * @returns This StateManagerBase instance.
     */
    start(newState: string): this;
    /**
     * Advance to the next state.
     *
     * @returns This StateManagerBase instance.
     */
    next(): this;
    /**
     * Go to a specific state.
     *
     * @param nextState - State name to go to.
     * @returns This StateManagerBase instance.
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
     * List of state names.
     */
    readonly stateList: string[];

    /**
     * Enable or disable the state manager.
     *
     * @param enable - Whether to enable.
     * @returns This StateManagerBase instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enabled state.
     *
     * @returns This StateManagerBase instance.
     */
    toggleEnable(): this;
    /**
     * Whether the state manager is enabled.
     */
    enable: boolean;

    /**
     * Add a state by name.
     *
     * @param name - State name.
     * @param state - State configuration.
     * @returns This StateManagerBase instance.
     */
    addState(
        name: string,
        state: StateManagerBase.IState
    ): this;
    /**
     * Add a state by config.
     *
     * @param state - State configuration.
     * @returns This StateManagerBase instance.
     */
    addState(
        state: StateManagerBase.IState
    ): this;

    /**
     * Add multiple states by list.
     *
     * @param state - State configuration list.
     * @returns This StateManagerBase instance.
     */
    addStates(
        state: StateManagerBase.IState[]
    ): this;
    /**
     * Add multiple states by map.
     *
     * @param states - State configuration map.
     * @returns This StateManagerBase instance.
     */
    addStates(
        states: { [name: string]: StateManagerBase.IState }
    ): this;

    /**
     * Remove a state by name.
     *
     * @param name - State name.
     * @returns This StateManagerBase instance.
     */
    removeState(name: string): this;

    /**
     * Remove all states.
     *
     * @returns This StateManagerBase instance.
     */
    removeAllStates(): this;

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
