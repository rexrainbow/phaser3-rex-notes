import { EndPointTypes } from '../Const';

export default {
    setHeadShape(endPointType?: any) {
        if (typeof (endPointType) === 'string') {
            endPointType = EndPointTypes[endPointType.toLowerCase()];
        }

        this.headShape = endPointType;
        return this;
    },

    setHeadSize(size?: any) {
        this.headSize = size;
        return this;
    },

    setHeadFillStyle(color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.headColor = color;
        this.headAlpha = alpha;
        return this;
    },

    setHeadStrokeStyle(lineWidth?: any, color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.headStrokeWidth = lineWidth;
        this.headStrokeColor = color;
        this.headStrokeAlpha = alpha;
        return this;
    },

    setTailShape(endPointType?: any) {
        if (typeof (endPointType) === 'string') {
            endPointType = EndPointTypes[endPointType.toLowerCase()];
        }

        this.tailShape = endPointType;
        return this;
    },

    setTailSize(size?: any) {
        this.tailSize = size;
        return this;
    },

    setTailFillStyle(color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.tailColor = color;
        this.tailAlpha = alpha;
        return this;
    },

    setTailStrokeStyle(lineWidth?: any, color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.tailStrokeWidth = lineWidth;
        this.tailStrokeColor = color;
        this.tailStrokeAlpha = alpha;
        return this;
    },
}