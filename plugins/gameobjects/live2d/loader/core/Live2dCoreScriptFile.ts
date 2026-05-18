import AwaitFile from '../../../../loader/awaitloader/AwaitFile';
import LoadScriptPromise from '../../../../utils/loader/LoadScriptPromise';
import InitializeCubism from '../../utils/Initialize';
import {
    IsIdle as IsCoreNotLoad,
    SetState as SetCoreScriptState,
    LOADING, LOADED
} from './Live2dCoreScriptState';

class Live2dCoreScriptFile extends AwaitFile {
    constructor(loader?: any, url?: any) {
        if (url === undefined) {
            url = 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js';
        }

        var callback = function(successCallback?: any, failureCallback?: any) {
            LoadScriptPromise(url)
                .then(function() {
                    InitializeCubism();

                    SetCoreScriptState(LOADED);

                    successCallback();
                })
        }

        if (IsCoreNotLoad?: any) {
            SetCoreScriptState(LOADING);
        }

        super(loader, {
            type: 'live2dcore',
            key: 'live2dcore',
            config: { callback: callback }
        })
    }
}

export default Live2dCoreScriptFile;