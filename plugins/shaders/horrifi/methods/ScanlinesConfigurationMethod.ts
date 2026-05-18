export default {
    setScanlinesEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.scanlinesEnable = enable;
        return this;
    },

    setScanStrength(value?: any) {
        this.scanStrength = value;
        return this;
    },
}