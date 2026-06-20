import JSONEventSheets from '../jsoneventsheets/JSONEventSheets.js';
import ParseYaml from '../../../utils/yaml/ParseYaml.js';

class YAMLEventSheets extends JSONEventSheets {
    buildEventSheet(yamlString, groupName, config) {
        var jsonData;
        if (typeof (yamlString) === 'string') {
            jsonData = ParseYaml(yamlString);
        } else {
            jsonData = yamlString;
        }
        return super.buildEventSheet(jsonData, groupName, config);
    }
}

export default YAMLEventSheets;
