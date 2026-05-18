export default {
    setBloomEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.bloomEnable = enable;
        return this;
    },

    setBloomRadius(value?: any) {
        this.bloomRadius = value;
        return this;
    },

    setBloomIntensity(value?: any) {
        this.bloomIntensity = value;
        return this;
    },

    setBloomThreshold(value?: any) {
        this.bloomThreshold = value;
        return this;
    },

    setBloomTexelSize(width?: any, height?: any) {
        if (height === undefined) {
            height = width;
        }
        this.bloomTexelWidth = width;
        this.bloomTexelHeight = height;
        return this;
    }


}