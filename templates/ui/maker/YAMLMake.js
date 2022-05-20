import ParseYAML from './utils/ParseYAML.js';
import Make from './Make.js';

var YAMLMake = function (scene, config, styles, customBuilders) {
    config = ParseYAML(config);
    // Parsing result of YAML config might be an array, 
    // Only last item will be used to create game object, others are references
    if (Array.isArray(config)) {
        config = config[config.length - 1];
    }

    styles = ParseYAML(styles);

    var gameObject = Make(scene, config, styles, customBuilders);

    return gameObject;
}

export default YAMLMake;