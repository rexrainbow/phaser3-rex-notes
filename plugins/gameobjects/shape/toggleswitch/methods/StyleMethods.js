export default {
    setTrackFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.trackFillColor !== color) ||
            (this.trackFillAlpha !== alpha);

        this.trackFillColor = color;
        this.trackFillAlpha = alpha;
        return this;
    },

    setUncheckedTrackFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.uncheckedTrackFillColor !== color) ||
            (this.uncheckedTrackFillAlpha !== alpha);

        this.uncheckedTrackFillColor = color;
        this.uncheckedTrackFillAlpha = alpha;
        return this;
    },

    setTrackStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.trackLineWidth !== lineWidth) ||
            (this.trackStrokeColor !== color) ||
            (this.trackStrokeAlpha !== alpha);

        this.trackLineWidth = lineWidth;
        this.trackStrokeColor = color;
        this.trackStrokeAlpha = alpha;
        return this;
    },

    setUncheckedTrackStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.uncheckedTrackLineWidth !== lineWidth) ||
            (this.uncheckedTrackStrokeColor !== color) ||
            (this.uncheckedTrackStrokeAlpha !== alpha);

        this.uncheckedTrackLineWidth = lineWidth;
        this.uncheckedTrackStrokeColor = color;
        this.uncheckedTrackStrokeAlpha = alpha;
        return this;
    },

    setThumbStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.thumbColor !== color) ||
            (this.checkAlpha !== alpha);

        this.thumbColor = color;
        this.thumbAlpha = alpha;
        return this;
    },

    setThumbStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.dirty = this.dirty ||
            (this.thumbLineWidth !== lineWidth) ||
            (this.thumbStrokeColor !== color) ||
            (this.thumbStrokeAlpha !== alpha);

        this.thumbLineWidth = lineWidth;
        this.thumbStrokeColor = color;
        this.thumbStrokeAlpha = alpha;
        return this;
    },

}