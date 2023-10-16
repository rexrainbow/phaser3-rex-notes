import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default LevelCounter;

declare namespace LevelCounter {
    type TableType = ((level: number) => number) |
        number[] |
    { [level: number]: number }

    interface IConfig {
        table: TableType,
        maxLevel?: number,

        exp?: number,
    }

    type LevelUpCallback = (
        level: number,
        fromExp: number, toExp: number,
        levelStartExp: number, levelEndExp: number
    ) => void;

}

declare class LevelCounter extends EventEmitter {
    constructor(config: LevelCounter.IConfig);

    exp: number;
    level: number;
    readonly requiredExp: number;

    setTable(table: LevelCounter.TableType): this;

    setMaxLevel(maxLevel?: number): this;
    readonly hasMaxLevel: boolean;
    readonly maxLevel: number;
    readonly maxExp: number;

    resetExp(exp: number): this;

    getExp(): number;
    getExp(level: number): number;

    getLevel(): number;
    getLevel(exp: number, level?: number): number;

    getRequiredExpToNextLevel(level?: number, exp?: number): number;

    checkLevel(level: number, exp: number): boolean;

    gainExp(
        incExp: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

    setExp(
        exp: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

    setLevel(
        level: number,
        callback?: LevelCounter.LevelUpCallback,
        scope?: Object
    ): this;

}
