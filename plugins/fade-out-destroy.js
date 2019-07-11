import Fade from './fade.js';

var FadeOutDestroy = function (gameObject, duration, destroyMode, fade) {
    if (destroyMode instanceof Fade) {
        fade = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = true;
    }

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    defaultConfig.end = 0;
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

export default FadeOutDestroy;