import Fade from './fade.js';

var FadeIn = function (gameObject, duration, endAlpha, fade) {
    if (endAlpha === undefined) {
        endAlpha = gameObject.alpha;
    }
    defaultConfig.mode = 0;
    defaultConfig.start = 0;
    defaultConfig.end = endAlpha;
    defaultConfig.duration = duration;

    if (fade === undefined) {
        fade = new Fade(gameObject, defaultConfig);
    } else {
        fade.resetFromJSON(defaultConfig);
    }
    fade.restart();

    return fade;
};

var defaultConfig = {}; // reuse this config

export default FadeIn;