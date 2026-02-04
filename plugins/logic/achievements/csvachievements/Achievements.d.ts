import Base from '../achievements/Achievements';

export default Achievements;

declare namespace Achievements {
    /**
     * Configuration options for loading CSV achievements.
     */
    interface ILoadCSVConfig {
        /**
         * CSV delimiter.
         */
        delimiter?: string
    }
}
/**
 * Achievement manager with CSV loading support.
 */
declare class Achievements extends Base {
    /**
     * Load achievements from CSV string.
     *
     * @param csvString - CSV content.
     * @param config - CSV load configuration.
     * @returns This Achievements instance.
     */
    loadCSV(
        csvString: string,
        config?: Achievements.ILoadCSVConfig
    ): this;
}
