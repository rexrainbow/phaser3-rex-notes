import Blitter from '../blitterbase/BlitterBase'
import NinePatchBase from '../../../utils/ninepatch/NinePatch';
import Methods from './Methods';

class NinePatch extends NinePatchBase(Blitter, 'rexNinePatch2') {
    setTexture: any;

    setBaseTexture(key?: any, baseFrameName?: any, columns?: any, rows?: any) {
        this.setTexture(key, baseFrameName);
        super.setBaseTexture(key, baseFrameName, columns, rows);
        return this;
    }
}

Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;