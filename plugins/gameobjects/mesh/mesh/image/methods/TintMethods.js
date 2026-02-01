export default {
    setTintFill(mode) {
        if (mode === undefined || mode === true) {
            mode = Phaser.TintModes.FILL;
        } else if (mode === false) {
            mode = Phaser.TintModes.MULTIPLY;
        }
        this.tintFill = mode;
        return this;
    },

    setTint(color) {
        this.tint = color;
        return this;
    },

    clearTint() {
        this.tint = 0xffffff;
        this.tintFill = Phaser.TintModes.MULTIPLY;
        return this;
    }
}
