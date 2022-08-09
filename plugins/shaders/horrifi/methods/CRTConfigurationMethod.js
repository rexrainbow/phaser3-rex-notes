export default {
    setCRTEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableCRT = enable;
        return this;
    },

    setCrtSize(width, height) {
        this.crtWidth = width;
        this.crtHeight = height;
        return this;
    },
}