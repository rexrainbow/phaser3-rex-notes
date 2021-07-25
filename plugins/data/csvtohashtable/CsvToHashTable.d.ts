export default CsvToHashTable;

declare namespace CsvToHashTable {
    type ConverCallbackType = (value: string, rowKey: string, colKey: string) => any;

    type AppendDataCallbackType = (table: CsvToHashTable, rowKey: string, colKey: string) => any

    type SortModeType = 0 | 1 | 2 | 3 | 'ascending' | 'descending' | 'logical ascending' | 'logical descending';

    type SortCallbackType = (key0: string, key1: string) => number;

    type EachCallbackType = (table: CsvToHashTable, rowKey: string, colKey: string, value: any) => void;

    interface ILoadConfig {
        delimiter?: string,
        convert?: boolean | ConverCallbackType,
        convertScope?: object
    }
}

declare class CsvToHashTable {
    constructor();

    destroy(): void;

    loadCSV(
        csvString: string,
        config?: CsvToHashTable.ILoadConfig
    ): this;

    convertCol(
        colKey: string,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    convertRow(
        rowKey: string,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    get(
        rowKey: string, colKey: string
    ): any;

    set(
        rowKey: string, colKey: string,
        value: any
    ): this;

    add(
        rowKey: string, colKey: string,
        value: number
    ): this;

    hasRowKey(rowKey: string): boolean;

    hasColKey(colKey: string): boolean;

    hasKey(rowKey: string, colKey: string): boolean;

    isValueInRol(rowKey: string, data: any): boolean;

    isValueInCol(colKey: string, data: any): boolean;

    clear(): this;

    appendCol(
        colKey: string,
        initValue: any
    ): this;

    appendCol(
        colKey: string,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    appendRow(
        rowKey: string,
        initValue: any
    ): this;

    appendRow(
        rowKey: string,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    removeCol(colKey: string): this;

    removeRol(rowKey: string): this;

    sortCol(
        colKey: string,
        mode: CsvToHashTable.SortModeType
    ): this;

    sortCol(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    sortRow(
        rowKey: string,
        mode: CsvToHashTable.SortModeType
    ): this;

    sortRow(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    eachCol(rowKey: string,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

    eachRow(colKey: string,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

}