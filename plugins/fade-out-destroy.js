import FadePlugin from './fade/FadePlugin.js';

var fadeOutDestroy = function (gameobject, duration) {
    CONFIG.mode = 1;
    CONFIG.alpha.start = gameobject.alpha;
    CONFIG.alpha.end = 0;
    CONFIG.duration = duration;
    var fade = new FadePlugin(gameobject, CONFIG);
    fade.start();
    return fade;
};

var CONFIG = {
    alpha: {}
}; // reuse this config

export default fadeOutDestroy;