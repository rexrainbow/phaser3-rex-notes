export default {
    setVHSEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.vhsEnable = enable;
        return this;
    },

    setVhsStrength(value?: any) {
        this.vhsStrength = value;
        return this;
    },
}