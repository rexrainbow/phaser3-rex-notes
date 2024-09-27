import SimpleLabel from '../../simplelabel/SimpleLabel.js';

var DefaultCreateNodeBodyCallback = function (scene, config, createCallbackData) {
    var gameObject = new SimpleLabel(scene, config);
    scene.add.existing(gameObject);

    gameObject.resetDisplayContent('');

    return gameObject;
}

export default DefaultCreateNodeBodyCallback;