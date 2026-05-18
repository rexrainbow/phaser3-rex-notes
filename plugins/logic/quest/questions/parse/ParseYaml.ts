import yaml from 'js-yaml';

var ParseYaml = function(yamlString?: any, config?: any) {
    var items = [];
    if (Array.isArray(yamlString)) {
        yamlString.forEach(function(s?: any) {
            try {
                items.push(yaml.load(s, config));
            } catch (e) {
                console.log(e);
            }
        })

    } else {
        try {
            yaml.loadAll(yamlString, function(item?: any) {
                items.push(item);
            }, config);
        } catch (e) {
            console.log(e);
        }
    }

    return items;
}

export default ParseYaml;