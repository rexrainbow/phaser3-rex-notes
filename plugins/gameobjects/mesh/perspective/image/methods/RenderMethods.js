import SkipRender from '../../../mesh/image/render/SkipRender.js';

export default {
    skipRender() {
        if (this.hideBackFace && this.isBackFace) {
            return true;
        }

        return SkipRender.call(this);
    }
}