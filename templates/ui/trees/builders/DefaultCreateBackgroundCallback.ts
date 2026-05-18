import CreateBackground from '../../utils/build/CreateBackground';

var DefaultCreateBackgroundCallback = function(scene?: any, config?: any, createCallbackData?: any) {
    var gameObject = CreateBackground(scene, config);

    return gameObject;
}

export default DefaultCreateBackgroundCallback;