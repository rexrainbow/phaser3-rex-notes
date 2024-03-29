import IsSceneObject from '../../utils/system/IsSceneObject.js';
import LastLoadTask from '../../utils/loader/LastLoadTask.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var StartLoadingAnimationScene = function (
    mainScene,
    animationSceneKey, data,
    onLoadingComplete,
    onLoadingProgress
) {

    if (IsPlainObject(mainScene)) {
        var config = mainScene;
        mainScene = config.mainScene;
        animationSceneKey = config.animationScene;
        onLoadingComplete = config.onLoadingComplete;
        onLoadingProgress = config.onLoadingProgress;
    } else {
        if (typeof (data) === 'function') {
            onLoadingProgress = onLoadingComplete;
            onLoadingComplete = data;
            data = undefined;
        }
    }

    if (IsSceneObject(animationSceneKey)) {
        var animationScene = animationSceneKey;
        animationSceneKey = animationScene.sys.settings.key;
    }

    // Don't launch animation scene if it has been started
    if (mainScene.scene.getStatus(animationSceneKey) < Phaser.Scenes.START) { // Phaser.Scenes.START = 2
        mainScene.scene.launch(animationSceneKey, data);
    }

    var animationScene = mainScene.scene.get(animationSceneKey);
    var lastLoadTask = (new LastLoadTask(mainScene))
        .on('progress', function (progress) {
            if (onLoadingProgress) {
                onLoadingProgress(progress, animationScene)
            }
        })
        .on('complete', function (onProgressComplete) {
            if (!onLoadingComplete) {
                onProgressComplete();
            } else {
                onLoadingComplete(onProgressComplete, animationScene);
            }
        })
        .on('shutdown', function () {
            animationScene.scene.stop();
        })

}

export default StartLoadingAnimationScene;