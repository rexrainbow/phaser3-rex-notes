export default {
    setNoiseEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.noiseEnable = enable;
        return this;
    },

    setNoiseStrength(value) {
        this.noiseStrength = value;
        return this;
    },

    setSeed(value) {
        this.seed = value;
        return this;
    }
}