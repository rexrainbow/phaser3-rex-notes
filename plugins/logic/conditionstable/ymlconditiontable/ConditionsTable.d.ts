import Base from '../conditiontable/ConditionsTable';

export default ConditionsTable;

declare namespace ConditionsTable {
}

/**
 * Conditions table that supports YML loading.
 */
declare class ConditionsTable extends Base {

    /**
     * Load condition definitions from YML text.
     *
     * @param ymlString - YML text containing condition entries.
     * @returns This conditions table.
     */
    loadYML(
        ymlString: string
    ): this;
}
