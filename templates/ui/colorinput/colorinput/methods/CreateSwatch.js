import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';

var CreateSwatch = function (scene, config) {
    var swatch = new RoundRectangle(scene, config);
    scene.add.existing(swatch);
    return swatch;
}

export default CreateSwatch;