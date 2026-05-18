export default {
    setChromaticEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.chromaticEnable = enable;
        return this;
    },

    setChabIntensity(value?: any) {
        this.chabIntensity = value;
        return this;
    },
}