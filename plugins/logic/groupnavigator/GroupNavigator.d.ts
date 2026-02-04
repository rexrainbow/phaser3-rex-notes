import EventEmitter from '../../utils/eventemitter/EventEmitter';


export default GroupNavigator;

declare namespace GroupNavigator {
    /**
     * Callback that determines whether a target can receive focus.
     *
     * @param gameOject - Target game object.
     * @returns True if focus is enabled.
     */
    type FocusEnableCallbackType = (gameOject: Phaser.GameObjects.GameObject) => boolean;

    /**
     * Configuration options for creating a GroupNavigator.
     */
    interface IConfig {
        /**
         * Enable group navigation.
         */
        enable?: boolean,

        /**
         * Initial target list.
         */
        targets?: Phaser.GameObjects.GameObject[],
        /**
         * Column count for grid navigation.
         */
        columns?: number,

        /**
         * Callback that controls target focusability.
         */
        getFocusEnableCallback?: FocusEnableCallbackType,
        /**
         * Data key used to determine focusability.
         */
        focusEnableDataKey?: string,
        /**
         * Property key used to determine focusability.
         */
        focusEnableKey?: string,

        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }
}

/**
 * Navigator for moving focus across a group of game objects.
 */
declare class GroupNavigator extends EventEmitter {
    /**
     * Create a GroupNavigator with scene and config.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     */
    constructor(scene?: any, config?: GroupNavigator.IConfig);
    /**
     * Create a GroupNavigator with config only.
     *
     * @param config - Configuration options.
     */
    constructor(config: GroupNavigator.IConfig);

    /**
     * Currently focused target.
     */
    readonly focusedTarget: Phaser.GameObjects.GameObject | null;
    /**
     * Current focus index in grid form.
     */
    readonly focusIndex: { x: number, y: number };

    /**
     * Target collection in list or grid form.
     */
    targets: Phaser.GameObjects.GameObject[] |
        Phaser.GameObjects.GameObject[][];

    /**
     * Enable or disable navigation.
     *
     * @param enable - Enable state.
     * @returns This GroupNavigator instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Navigation enable state.
     */
    enable: boolean;

    /**
     * Set navigation targets.
     *
     * @param targets - Target list.
     * @param columns - Column count for grid layout.
     * @returns This GroupNavigator instance.
     */
    setTargets(
        targets?: Phaser.GameObjects.GameObject[],
        columns?: number
    ): this;

    /**
     * Set focus-enable data key.
     *
     * @param dataKey - Data key name.
     * @returns This GroupNavigator instance.
     */
    setFocusEnableDataKey(dataKey?: string): this;

    /**
     * Set focus-enable property key.
     *
     * @param key - Property key name.
     * @returns This GroupNavigator instance.
     */
    setFocusEnableKey(key?: string): this;

    /**
     * Set custom focus-enable callback.
     *
     * @param callback - Focus-enable callback.
     * @returns This GroupNavigator instance.
     */
    setGetFocusEnableCallback(
        callback?: GroupNavigator.FocusEnableCallbackType
    ): this;

    /**
     * Get currently focused target.
     *
     * @returns Focused game object or null.
     */
    getFocusedTarget(): Phaser.GameObjects.GameObject | null;

    /**
     * Focus the first available target.
     *
     * @returns This GroupNavigator instance.
     */
    first(): this;
    /**
     * Focus the last available target.
     *
     * @returns This GroupNavigator instance.
     */
    last(): this;
    /**
     * Focus the next target.
     *
     * @returns This GroupNavigator instance.
     */
    next(): this;
    /**
     * Focus the previous target.
     *
     * @returns This GroupNavigator instance.
     */
    previous(): this;
    /**
     * Focus the target in next row.
     *
     * @returns This GroupNavigator instance.
     */
    nextRow(): this;
    /**
     * Focus the target in previous row.
     *
     * @returns This GroupNavigator instance.
     */
    previousRow(): this;

    /**
     * Focus a specific target.
     *
     * @param gameObject - Target game object.
     * @returns This GroupNavigator instance.
     */
    focus(gameObject?: Phaser.GameObjects.GameObject): this;
    /**
     * Clear current focus.
     *
     * @returns This GroupNavigator instance.
     */
    blur(): this;

    /**
     * Add a target.
     *
     * @param gameObject - Target game object.
     * @returns This GroupNavigator instance.
     */
    addTarget(gameObject: Phaser.GameObjects.GameObject): this;
    /**
     * Insert a target at index.
     *
     * @param gameObject - Target game object.
     * @param index - Insert index.
     * @returns This GroupNavigator instance.
     */
    insertTarget(
        gameObject: Phaser.GameObjects.GameObject,
        index: number
    ): this;
    /**
     * Remove a target.
     *
     * @param gameObject - Target game object.
     * @returns This GroupNavigator instance.
     */
    removeTarget(gameObject: Phaser.GameObjects.GameObject): this;

}
