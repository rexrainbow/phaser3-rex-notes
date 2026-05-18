import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Audio extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerAudio';
    }
}

Object.assign(
    Audio.prototype,
    UpdateShapeMethods,
)

export default Audio;