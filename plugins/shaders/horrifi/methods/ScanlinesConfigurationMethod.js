export default {
    setScanlinesEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableScanlines = enable;
        return this;
    },

    setScanStrength(value) {
        this.scanStrength = value;
        return this;
    },
}