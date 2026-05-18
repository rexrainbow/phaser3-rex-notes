import TransitionImage from '../../plugins/transitionimage';
import ModeCallbacks from './transitionmodes/Modes';

class TransitionImagePack extends TransitionImage {
    constructor(scene?: any, x?: any, y?: any, texture?: any, frame?: any, config?: any) {
        super(scene, x, y, texture, frame, config);

        for (var i = 0, cnt = ModeCallbacks.length; i < cnt; i++) {
            ModeCallbacks[i](this);
        }
    }
}

export default TransitionImagePack;