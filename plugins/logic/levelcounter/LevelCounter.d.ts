import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default LevelCounter;

declare namespace LevelCounter {
    /**
     * Experience table type.
     */
    type TableType = ((level: number) => number) |
        number[] |
    { [level: number]: number }

    /**
     * Configuration options for creating a LevelCounter.
     */
    interface IConfig {
        /**
         * Experience table.
         */
        table: TableType,
        /**
         * Maximum allowed level.
         */
        maxLevel?: number,

        /**
         * Initial experience value.
         */
        exp?: number,
    }

    /**
     * Callback fired when level increases.
     *
     * @param level - New level.
     * @param fromExp - Previous experience value.
     * @param toExp - Current experience value.
     * @param levelStartExp - Start experience of this level.
     * @param levelEndExp - End experience of this level.
     */
    type LevelUpCallback = (
        level: number,
        fromExp: number,
        toExp: number,
        levelStartExp: number,
        levelEndExp: number
    ) => void;

}

/**
 * Experience and level progression helper.
 */
declare class LevelCounter extends EventEmitter {
    /**
     * Create a LevelCounter instance.
     *
     * @param config - Configuration options.
     */
    constructor(config: LevelCounter.IConfig);

    /**
     * Current experience value.
     */
    exp: number;
    /**
     * Current level value.
     */
    level: number;
    /**
     * Required experience to reach next level.
     */
    readonly requiredExp: number;

    /**
     * Set the experience table.
     *
     * @param table - Experience table.
     * @returns This LevelCounter instance.
     */
    setTable(table: LevelCounter.TableType): this;

    /**
     * Set maximum level.
     *
     * @param maxLevel - Maximum level.
     * @returns This LevelCounter instance.
     */
    setMaxLevel(maxLevel?: number): this;
    /**
     * Whether max level is enabled.
     */
    readonly hasMaxLevel: boolean;
    /**
     * Maximum level value.
     */
    readonly maxLevel: number;
    /**
     * Maximum experience value.
     */
    readonly maxExp: number;

    /**
     * Reset current experience.
     *
     * @param exp - Experience value.
     * @returns This LevelCounter instance.
     */
    resetExp(exp: number): this;

    /**
     * Get current experience.
     *
     * @returns Current experience.
     */
    getExp(): number;
    /**
     * Get experience required for a level.
     *
     * @param level - Target level.
     * @returns Experience value.
     */
    getExp(level: number): number;

    /**
     * Get current level.
     *
     * @returns Current level.
     */
    getLevel(): number;
    /**
     * Get level from experience.
     *
     * @param exp - Experience value.
     * @param level - Start level hint.
     * @returns Resolved level.
     */
    getLevel(exp: number, level?: number): number;

    /**
     * Get experience needed to next level.
     *
     * @param level - Current level.
     * @param exp - Current experience.
     * @returns Required experience to next level.
     */
    getRequiredExpToNextLevel(
        level?: number,
        exp?: number
    ): number;

    /**
     * Check whether level and experience are valid.
     *
     * @param level - Level value.
     * @param exp - Experience value.
     * @returns True if valid.
     */
    checkLevel(level: number, exp: number): boolean;

    /**
     * Gain experience.
     *
     * @param incExp - Experience increment.
     * @param callback - Level-up callback.
     * @param scope - Callback scope.
     * @returns This LevelCounter instance.
     */
    gainExp(
        incExp: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

    /**
     * Set experience value.
     *
     * @param exp - Experience value.
     * @param callback - Level-up callback.
     * @param scope - Callback scope.
     * @returns This LevelCounter instance.
     */
    setExp(
        exp: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

    /**
     * Set level value.
     *
     * @param level - Level value.
     * @param callback - Level-up callback.
     * @param scope - Callback scope.
     * @returns This LevelCounter instance.
     */
    setLevel(
        level: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

}
