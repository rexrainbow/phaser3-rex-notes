import CreateBackground from '../../utils/build/CreateBackground.js';

var DefaultCreateBackgroundCallback = function (scene, config, createCallbackData) {
    var gameObject = CreateBackground(scene, config);

    return gameObject;
}

export default DefaultCreateBackgroundCallback;