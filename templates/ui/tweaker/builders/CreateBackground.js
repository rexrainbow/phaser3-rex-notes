import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, styles, gameObject) {
    styles = styles.background || {};
    return CreateRoundRectangle(scene, config, styles, gameObject);
}

export default CreateBackground;