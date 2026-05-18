import yaml from 'js-yaml';
import CreateNode from './CreateNode';

var LoadYaml = function(yamlString?: any, customNodeHandlers?: any) {
    if (customNodeHandlers === undefined) {
        customNodeHandlers = {};
    }

    var obj;
    try {
        obj = yaml.load(yamlString);
    } catch (e) {
        console.log(e);
    }

    for (var key in obj) {
        var data = obj[key];
        data.__handlerName__ = key;
        return CreateNode(data, customNodeHandlers);
    }
}

export default LoadYaml;