export default {
    setBloomEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enableBloom = enable;
        return this;
    },

    setBloomRadius(value) {
        this.bloomRadius = value;
        return this;
    },
    
    setBloomIntensity(value) {
        this.bloomIntensity = value;
        return this;
    },
      
    setBloomThreshold(value) {
        this.bloomThreshold = value;
        return this;
    },

    
}