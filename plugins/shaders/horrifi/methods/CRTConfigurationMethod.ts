export default {
    setCRTEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.crtEnable = enable;
        return this;
    },

    setCrtSize(width?: any, height?: any) {
        if (height === undefined) {
            height = width;
        }
        this.crtWidth = width;
        this.crtHeight = height;
        return this;
    },
}