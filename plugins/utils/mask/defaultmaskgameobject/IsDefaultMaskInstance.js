import RectangleMask from './RectangleMask.js';
import CircleMask from './CircleMask.js';

var IsDefaultMaskInstance = function (gameObject) {
    return (gameObject instanceof RectangleMask) || (gameObject instanceof CircleMask);
}

export default IsDefaultMaskInstance;