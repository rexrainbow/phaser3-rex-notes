export default {
    setNoiseEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.noiseEnable = enable;
        return this;
    },

    setNoiseStrength(value?: any) {
        this.noiseStrength = value;
        return this;
    },

    setNoiseSeed(value?: any) {
        this.noiseSeed = value;
        return this;
    }
}