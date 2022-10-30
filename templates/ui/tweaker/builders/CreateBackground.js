import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, style, gameObject) {
    // TODO: Might create nine-slice as background
    return CreateRoundRectangle(scene, config, style, gameObject);
}

export default CreateBackground;