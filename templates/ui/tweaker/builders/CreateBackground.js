import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, styles, gameObject) {
    return CreateRoundRectangle(scene, config, styles.background, gameObject);
}

export default CreateBackground;