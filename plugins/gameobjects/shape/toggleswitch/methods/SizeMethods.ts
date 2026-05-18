export default {
    setTrackSize(width?: any, height?: any) {
        this.dirty = this.dirty ||
            (this.trackWidth !== width) ||
            (this.trackHeight !== height);

        this.trackWidth = width;
        this.trackHeight = height;
        return this;
    },

    setTrackRadius(radius?: any) {
        this.dirty = this.dirty ||
            (this.trackRadius !== radius);

        this.trackRadius = radius;
        return this;
    },

    setThumbSize(width?: any, height?: any) {
        if (height === undefined) {
            height = width;
        }
        this.dirty = this.dirty ||
            (this.thumbWidth !== width) ||
            (this.thumbHeight !== height);

        this.thumbWidth = width;
        this.thumbHeight = height;
        return this;
    },

    setThumbRadius(radius?: any) {       
        this.dirty = this.dirty ||
            (this.thumbRadius !== radius);

        this.thumbRadius = radius;
        return this;
    },

}