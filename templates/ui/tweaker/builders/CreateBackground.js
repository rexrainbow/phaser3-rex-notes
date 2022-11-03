import CreateRoundRectangle from '../gameobjects/utils/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, style, gameObject) {
    // TODO: Might create nine-slice as background
    return CreateRoundRectangle(scene, style);
}

export default CreateBackground;