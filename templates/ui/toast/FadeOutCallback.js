import Fade from '../../../plugins/behaviors/fade/Fade.js';

export default function (gameObject, duration) {
    if (gameObject._fade === undefined) {
        gameObject._fade = new Fade(gameObject, {
            mode: 0
        });
    }
    var fade = gameObject._fade;
    fade
        .setAlphaRange(1, 0)
        .setDuration(duration)
        .restart();
};