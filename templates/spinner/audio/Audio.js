import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Audio extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerAudio';
    }
}

Object.assign(
    Audio.prototype,
    UpdateShapeMethods,
)

export default Audio;