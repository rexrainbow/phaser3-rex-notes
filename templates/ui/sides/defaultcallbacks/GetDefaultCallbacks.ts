import VisibleCallbacks from './VisibleCallbacks';
import FadeCallbacks from './FadeCallbacks';
import MoveCallbacks from './MoveCallbacks';
import MovePanelCallbacks from './MovePanelCallbacks';
import NOOP from '../../../../plugins/utils/object/NOOP';

const DefaultCallbacks = {
    visible: VisibleCallbacks,
    fade: FadeCallbacks,
    move: MoveCallbacks,
    'move-panel': MovePanelCallbacks
}

var GetDefaultCallbacks = function(config?: any) {
    var callbackType, callbackParams;
    [callbackType, ...callbackParams] = (typeof (config) === 'string') ? [config] : config;

    var showCallback, hideCallback;
    if (DefaultCallbacks.hasOwnProperty(callbackType)) {
        showCallback = DefaultCallbacks[callbackType].show.apply(null, callbackParams);
        hideCallback = DefaultCallbacks[callbackType].hide.apply(null, callbackParams);
    } else {
        showCallback = NOOP;
        hideCallback = NOOP;
    }
    return {
        show: showCallback,
        hide: hideCallback
    }
}

export default GetDefaultCallbacks;