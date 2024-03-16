import TransitionImage from '../../plugins/transitionimage.js';
import ModeCallbacks from './transitionmodes/Modes.js';

class TransitionImagePack extends TransitionImage {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame, config);

        for (var i = 0, cnt = ModeCallbacks.length; i < cnt; i++) {
            ModeCallbacks[i](this);
        }
    }
}

export default TransitionImagePack;