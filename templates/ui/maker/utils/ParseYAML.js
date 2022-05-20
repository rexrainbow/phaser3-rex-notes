import yaml from 'js-yaml';

var ParseYAML = function (s) {
    if (typeof (s) === 'string') {
        try {
            return yaml.load(s);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }
    return s;
}

export default ParseYAML;