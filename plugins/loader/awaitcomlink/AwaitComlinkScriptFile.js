import AwaitFile from '../awaitloader/AwaitFile.js';
import LoadScriptPromise from '../../utils/loader/LoadScriptPromise.js';
import {
    IsIdle as IsComlinkNotLoad,
    SetState as SetComlinkScriptState,
    LOADING, LOADED
} from './AwaitComlinkScriptState.js';

class AwaitComlinkScriptFile extends AwaitFile {
    constructor(loader, url) {
        if (url === undefined) {
            url = 'https://unpkg.com/comlink/dist/umd/comlink.js';
        }

        var callback = function (successCallback, failureCallback) {
            if (window.Comlink) {
                SetComlinkScriptState(LOADED);
                successCallback();

            } else {
                LoadScriptPromise(url)
                    .then(function () {
                        SetComlinkScriptState(LOADED);
                        successCallback();
                    })

            }
        }

        if (IsComlinkNotLoad) {
            SetComlinkScriptState(LOADING);
        }

        super(loader, {
            type: 'comlink',
            key: 'comlink',
            config: { callback: callback }
        })
    }
}

export default AwaitComlinkScriptFile;