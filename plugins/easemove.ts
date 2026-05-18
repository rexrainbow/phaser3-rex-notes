import EaseMove from './behaviors/easemove/EaseMove';
import EaseMoveTo from './behaviors/easemove/EaseMoveTo';
import EaseMoveFrom from './behaviors/easemove/EaseMoveFrom';
import EaseMoveMethods from './behaviors/easemove/EaseMoveMethods';

var EaseMoveToDestroy = function(gameObject?: any, duration?: any, endX?: any, endY?: any, ease?: any, easeMove?: any) {
    return EaseMoveTo(gameObject, duration, endX, endY, ease, true, easeMove);
}

var EaseMoveFromDestroy = function(gameObject?: any, duration?: any, startX?: any, startY?: any, ease?: any, easeMove?: any) {
    return EaseMoveFrom(gameObject, duration, startX, startY, ease, true, easeMove);
}

export {
    EaseMove,
    EaseMoveTo, EaseMoveToDestroy,
    EaseMoveFrom, EaseMoveFromDestroy,
    EaseMoveMethods
};