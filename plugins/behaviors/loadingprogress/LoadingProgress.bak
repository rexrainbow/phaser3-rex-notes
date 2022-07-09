import LoaderCallback from '../../loader/awaitloader/AwaitLoaderCallback.js';
import { WaitEvent } from '../../utils/promise/WaitEvent.js';
import NOOP from '../../utils/object/NOOP.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LoadingProgress = function (gameObject, config) {
    var TransitionInCallback = GetValue(config, 'transitIn', NOOP);
    var ProgressCallback = GetValue(config, 'progress', NOOP);
    var TransitionOutCallback = GetValue(config, 'transitionOut', NOOP);

    var scene = gameObject.scene;

    // Register AwaitLoader
    if (!scene.sys.load.rexAwait) {
        Phaser.Loader.FileTypesManager.register('rexAwait', LoaderCallback);
        scene.sys.load.rexAwait = LoaderCallback;
    }

    // Add await-task
    scene.load.rexAwait(async function (successCallback, failureCallback) {
        // Transition-in
        await TransitionInCallback(gameObject);

        var progress = GetProgress(scene);
        if (progress < 1) {
            // Present loading progress
            while (progress < 1) {
                await WaitEvent(scene.load, 'progress');

                progress = GetProgress(scene);
                ProgressCallback(gameObject, progress);
            }
        } else {
            // Progress is 1 already
            ProgressCallback(gameObject, progress);
        }

        // Transition-out
        await TransitionOutCallback(gameObject);

        gameObject.destroy();

        // Finish this loading task, goto create stage
        successCallback();
    });
}

var GetProgress = function (scene) {
    var loader = scene.load;
    var total = loader.totalToLoad - 1;
    var remainder = loader.list.size + loader.inflight.size - 1;
    var progress = 1 - (remainder / total);
    return progress;
}


export default LoadingProgress;