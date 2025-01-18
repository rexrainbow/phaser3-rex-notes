export default {
    setTintFill(value) {
        if (value === undefined) {
            value = false;
        }
        this.tintFill = value;
        return this;
    },

    setTint(color) {
        this.tint = color;
        return this;
    },

    clearTint() {
        this.setTint(0xffffff);
        return this;
    }
}