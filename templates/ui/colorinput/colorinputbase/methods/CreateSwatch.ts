import RoundRectangle from '../../../roundrectangle/RoundRectangle';
import IsGameObject from '../../../../../plugins/utils/system/IsGameObject';

var CreateSwatch = function(scene?: any, config?: any) {
    if (config === false) {
        return null;
    } else if (IsGameObject(config)) {
        return config;
    }

    var swatch = new RoundRectangle(scene, config);
    scene.add.existing(swatch);
    return swatch;
}

export default CreateSwatch;