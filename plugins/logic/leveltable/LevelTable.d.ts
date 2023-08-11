export default LevelTable;

declare namespace LevelTable {
    type TableType = ((level: number) => number) |
        number[] |
    { [level: number]: number }

    interface IConfig {
        table: TableType,

        exp?: number,
    }
}

declare class LevelTable {
    constructor(config: LevelTable.IConfig);

    setTable(table: LevelTable.TableType): this;

    setExp(exp: number, level?: number): this;

    getExp(level?: number): number;

    getLevel(exp: number, level?: number): number;

    getRequiredExpToNextLevel(level: number, exp: number): number;

    checkLevel(level: number, exp: number): boolean;

    gainExp(incExp: number): this;
}
