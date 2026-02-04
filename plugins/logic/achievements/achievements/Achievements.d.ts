export default Achievements;

declare namespace Achievements {
    /**
     * Context data used for achievement tests.
     */
    type ContextType = {
        [name: string]: any
    }

    /**
     * Achievement test callback.
     *
     * @param context - Test context data.
     * @returns True if achievement is obtained.
     */
    type TestFunctionType = (
        context: ContextType
    ) => boolean;

    /**
     * Obtained state of a single achievement.
     */
    type AchievementStateType = {
        wasObtained: boolean,
        justObtained: boolean
    }

    /**
     * Obtained states of achievements in one level.
     */
    type LevelStateType = {
        [achievemenName: string]: AchievementStateType
    }

    /**
     * Obtained states of all levels.
     */
    type AllLevelsStatesType = {
        [levelName: string]: LevelStateType
    }

    /**
     * Callback for iterating obtained states.
     *
     * @param levelName - Level name.
     * @param achievementName - Achievement name.
     * @param obtainedState - Obtained state object.
     */
    type ForEachObtainedStateCallback =
        (
            levelName: string,
            achievementName: string,
            obtainedState: AchievementStateType
        )
            => void;

}
/**
 * Achievement manager with level-based test and state tracking.
 */
declare class Achievements {

    /**
     * Clear all achievements and states.
     *
     * @returns This Achievements instance.
     */
    clear(): this;

    /**
     * Add an achievement test.
     *
     * @param levelName - Level name.
     * @param achievementName - Achievement name.
     * @param callback - Test callback.
     * @returns This Achievements instance.
     */
    add(
        levelName: string,
        achievementName: string,
        callback: Achievements.TestFunctionType
    ): this;

    /**
     * Run tests of a level with context.
     *
     * @param levelName - Level name.
     * @param context - Test context data.
     * @returns This Achievements instance.
     */
    runTest(
        levelName: string,
        context: Achievements.ContextType
    ): this;

    /**
     * Get test results of a level.
     *
     * @param levelName - Level name.
     * @param context - Test context data.
     * @returns Level state map.
     */
    getTestResults(
        levelName: string,
        context: Achievements.ContextType
    ): Achievements.LevelStateType;

    /**
     * Get obtained state of an achievement.
     *
     * @param levelName - Level name.
     * @param achievementName - Achievement name.
     * @returns Obtained state object.
     */
    getObtainedState(
        levelName: string,
        achievementName: string
    ): Achievements.AchievementStateType;

    /**
     * Get obtained states of a level.
     *
     * @param levelName - Level name.
     * @returns Level state map.
     */
    getObtainedState(
        levelName: string
    ): Achievements.LevelStateType;

    /**
     * Get obtained states of all levels.
     *
     * @returns All levels state map.
     */
    getObtainedState(
    ): Achievements.AllLevelsStatesType;

    /**
     * Iterate obtained states of a level.
     *
     * @param levelName - Level name.
     * @param callback - Iteration callback.
     * @param scope - Callback scope.
     * @returns This Achievements instance.
     */
    forEachObtainedState(
        levelName: string,
        callback: Achievements.ForEachObtainedStateCallback,
        scope?: object
    ): this;

    /**
     * Get obtained states of all levels.
     *
     * @returns All levels state map.
     */
    getObtainedStates(
    ): Achievements.AllLevelsStatesType;

    /**
     * Load obtained states.
     *
     * @param states - All levels state map.
     * @returns This Achievements instance.
     */
    loadObtainedStates(
        states: Achievements.AllLevelsStatesType
    ): this;

    /**
     * Get level names.
     *
     * @param out - Output array.
     * @returns Level name list.
     */
    getLevelNames(
        out?: string[]
    ): string[];

    /**
     * Get achievement names of a level.
     *
     * @param levelName - Level name.
     * @param out - Output array.
     * @returns Achievement name list.
     */
    getAchievementNames(
        levelName: string,
        out?: string[]
    ): string[];

    /**
     * Set obtained state of an achievement.
     *
     * @param levelName - Level name.
     * @param achievementName - Achievement name.
     * @param value - Obtained state.
     * @returns This Achievements instance.
     */
    setObtainedState(
        levelName: string,
        achievementName: string,
        value?: boolean
    ): this;

    /**
     * Clear obtained state of an achievement.
     *
     * @param levelName - Level name.
     * @param achievementName - Achievement name.
     * @returns This Achievements instance.
     */
    clearObtainedState(
        levelName: string,
        achievementName: string
    ): this;

}
