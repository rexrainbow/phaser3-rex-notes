import LastLoadTask from '../../utils/loader/LastLoadTask.js';
import NOOP from '../../utils/object/NOOP.js';

var StartLoadingAnimationScene = function (
    scene,
    animationSceneKey, data,
    onLoadingComplete,
    onLoadingProgress
) {

    if (typeof (data) === 'function') {
        onLoadingProgress = onLoadingComplete;
        onLoadingComplete = data;
        data = undefined;
    }

    if (!onLoadingProgress) {
        onLoadingProgress = NOOP;
    }

    var sceneManager = scene.scene;
    sceneManager.launch(animationSceneKey, data);
    var animationScene = sceneManager.get(animationSceneKey);

    var lastLoadTask = (new LastLoadTask(scene))
        .on('progress', function (progress) {
            onLoadingProgress(progress, animationScene)
        })
        .on('complete', function (onProgressComplete) {
            if (!onLoadingComplete) {
                onProgressComplete();
            } else {
                onLoadingComplete(onProgressComplete, animationScene);
            }
        })
        .on('shutdown', function () {
            sceneManager.stop(animationSceneKey);
        })

}

export default StartLoadingAnimationScene;