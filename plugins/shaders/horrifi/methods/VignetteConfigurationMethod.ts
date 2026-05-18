export default {
    setVignetteEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.vignetteEnable = enable;
        return this;
    },

    setVignetteStrength(value?: any) {
        this.vignetteStrength = value;
        return this;
    },

    setVignetteIntensity(value?: any) {
        this.vignetteIntensity = value;
        return this;
    }
}