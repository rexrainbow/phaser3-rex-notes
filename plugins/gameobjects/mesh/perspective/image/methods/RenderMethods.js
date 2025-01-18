export default {
    willRenderFace() {
        if (this.hideBackFace && this.isBackFace) {
            return false;
        }

        return this.faces.length > 0;
    }
}