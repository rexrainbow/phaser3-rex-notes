import Base from '../conditiontable/ConditionsTable';

export default ConditionsTable;

declare namespace ConditionsTable {
    /**
     * Configuration options for loading conditions from CSV text.
     */
    interface ILoadConfig {
        /**
         * Delimiter character used to split CSV columns.
         */
        delimiter?: string
    }
}

/**
 * Conditions table that supports CSV loading.
 */
declare class ConditionsTable extends Base {

    /**
     * Load condition definitions from CSV text.
     *
     * @param csvString - CSV text containing condition entries.
     * @param config - Optional CSV loading configuration.
     * @returns This conditions table.
     */
    loadCSV(
        csvString: string,
        config?: ConditionsTable.ILoadConfig
    ): this;
}
