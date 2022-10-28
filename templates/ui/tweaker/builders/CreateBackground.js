import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

var CreateBackground = function (scene, config, styles, gameObject) {
    var backgroundStyle = styles.background || {};
    return CreateRoundRectangle(scene, config, backgroundStyle, gameObject);
}

export default CreateBackground;