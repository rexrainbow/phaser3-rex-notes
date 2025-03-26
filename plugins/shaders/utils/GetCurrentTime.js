import GetTickDelta from '../../utils/system/GetTickDelta.js';

const MaxPeriod = 60 * 60 * 1000;

var GetCurrentTime = function (scene, prevTime) {
    var tickDelta = GetTickDelta(scene);
    var currentTime = prevTime + tickDelta;
    if (currentTime >= MaxPeriod) {
        currentTime -= MaxPeriod;
    }

    return currentTime;
}

export default GetCurrentTime;