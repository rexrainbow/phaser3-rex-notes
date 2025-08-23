import JSONEventSheets from '../jsoneventsheets/JSONEventSheets';

export default YAMLEventSheets;

declare namespace YAMLEventSheets {
    interface IConfig extends JSONEventSheets.IConfig {

    }

    interface IAddEventSheet extends JSONEventSheets.IAddEventSheet {
    }
}

declare class YAMLEventSheets extends JSONEventSheets {

    addEventSheet(
        yamlString: string,
        groupName?: string,
        config?: YAMLEventSheets.IAddEventSheet,
    ): this;

    addEventSheet(
        yamlString: string,
        config?: YAMLEventSheets.IAddEventSheet,
    ): this;
}