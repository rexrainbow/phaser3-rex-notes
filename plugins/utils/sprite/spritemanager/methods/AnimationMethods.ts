export default {
    playAnimation(name?: any, key?: any) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).playAnimation(key);
        return this;
    },

    stopAnimation(name?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).stopAnimation();
        return this;
    },

    chainAnimation(name?: any, keys?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).chainAnimation(keys);
        return this;
    },

    pauseAnimation(name?: any) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).pauseAnimation();
        return this;
    },
}