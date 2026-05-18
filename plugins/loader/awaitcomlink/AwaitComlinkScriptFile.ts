import AwaitFile from '../awaitloader/AwaitFile';
import LoadScriptPromise from '../../utils/loader/LoadScriptPromise';
import {
    IsIdle as IsComlinkNotLoad,
    SetState as SetComlinkScriptState,
    LOADING, LOADED
} from './AwaitComlinkScriptState';

class AwaitComlinkScriptFile extends AwaitFile {
    constructor(loader?: any, url?: any) {
        if (url === undefined) {
            url = 'https://unpkg.com/comlink/dist/umd/comlink.js';
        }

        var callback = function(successCallback?: any, failureCallback?: any) {
            if (window.Comlink) {
                SetComlinkScriptState(LOADED);
                successCallback();

            } else {
                LoadScriptPromise(url)
                    .then(function() {
                        SetComlinkScriptState(LOADED);
                        successCallback();
                    })

            }
        }

        if (IsComlinkNotLoad?: any) {
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