export default {
    setTintMode(mode) {
        this.tintMode = mode;
        return this;
    },

    setTint(color) {
        this.tint = color;
        return this;
    },

    clearTint() {
        this.setTint(0xffffff);
        this.setTintMode(Phaser.TintModes.MULTIPLY);
        return this;
    }
}
