import GetTickDelta from '../../utils/system/GetTickDelta';

const MaxPeriod = 60 * 60 * 1000;

var GetCurrentTime = function(scene?: any, prevTime?: any) {
    var tickDelta = GetTickDelta(scene);
    var currentTime = prevTime + tickDelta;
    if (currentTime >= MaxPeriod) {
        currentTime -= MaxPeriod;
    }

    return currentTime;
}

export default GetCurrentTime;