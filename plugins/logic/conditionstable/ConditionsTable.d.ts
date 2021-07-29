export default ConditionsTable;

declare namespace ConditionsTable {
    interface ILoadConfig {
        delimiter?: string
    }

    type ValuesType = {
        [name: string]: any
    }

    type ResultsType = {
        [name: string]: boolean
    }
}

declare class ConditionsTable {

    loadCSV(
        csvString: string,
        config?: ConditionsTable.ILoadConfig
    ): this;

    getTestResults(
        values: ConditionsTable.ValuesType,
    ): ConditionsTable.ResultsType;

    anyPassTest(
        values: ConditionsTable.ValuesType,
        callback: (testName: string) => void,
        scope?: object
    ): this;

    anyPassTest(
        values: ConditionsTable.ValuesType
    ): string;

    eachPassTest(
        values: ConditionsTable.ValuesType,
        callback: (testName: string) => void,
        scope?: object
    ): this;

    eachTest(
        values: ConditionsTable.ValuesType,
        callback: (testName: string, result: boolean) => void,
        scope?: object
    ): this;

}