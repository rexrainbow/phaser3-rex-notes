import yaml from 'js-yaml';

var YamlParser = function (yamlString) {
    var doc;
    try {
        doc = yaml.load(yamlString);
    } catch (e) {
        doc = null;
        console.log(e);
    }

    return doc;
}

export default YamlParser;