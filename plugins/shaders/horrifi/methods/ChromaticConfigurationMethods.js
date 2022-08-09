export default {
    setChromaticEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableChromatic = enable;
        return this;
    },

    setChabIntensity(value) {
        this.chabIntensity = value;
        return this;
    },
}