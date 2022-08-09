export default {
    setVHSEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableVHS = enable;
        return this;
    },

    setVhsStrength(value) {
        this.vhsStrength = value;
        return this;
    },
}