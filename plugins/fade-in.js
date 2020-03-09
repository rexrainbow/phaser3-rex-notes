import Fade from './fade.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var FadeIn = function (gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;
    if (IsPlainObject(alpha)) {
        startAlpha = alpha.start;
        endAlpha = alpha.end;
    } else {
        endAlpha = alpha;
    }
    if (startAlpha === undefined) {
        startAlpha = 0
    }
    if (endAlpha === undefined) {
        endAlpha = gameObject.alpha;
    }
    defaultConfig.mode = 0;
    defaultConfig.start = startAlpha;
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