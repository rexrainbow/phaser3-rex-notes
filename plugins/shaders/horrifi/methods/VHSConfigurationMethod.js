export default {
    setVHSEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.VHSEnable = enable;
        return this;
    },

    setVhsStrength(value) {
        this.vhsStrength = value;
        return this;
    },
}