import CreateBackground from '../../utils/build/CreateBackground';
import Merge from '../../../../plugins/utils/object/Merge';

var CreateSeparator = function(tweaker?: any, config?: any, style?: any) {
    var scene = tweaker.scene;
    return CreateBackground(scene, Merge(config, style));
}

export default CreateSeparator;