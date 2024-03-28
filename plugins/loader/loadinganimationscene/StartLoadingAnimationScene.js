import AwaitLoader from '../awaitloader/AwaitLoaderCallback.js';
import GetProgress from '../../utils/loader/GetProgress.js';

var StartLoadingAnimationScene = function (scene, animationSceneKey, data, onLoadingComplete) {
    if (typeof (data) === 'function') {
        onLoadingComplete = data;
        data = undefined;
    }

    var sceneManager = scene.scene;
    var loader = scene.load;

    sceneManager.launch(animationSceneKey, data);


    AwaitLoader.call(loader, function (successCallback, failureCallback) {
        var onProgress = function () {
            var progress = GetProgress(loader, 1);
            if (progress === 1) {
                if (!onLoadingComplete) {
                    onProgressComplete();
                } else {
                    var animationScene = sceneManager.get(animationSceneKey);
                    onLoadingComplete(onProgressComplete, animationScene);
                }
            }
        }

        var onProgressComplete = function () {
            sceneManager.stop(animationSceneKey);
            loader.off('progress', onProgress);
            successCallback();
        }

        loader.on('progress', onProgress);
    });

}

export default StartLoadingAnimationScene;