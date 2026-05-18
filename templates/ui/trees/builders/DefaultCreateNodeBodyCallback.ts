import SimpleLabel from '../../simplelabel/SimpleLabel';

var DefaultCreateNodeBodyCallback = function(scene?: any, config?: any, createCallbackData?: any) {
    var gameObject = new SimpleLabel(scene, config);
    scene.add.existing(gameObject);

    gameObject.resetDisplayContent('');

    return gameObject;
}

export default DefaultCreateNodeBodyCallback;