import JSONEventSheets from '../jsoneventsheets/JSONEventSheets';
import ParseYaml from '../../../utils/yaml/ParseYaml';

class YAMLEventSheets extends JSONEventSheets {

    addEventSheet(yamlString?: any, groupName?: any, config?: any) {
        var jsonData;
        if (typeof (yamlString) === 'string') {
            jsonData = ParseYaml(yamlString);
        } else {
            jsonData = yamlString;
        }

        super.addEventSheet(jsonData, groupName, config);

        return this;
    }
}

export default YAMLEventSheets;