import { TintModes as PhaserTintModes } from 'phaser';
export default {
    setTintMode(mode?: any) {
        this.tintMode = mode;
        return this;
    },

    setTint(color?: any) {
        this.tint = color;
        return this;
    },

    clearTint() {
        this.setTint(0xffffff);
        this.setTintMode(PhaserTintModes.MULTIPLY);
        return this;
    }
}