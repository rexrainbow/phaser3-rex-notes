import FadePlugin from './fade/FadePlugin.js';

var CONFIG = {};  // reuse this config
var fadeOutDestroy = function (gameobject, duration) {
    CONFIG.duration = duration;
    return new FadePlugin(gameobject, CONFIG);
};
export default fadeOutDestroy;