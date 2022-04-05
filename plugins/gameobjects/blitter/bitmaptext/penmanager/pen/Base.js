import BobBase from '../../../blitterbase/bob/Base.js';

class Base {
    constructor(blitter) {
        this.blitter = blitter;
        this.bobs = undefined;  // bob, or dictionary of bobs
    }

    destroy() {
        if (this.bobs instanceof BobBase) {
            this.bobs.destroy();
            this.bobs = undefined;
        } else {
            var bobs = this.bobs;
            for (var key in bobs) {
                bobs[key].destroy();
                delete bobs[key];
            }
        }
    }

}

export default Base;