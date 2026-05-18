import CreateBackgroundBase from '../../../utils/build/CreateBackground';
import Merge from '../../../../../plugins/utils/object/Merge';

var CreateBackground = function(scene?: any, config?: any, style?: any) {
    return CreateBackgroundBase(scene, Merge(config, style));
}

export default CreateBackground;