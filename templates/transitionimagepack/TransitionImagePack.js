import Base from '../../plugins/transitionimage.js';
import ModeCallbacks from './transitionmodes/Modes.js';

class TransitionImagePack extends Base {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame, config);

        for (var i = 0, cnt = ModeCallbacks.length; i < cnt; i++) {
            ModeCallbacks[i](this);
        }
    }
}

export default TransitionImagePack;