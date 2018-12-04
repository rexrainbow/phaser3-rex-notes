import Fade from './fade.js';

var FadeIn = function (gameObject, duration, endAlpha) {
    if (endAlpha === undefined) {
        endAlpha = gameObject.alpha;
    }
    defaultConfig.mode = 0;
    defaultConfig.start = 0;
    defaultConfig.end = endAlpha;
    defaultConfig.duration = duration;
    var fade = new Fade(gameObject, defaultConfig);
    fade.start();
    return fade;
};

var defaultConfig = {}; // reuse this config

export default FadeIn;