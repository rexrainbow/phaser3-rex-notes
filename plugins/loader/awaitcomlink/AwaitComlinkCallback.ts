import AwaitFile from '../awaitloader/AwaitFile';
import AwaitComlinkScriptFile from './AwaitComlinkScriptFile';
import {
    IsIdle as IsComlinkNotLoad,
    IsLoaded as IsComlinkLoaded,
    SetState as SetComlinkScriptState,
    LOADED
} from './AwaitComlinkScriptState';
import DefaultWorkerCode from './DefaultWorker';


import { Utils as PhaserUtils } from 'phaser';
const GetFastValue = PhaserUtils.Objects.GetFastValue;

const LoaderCallback = function(config?: any) {
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
        loader.once('filecomplete-comlink-comlink', function() {
            // Run Comlink directly
            this.addFile(CreateAwiatFile(loader, config));
        })

    }

    return this;
}

var CreateAwiatFile = function(loader?: any, config?: any) {
    var workerFilePath = GetFastValue(config, 'workerFilePath');
    var workerCode = GetFastValue(config, 'workerCode');
    var runMethod = GetFastValue(config, 'run');
    var data = GetFastValue(config, 'data');
    var terminateWorker = GetFastValue(config, 'terminateWorker', true);

    var onBegin = GetFastValue(config, 'onBegin');
    var onBeforeWorker = GetFastValue(config, 'onBeforeWorker');
    var onAfterWorker = GetFastValue(config, 'onAfterWorker');
    var onEnd = GetFastValue(config, 'onEnd');

    var callback = async function(successCallback?: any, failureCallback?: any) {
        var worker;
        if (workerFilePath?: any) {
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

        if (onBeforeWorker?: any) {
            onBeforeWorker = Comlink.proxy(onBeforeWorker);
        }
        if (onAfterWorker?: any) {
            onAfterWorker = Comlink.proxy(onAfterWorker);
        }

        if (onBegin?: any) {
            var newData = await onBegin(data, comlinkObj, worker);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (runMethod?: any) {
            data = await comlinkObj[runMethod](data, onBeforeWorker, onAfterWorker);
        } else {
            data = await comlinkObj(data, onBeforeWorker, onAfterWorker);
        }


        if (onEnd?: any) {
            newData = await onEnd(data, comlinkObj, worker);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (terminateWorker?: any) {
            worker.terminate();
        }

        if (data?: any) {
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