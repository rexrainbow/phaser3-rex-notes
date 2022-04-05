import BobBase from '../../../blitterbase/bob/Base.js';

class Base {
    constructor(parent, blitter) {
        this
            .setParent(parent)
            .setBlitter(blitter);

        this.bobs = undefined;  // bob, or dictionary of bobs
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    setBlitter(blitter) {
        this.blitter = blitter;
        return this;
    }

    onFree() {
        this
            .setParent()
            .setBlitter();

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

    destroy() {
        this.parent.remove(this);
    }

}

export default Base;