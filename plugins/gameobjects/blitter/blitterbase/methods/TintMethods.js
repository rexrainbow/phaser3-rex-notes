import { TintModes as PhaserTintModes } from 'phaser';
export default {
    setTint(tint) {
        this.tint = tint;
        return this;
    },

    setTintFill(mode) {
        if (mode === undefined || mode === true) {
            mode = PhaserTintModes.FILL;
        } else if (mode === false) {
            mode = PhaserTintModes.MULTIPLY;
        }
        this.tintFill = mode;
        return this;
    },

    clearTint() {
        this.tint = 0xffffff;
        this.tintFill = PhaserTintModes.MULTIPLY;
        return this;
    }
}
