import yaml from 'js-yaml';
import Make from './Make.js';

var YAMLMake = function (scene, config, defaultConfig, customMakeCallbacks) {
    try {
        config = yaml.load(config);
    } catch (e) {
        console.log(e);
        return undefined;
    }

    return Make(scene, config, defaultConfig, customMakeCallbacks);
}

export default YAMLMake;