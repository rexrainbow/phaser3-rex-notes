import CreateBackgroundBase from '../../utils/build/CreateBackground.js';
import Merge from '../../../../plugins/utils/object/Merge.js';

var CreateBackground = function (scene, config, style) {
    return CreateBackgroundBase(scene, Merge(config, style));
}

export default CreateBackground;