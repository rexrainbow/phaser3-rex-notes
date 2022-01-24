import ParseYaml from '../../../../utils/yaml/ParseYaml.js';
import CreateNode from './CreateNode.js';

var LoadYaml = function (yamlString, customNodeHandlers) {
    if (customNodeHandlers === undefined) {
        customNodeHandlers = {};
    }

    var obj = ParseYaml(yamlString);
    for (var key in obj) {
        var data = obj[key];
        data.__handlerName__ = key;
        return CreateNode(data, customNodeHandlers);
    }
}

export default LoadYaml;