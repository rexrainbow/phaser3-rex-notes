import Fade from './fade.js';

var FadeOutDestroy = function (gameObject, duration) {
    defaultConfig.mode = 1;
    defaultConfig.end = 0;
    defaultConfig.duration = duration;
    var fade = new Fade(gameObject, defaultConfig);
    fade.start();
    return fade;
};

var defaultConfig = {}; // reuse this config

export default FadeOutDestroy;