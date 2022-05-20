import ParseYAML from './utils/ParseYAML.js';
import Make from './Make.js';

var YAMLMake = function (scene, data, view, styles, customBuilders) {
    data = ParseYAML(data);
    // Parsing result of YAML data might be an array, 
    // Only last item will be used to create game object, others are references
    if (Array.isArray(data)) {
        data = data[data.length - 1];
    }

    view = ParseYAML(view);

    styles = ParseYAML(styles);

    var gameObject = Make(scene, data, view, styles, customBuilders);

    return gameObject;
}

export default YAMLMake;