import CreateBackground from '../../utils/build/CreateBackground.js';
import Merge from '../../../../plugins/utils/object/Merge.js';

var CreateSeparator = function (scene, config, style) {
    return CreateBackground(scene, Merge(config, style));
}

export default CreateSeparator;