import AwaitLoader from '../awaitloader/AwaitLoaderCallback.js';

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
            var total = loader.totalToLoad - 1;
            var remainder = loader.list.size + loader.inflight.size - 1;
            var progress = 1 - (remainder / total);
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