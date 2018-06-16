import Fade from './fade.js';

var fadeOutDestroy = function (gameObject, duration) {
    CONFIG.mode = 1;
    CONFIG.alpha.start = gameObject.alpha;
    CONFIG.alpha.end = 0;
    CONFIG.duration = duration;
    var fade = new Fade(gameObject, CONFIG);
    fade.start();
    return fade;
};

var CONFIG = {
    alpha: {}
}; // reuse this config

export default fadeOutDestroy;