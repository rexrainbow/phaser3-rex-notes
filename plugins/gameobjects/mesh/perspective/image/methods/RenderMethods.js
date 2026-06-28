export default {
    skipRender() {
        return this.hideBackFace && this.isBackFace;
    }
}