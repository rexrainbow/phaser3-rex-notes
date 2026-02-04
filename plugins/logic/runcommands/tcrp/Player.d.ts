import ComponentBase from '../../../utils/componentbase/ComponentBase.js';

export default Player;

declare namespace Player {
    /**
     * Time unit type.
     */
    type TimeUnitType = 0 | 1 | 'ms' | 's' | 'sec';
    /**
     * Delta-time mode type.
     */
    type DtModeType = 0 | 1 | 'abs' | 'absolute' | 'inc' | 'increment';

    /**
     * Configuration options for creating a Player.
     */
    interface IConfig extends ComponentBase.IConfig {
        /**
         * Time unit used by commands.
         */
        timeUnit?: TimeUnitType
        /**
         * Delta-time mode.
         */
        dtMode?: DtModeType,
        /**
         * Initial command queue.
         */
        commands?: any[],
        /**
         * Playback time scale.
         */
        timeScale?: number,
        /**
         * Scope object used by command execution.
         */
        scope?: object,
    }

    /**
     * Configuration options used when loading commands.
     */
    interface ILoadConfig {
        /**
         * Time unit used by loaded commands.
         */
        timeUnit?: TimeUnitType
        /**
         * Delta-time mode for loaded commands.
         */
        dtMode?: DtModeType,
    }

    namespace Events {
        /**
         * Callback fired when playback completes.
         *
         * @param parent - Parent scene or game object.
         * @param player - Player instance.
         */
        type CompleteCallbackType = (
            parent: Phaser.Scene | Phaser.GameObjects.GameObject,
            player: Player
        ) => void;

        /**
         * Callback fired when a command is executed.
         *
         * @param command - Command array.
         * @param scope - Execution scope.
         */
        type RunCommandCallbackType = (command: any[], scope: object) => void;
    }
}

/**
 * Timed command player.
 */
declare class Player extends ComponentBase {
    /**
     * Create a Player.
     *
     * @param parent - Parent scene or game object.
     * @param config - Configuration options.
     */
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: Player.IConfig
    );

    /**
     * Load commands.
     *
     * @param commands - Command queue.
     * @param scope - Scope object used by command execution.
     * @param config - Load options.
     * @returns This Player instance.
     */
    load(
        commands: any[],
        scope?: object,
        config?: Player.ILoadConfig
    ): this;

    /**
     * Clear command queue.
     *
     * @returns This Player instance.
     */
    clear(): this;

    /**
     * Append a command at a specific time.
     *
     * @param time - Command time.
     * @param fn - Command name or callback.
     * @param params - Command parameters.
     * @returns This Player instance.
     */
    append(
        time: number,
        fn: string | Function,
        ...params: any
    ): this;

    /**
     * Start playback.
     *
     * @param startAt - Start time.
     * @returns This Player instance.
     */
    start(startAt?: number): this;

    /**
     * Pause playback.
     *
     * @returns This Player instance.
     */
    pause(): this;
    /**
     * Resume playback.
     *
     * @returns This Player instance.
     */
    resume(): this;
    /**
     * Stop playback.
     *
     * @returns This Player instance.
     */
    stop(): this;

    /**
     * Seek to a time.
     *
     * @param time - Target time.
     * @returns This Player instance.
     */
    seek(time: number): this;
    /**
     * Seek to next command time.
     *
     * @returns This Player instance.
     */
    seekToNext(): this;

    /**
     * Whether playback is active.
     */
    readonly isPlaying: boolean;
    /**
     * Whether playback has completed.
     */
    readonly completed: boolean;
    /**
     * Current playback time.
     */
    readonly now: number;

    /**
     * Set playback time scale.
     *
     * @param timeScale - Time scale value.
     * @returns This Player instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Playback time scale.
     */
    timeScale: number;
}
