import LoaderCallback from '../../plugins/awaitloader.js';
import GetProgress from '../../plugins/utils/loader/GetProgress.js'
import { WaitEvent } from '../../plugins/eventpromise.js';
import NOOP from '../../plugins/utils/object/NOOP.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var LoadingProgress = function (gameObject, config) {
    var TransitionInCallback = GetValue(config, 'transitIn', NOOP);
    var ProgressCallback = GetValue(config, 'progress', NOOP);
    var TransitionOutCallback = GetValue(config, 'transitionOut', NOOP);

    var scene = gameObject.scene;

    // Register AwaitLoader
    Phaser.Loader.FileTypesManager.register('rexAwait', LoaderCallback);
    scene.sys.load['rexAwait'] = LoaderCallback;

    // Add await-task
    scene.load.rexAwait(async function (successCallback, failureCallback) {
        // Transition-in        
        await TransitionInCallback(gameObject);

        var progress = GetProgress(scene, 1);
        if (progress < 1) {
            // Present loading progress
            while (progress < 1) {
                await WaitEvent(scene.load, 'progress');

                progress = GetProgress(scene, 1);
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

export default LoadingProgress;