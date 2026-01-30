import FSMBase from './FSMBase';

export default FSM;

declare namespace FSM {

    /**
     * Configuration for a single state.
     */
    interface IStateConfig extends FSMBase.IStateConfig {
        /**
         * Next state name or resolver.
         */
        next?: string | ((this: FSM) => string),
        /**
         * Enter callback.
         */
        enter?: (this: FSM) => void,
        /**
         * Exit callback.
         */
        exit?: (this: FSM) => void,
        /**
         * Update callback.
         */
        update?: (this: FSM, time: number, delta: number) => void;
        /**
         * Pre-update callback.
         */
        preupdate?: (this: FSM, time: number, delta: number) => void;
        /**
         * Post-update callback.
         */
        postupdate?: (this: FSM, time: number, delta: number) => void;
    }

    /**
     * Configuration options for creating an FSM.
     */
    interface IConfig extends FSMBase.IConfig {
        /**
         * State configuration map.
         */
        states?: { [name: string]: IStateConfig },

        /**
         * Scene to hook update events.
         */
        scene?: Phaser.Scene;
    }
}

/**
 * Finite state machine with update hooks.
 */
declare class FSM extends FSMBase {
    /**
     * Create an FSM.
     *
     * @param config - Configuration options.
     */
    constructor(config?: FSM.IConfig);

    /**
     * Add a state by name.
     *
     * @param name - State name.
     * @param state - State configuration.
     * @returns This FSM instance.
     */
    addState(
        name: string,
        state: FSM.IStateConfig
    ): this;
    /**
     * Add a state by config.
     *
     * @param state - State configuration.
     * @returns This FSM instance.
     */
    addState(state: FSM.IStateConfig): this;

    /**
     * Add multiple states by map.
     *
     * @param states - State configuration map.
     * @returns This FSM instance.
     */
    addStates(
        states: { [name: string]: FSM.IStateConfig }
    ): this;
    /**
     * Add multiple states by list.
     *
     * @param states - State configuration list.
     * @returns This FSM instance.
     */
    addStates(
        states: FSM.IStateConfig[]
    ): this;

    /**
     * Update the FSM.
     *
     * @param time - Current time.
     * @param delta - Delta time.
     */
    update(
        time: number,
        delta: number
    ): void;

    /**
     * Pre-update the FSM.
     *
     * @param time - Current time.
     * @param delta - Delta time.
     */
    preupdate(
        time: number,
        delta: number
    ): void;

    /**
     * Post-update the FSM.
     *
     * @param time - Current time.
     * @param delta - Delta time.
     */
    postupdate(
        time: number,
        delta: number
    ): void;

    /**
     * Start update callbacks.
     *
     * @param scene - Scene to hook.
     * @returns This FSM instance.
     */
    startUpdate(
        scene?: Phaser.Scene
    ): this;
    /**
     * Stop update callbacks.
     *
     * @returns This FSM instance.
     */
    stopUpdate(): this;

    /**
     * Start pre-update callbacks.
     *
     * @param scene - Scene to hook.
     * @returns This FSM instance.
     */
    startPreUpdate(
        scene?: Phaser.Scene
    ): this;
    /**
     * Stop pre-update callbacks.
     *
     * @returns This FSM instance.
     */
    stopPreUpdate(): this;

    /**
     * Start post-update callbacks.
     *
     * @param scene - Scene to hook.
     * @returns This FSM instance.
     */
    startPostUpdate(
        scene?: Phaser.Scene
    ): this;
    /**
     * Stop post-update callbacks.
     *
     * @returns This FSM instance.
     */
    stopPostUpdate(): this;

}
