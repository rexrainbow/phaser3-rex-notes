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
}

declare class LevelCounter extends EventEmitter {
    constructor(config: LevelCounter.IConfig);

    exp: number;
    level: number;
    readonly requiredExp: number;

    setTable(table: LevelCounter.TableType): this;

    setMaxLevel(maxLevel?: number): this;
    hasMaxLevel: boolean;
    maxLevel: number;
    maxExp: number;

    resetExp(exp: number): this;

    getExp(): number;
    getExp(level: number): number;

    getLevel(): number;
    getLevel(exp: number, level?: number): number;

    getRequiredExpToNextLevel(level?: number, exp?: number): number;

    checkLevel(level: number, exp: number): boolean;

    gainExp(incExp: number): this;

    setExp(exp: number): this;

    setLevel(level: number): this;
}
