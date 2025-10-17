import { EndPointTypes } from '../Const.js';

export default {
    setHeadShape(endPointType) {
        if (typeof (endPointType) === 'string') {
            endPointType = EndPointTypes[endPointType.toLowerCase()];
        }

        this.headShape = endPointType;
        return this;
    },

    setHeadSize(size) {
        this.headSize = size;
        return this;
    },

    setHeadFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.headColor = color;
        this.headAlpha = alpha;
        return this;
    },

    setHeadStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.headStrokeWidth = lineWidth;
        this.headStrokeColor = color;
        this.headStrokeAlpha = alpha;
        return this;
    },

    setTailShape(endPointType) {
        if (typeof (endPointType) === 'string') {
            endPointType = EndPointTypes[endPointType.toLowerCase()];
        }

        this.tailShape = endPointType;
        return this;
    },

    setTailSize(size) {
        this.tailSize = size;
        return this;
    },

    setTailFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.tailColor = color;
        this.tailAlpha = alpha;
        return this;
    },

    setTailStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.tailStrokeWidth = lineWidth;
        this.tailStrokeColor = color;
        this.tailStrokeAlpha = alpha;
        return this;
    },
}