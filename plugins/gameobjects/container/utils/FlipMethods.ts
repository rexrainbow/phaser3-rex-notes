export default {
    setFlipX(value?: any) {
        this.flipX = value;
        return this;
    },
    setFlipY(value?: any) {
        this.flipY = value;
        return this;
    },
    toggleFlipX() {
        this.flipX = !this.flipX;
        return this;
    },
    toggleFlipY() {
        this.flipY = !this.flipY;
        return this;
    },
    setFlip(x?: any, y?: any) {
        this.flipX = x;
        this.flipY = y;
        return this;
    },
    resetFlip() {
        this.flipX = false;
        this.flipY = false;
        return this;
    }
}