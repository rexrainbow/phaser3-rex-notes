import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';
import IsGameObject from '../../../../../plugins/utils/system/IsGameObject.js';

var CreateSwatch = function (scene, config) {
    if (IsGameObject(config)) {
        return config;
    }

    var swatch = new RoundRectangle(scene, config);
    scene.add.existing(swatch);
    swatch.expandSquare = true;
    return swatch;
}

export default CreateSwatch;