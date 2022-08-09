export default {
    setNoiseEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableNoise = enable;
        return this;
    },

    setNoiseStrength(value) {
        this.noiseStrength = value;
        return this;
    },
}