import LastLoadTask from '../../utils/loader/LastLoadTask.js';
import NOOP from '../../utils/object/NOOP.js';

var StartLoadingAnimationScene = function (
    mainScene,
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

    // Don't launch animation scene if it has been started
    if (mainScene.scene.getStatus(animationSceneKey) < Phaser.Scenes.START) { // Phaser.Scenes.START = 2
        mainScene.scene.launch(animationSceneKey, data);
    }

    var animationScene = mainScene.scene.get(animationSceneKey);
    var lastLoadTask = (new LastLoadTask(mainScene))
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
            animationScene.stop();
        })

}

export default StartLoadingAnimationScene;