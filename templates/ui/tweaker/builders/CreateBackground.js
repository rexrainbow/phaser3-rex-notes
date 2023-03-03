import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, style) {
    // TODO: Might create nine-slice as background
    return CreateRoundRectangle(scene, style);
}

export default CreateBackground;