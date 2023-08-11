import EventEmitter from '../../utils/eventemitter/EventEmitter';

export default LevelCounter;

declare namespace LevelCounter {
    type TableType = ((level: number) => number) |
        number[] |
    { [level: number]: number }

    interface IConfig {
        table: TableType,

        exp?: number,
    }
}

declare class LevelCounter extends EventEmitter {
    constructor(config: LevelCounter.IConfig);

    setTable(table: LevelCounter.TableType): this;

    setExp(exp: number, level?: number): this;

    getExp(): number;
    getExp(level: number): number;

    getLevel(): number;
    getLevel(exp: number, level?: number): number;

    getRequiredExpToNextLevel(level: number, exp: number): number;

    checkLevel(level: number, exp: number): boolean;

    gainExp(incExp: number): this;
}
