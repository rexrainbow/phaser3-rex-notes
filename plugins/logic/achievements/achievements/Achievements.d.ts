export default Achievements;

declare namespace Achievements {
    interface ILoadCSVConfig {
        delimiter?: string
    }

    type ValuesType = {
        [name: string]: any
    }

    type AchievementStateType = {
        wasObtained: boolean,
        justObtained: boolean
    }

    type LevelStateType = {
        [achievemenName: string]: AchievementStateType
    }

    type AllLevelsStatesType = {
        [levelName: string]: LevelStateType
    }

    type ForEachObtainedStateCallback =
        (levelName: string, achievementName: string, obtainedState: AchievementStateType)
            => void;

}
declare class Achievements {
    loadCSV(
        csvString: string,
        config?: Achievements.ILoadCSVConfig
    ): this;

    runTest(
        levelName: string,
        values: Achievements.ValuesType
    ): this;

    getTestResults(
        levelName: string,
        values: Achievements.ValuesType
    ): Achievements.LevelStateType;

    getObtainedState(
        levelName: string,
        achievementName: string
    ): Achievements.AchievementStateType;

    getObtainedState(
        levelName: string
    ): Achievements.LevelStateType;

    getObtainedState(
    ): Achievements.AllLevelsStatesType;

    forEachObtainedState(
        levelName: string,
        callback: Achievements.ForEachObtainedStateCallback,
        scope?: object
    ): this;

    getObtainedStates(
    ): Achievements.AllLevelsStatesType;

    loadObtainedStates(
        states: Achievements.AllLevelsStatesType
    ): this;

    getLevelNames(
        out?: string[]
    ): string[];

    getAchievementNames(
        levelName: string,
        out?: string[]
    ): string[];

    setObtainedState(
        levelName: string,
        achievementName: string,
        value?: boolean
    ): this;

    clearObtainedState(
        levelName: string,
        achievementName: string
    ): this;

}