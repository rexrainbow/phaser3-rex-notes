export default {
    setBoxSize(size?: any) {
        this.dirty = this.dirty ||
            (this.boxSize !== size);

        this.boxSize = size;
        return this;
    },

    setCheckerSize(size?: any) {
        this.dirty = this.dirty ||
            (this.checkerSize !== size);

        this.checkerSize = size;
        return this;
    }
}