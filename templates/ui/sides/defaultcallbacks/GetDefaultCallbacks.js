import VisibleCallbacks from './VisibleCallbacks.js';
import FadeCallbacks from './FadeCallbacks.js';

const DefaultCallbacks = {
    visible: VisibleCallbacks,
    fade: FadeCallbacks
}

var GetDefaultCallbacks = function (config) {
    var callbackType, callbackParams;
    [callbackType, ...callbackParams] = (typeof (config) === 'string') ? [config] : config;
    return {
        show: DefaultCallbacks[callbackType].show.apply(null, callbackParams),
        hide: DefaultCallbacks[callbackType].hide.apply(null, callbackParams)
    }
}

export default GetDefaultCallbacks;