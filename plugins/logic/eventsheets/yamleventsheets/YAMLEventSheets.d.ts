import JSONEventSheets from '../jsoneventsheets/JSONEventSheets';

export default YAMLEventSheets;

declare namespace YAMLEventSheets {
    /**
     * Configuration options for creating YAMLEventSheets.
     */
    interface IConfig extends JSONEventSheets.IConfig {

    }

    /**
     * Configuration for adding a YAML event sheet.
     */
    interface IAddEventSheet extends JSONEventSheets.IAddEventSheet {
    }
}

/**
 * Event sheet manager that loads YAML definitions.
 */
declare class YAMLEventSheets extends JSONEventSheets {

    /**
     * Add a YAML event sheet with group name and config.
     *
     * @param yamlString - YAML string data.
     * @param groupName - Group name.
     * @param config - Add configuration.
     * @returns This YAMLEventSheets instance.
     */
    addEventSheet(
        yamlString: string,
        groupName?: string,
        config?: YAMLEventSheets.IAddEventSheet
    ): this;

    /**
     * Add a YAML event sheet with config.
     *
     * @param yamlString - YAML string data.
     * @param config - Add configuration.
     * @returns This YAMLEventSheets instance.
     */
    addEventSheet(
        yamlString: string,
        config?: YAMLEventSheets.IAddEventSheet
    ): this;
}
