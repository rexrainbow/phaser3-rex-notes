import AwaitFile from '../awaitloader/AwaitFile.js';
import AwaitComlinkScriptFile from './AwaitComlinkScriptFile.js';
import {
    IsIdle as IsComlinkNotLoad,
    IsLoaded as IsComlinkLoaded,
    SetState as SetComlinkScriptState,
    LOADED
} from './AwaitComlinkScriptState';


const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;

const LoaderCallback = function (workerFilePath, workerConfig, onAfterWorker, onBeforeWorker) {
    var loader = this;

    if (IsComlinkNotLoad()) {
        if (window.Comlink) {
            SetComlinkScriptState(LOADED);

        } else {
            // Comlink script is not loaded
            var comlinkFilePath = GetFastValue(workerFilePath, 'comlink');
            loader.addFile(new AwaitComlinkScriptFile(loader, comlinkFilePath));

        }

    }

    if (IsComlinkLoaded()) {
        // Comlink script is loaded
        // Can run Comlink directly
        this.addFile(CreateAwiatFile(this, workerFilePath, workerConfig, onAfterWorker, onBeforeWorker));

    } else {
        // Comlink script is loaded under this event
        loader.once('filecomplete-comlink-comlink', function () {
            // Run Comlink directly
            this.addFile(CreateAwiatFile(loader, workerFilePath, workerConfig, onAfterWorker, onBeforeWorker));
        })

    }

    return this;
}

var CreateAwiatFile = function (loader, workerFilePath, payload, onAfterWorker, onBeforeWorker) {
    var runWorkerCallbackName;
    var onAfterWorkerScope, onBeforeWorkerScope;
    if (IsPlainObject(workerFilePath)) {
        var config = workerFilePath;
        workerFilePath = GetFastValue(config, 'worker');
        runWorkerCallbackName = GetFastValue(config, 'run', 'run');
        payload = GetFastValue(config, 'payload');
        onAfterWorker = GetFastValue(config, 'onAfterWorker');
        onBeforeWorker = GetFastValue(config, 'onBeforeWorker');
        onAfterWorkerScope = GetFastValue(config, 'onAfterWorkerScope');
        onBeforeWorkerScope = GetFastValue(config, 'onBeforeWorkerScope');
    }

    var callback = async function (successCallback, failureCallback) {
        var newPayload;

        if (onBeforeWorker) {
            var newPayload = await onBeforeWorker.call(onBeforeWorkerScope, payload);
            if (newPayload !== undefined) {
                payload = newPayload;
            }
        }

        var worker = new Worker(workerFilePath);
        var obj = Comlink.wrap(worker);
        payload = await obj[runWorkerCallbackName](payload);

        if (onAfterWorker) {
            newPayload = await onAfterWorker.call(onAfterWorkerScope, payload);
            if (newPayload !== undefined) {
                payload = newPayload;
            }
        }

        if (payload) {
            successCallback();
        } else {
            failureCallback();
        }
    }

    return new AwaitFile(loader, {
        type: 'scriptTag',
        config: { callback: callback }
    });
}

export default LoaderCallback;