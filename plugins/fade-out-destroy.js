import FadePlugin from './fade/FadePlugin.js';
var fadeOutDestroy = function (gameobject, duration) {
    var fadeOut = new FadePlugin(gameobject, {
        duration: duration
    })
    return fadeOut;
};
export default fadeOutDestroy;