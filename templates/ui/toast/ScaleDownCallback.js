import Scale from '../../../plugins/behaviors/scale/Scale.js';

export default function (gameObject, duration) {
    if (gameObject._scale === undefined) {
        gameObject._scale = new Scale(gameObject, {
            mode: 0
        });
    }
    var scale = gameObject._scale;
    scale
        .setScaleRange(1, 0)
        .setDuration(duration)
        .setEase('Linear')
        .restart();
};