import SkipRender from '../../../mesh/image/render/SkipRender';

export default {
    skipRender() {
        if (this.hideBackFace && this.isBackFace) {
            return true;
        }

        return SkipRender.call(this);
    }
}