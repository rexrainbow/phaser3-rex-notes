import Blitter from '../blitterbase/BlitterBase.js'
import NinePatchBase from '../../../utils/ninepatch/NinePatch.js';
import Methods from './Methods.js';
import SetTexture from '../blitterbase/methods/SetTexture.js';

class NinePatch extends NinePatchBase(Blitter, 'rexNinePatch2') {
    setTexture(key, baseFrameName, columns, rows) {
        SetTexture.call(this, key, '__BASE');

        // Not initialized yet
        if (!this.columns) {
            return this;
        }

        super.setTexture(key, baseFrameName, columns, rows);
        return this;
    }
}

Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;