export default {
    setThumbPosition(left?: any, right?: any) {
        if (right === undefined) {
            right = 1 - left;
        }

        this.thumbLeftX = left;
        this.thumbRightX = right;
        return this;
    },

    setRTL(rtl?: any) {
        if (rtl === undefined) {
            rtl = true;
        }
        this.rtl = rtl;
        return this;
    }
}