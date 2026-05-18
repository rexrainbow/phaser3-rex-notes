import Live2dCoreScriptFile from '../core/Live2dCoreScriptFile';
import Live2dFile from './Live2dFile';
import {
    IsIdle as IsCoreNotLoad,
    IsLoaded as IsCoreLoaded,
    SetState as SetCoreScriptState,
    LOADED as CoreScriptLoaded
} from '../core/Live2dCoreScriptState'
import Initialize from '../../utils/Initialize';

var Live2dFileCallback = function(key?: any, url?: any) {
    var loader = this;

    loader.cacheManager.addCustom('live2d');

    if (IsCoreNotLoad()) {
        if (window.Live2DCubismCore) {
            // Core script is loaded before
            Initialize();
            SetCoreScriptState(CoreScriptLoaded);

        } else {
            // Core script is not loaded
            // Load core script from default path
            loader.addFile(new Live2dCoreScriptFile(loader));

        }
    }

    if (IsCoreLoaded()) {
        // Core script is loaded
        // Can load model assets directly
        LoadFiles(loader, key, url);
    } else {
        // Core script is loaded under this event
        loader.once('filecomplete-live2dcore-live2dcore', function() {
            // Load model assets
            LoadFiles(loader, key, url);
        })
    }

    return this;
}

var LoadFiles = function(loader?: any, key?: any, url?: any) {
    if (Array.isArray(key)) {
        for (var i = 0; i < key.length; i++) {
            var multifile = new Live2dFile(loader, key[i]);
            loader.addFile(multifile.files);
        }
    } else {
        var multifile = new Live2dFile(loader, key, url);
        loader.addFile(multifile.files);
    }
}

export default Live2dFileCallback;