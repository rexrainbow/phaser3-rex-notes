import Triangle from '../../triangle/Triangle';

var DefaultCreateToggleButtonCallback = function(scene?: any, config?: any, createCallbackData?: any) {
    var gameObject = new Triangle(scene, config);
    scene.add.existing(gameObject);

    gameObject
        .on('expand.start', function(gameObject?: any) {
            gameObject.setDirection('down');
        })
        .on('collapse.complete', function(gameObject?: any) {
            gameObject.setDirection('right');
        });

    return gameObject;
}

export default DefaultCreateToggleButtonCallback;