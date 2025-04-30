import AwaitFile from '../awaitloader/AwaitFile.js';
import AwaitComlinkScriptFile from './AwaitComlinkScriptFile.js';
import {
    IsIdle as IsComlinkNotLoad,
    IsLoaded as IsComlinkLoaded,
    SetState as SetComlinkScriptState,
    LOADED
} from './AwaitComlinkScriptState';
import DefaultWorkerCode from './DefaultWorker.js';


const GetFastValue = Phaser.Utils.Objects.GetFastValue;

const LoaderCallback = function (config) {
    var loader = this;

    if (IsComlinkNotLoad()) {
        if (window.Comlink) {
            SetComlinkScriptState(LOADED);

        } else {
            // Comlink script is not loaded
            var comlinkFilePath = GetFastValue(config, 'comlink');
            loader.addFile(new AwaitComlinkScriptFile(loader, comlinkFilePath));

        }

    }

    if (IsComlinkLoaded()) {
        // Comlink script is loaded
        // Can run Comlink directly
        this.addFile(CreateAwiatFile(this, config));

    } else {
        // Comlink script is loaded under this event
        loader.once('filecomplete-comlink-comlink', function () {
            // Run Comlink directly
            this.addFile(CreateAwiatFile(loader, config));
        })

    }

    return this;
}

var CreateAwiatFile = function (loader, config) {
    var workerFilePath = GetFastValue(config, 'workerFilePath');
    var workerCode = GetFastValue(config, 'workerCode');
    var runMethod = GetFastValue(config, 'run');
    var data = GetFastValue(config, 'data');
    var terminateWorker = GetFastValue(config, 'terminateWorker', true);

    var onBegin = GetFastValue(config, 'onBegin');
    var onBeforeWorker = GetFastValue(config, 'onBeforeWorker');
    var onAfterWorker = GetFastValue(config, 'onAfterWorker');
    var onEnd = GetFastValue(config, 'onEnd');

    var callback = async function (successCallback, failureCallback) {
        var worker;
        if (workerFilePath) {
            worker = new Worker(workerFilePath);
        } else {
            if (!workerCode) {
                workerCode = DefaultWorkerCode;
            }
            var blob = new Blob([workerCode], { type: 'application/javascript' });
            worker = new Worker(URL.createObjectURL(blob));
        }

        var newData;

        var comlinkObj = Comlink.wrap(worker);

        if (onBeforeWorker) {
            onBeforeWorker = Comlink.proxy(onBeforeWorker);
        }
        if (onAfterWorker) {
            onAfterWorker = Comlink.proxy(onAfterWorker);
        }

        if (onBegin) {
            var newData = await onBegin(data, comlinkObj, worker);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (runMethod) {
            data = await comlinkObj[runMethod](data, onBeforeWorker, onAfterWorker);
        } else {
            data = await comlinkObj(data, onBeforeWorker, onAfterWorker);
        }


        if (onEnd) {
            newData = await onEnd(data, comlinkObj, worker);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (terminateWorker) {
            worker.terminate();
        }

        if (data) {
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