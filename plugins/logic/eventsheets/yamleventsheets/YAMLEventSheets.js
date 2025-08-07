import JSONEventSheets from '../jsoneventsheets/JSONEventSheets.js';
import ParseYaml from '../../../utils/yaml/ParseYaml.js';

class YAMLEventSheets extends JSONEventSheets {

    addEventSheet(yamlString, groupName, config) {
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