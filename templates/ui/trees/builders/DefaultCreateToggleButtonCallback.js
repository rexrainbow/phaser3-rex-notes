import Triangle from '../../triangle/Triangle.js';

var DefaultCreateToggleButtonCallback = function (scene, config, createCallbackData) {
    var gameObject = new Triangle(scene, config);
    scene.add.existing(gameObject);

    gameObject
        .on('expand.start', function (gameObject) {
            gameObject.setDirection('down');
        })
        .on('collapse.complete', function (gameObject) {
            gameObject.setDirection('right');
        });

    return gameObject;
}

export default DefaultCreateToggleButtonCallback;