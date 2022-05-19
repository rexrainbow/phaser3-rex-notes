import yaml from 'js-yaml';
import Make from './Make.js';

var YAMLMake = function (scene, config, styles, customMakeCallbacks) {
    if (typeof (config) === 'string') {
        try {
            config = yaml.load(config);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    if (typeof (styles) === 'string') {
        try {
            styles = yaml.load(styles);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    return Make(scene, config, styles, customMakeCallbacks);
}

export default YAMLMake;