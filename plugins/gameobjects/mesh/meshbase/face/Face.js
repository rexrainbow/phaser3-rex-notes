import GetInCenter from './GetInCenter.js';

class Face {
    constructor(u0, v0, u1, v1, u2, v2, baseU, baseV) {
        if (baseU !== undefined) {
            u0 /= baseU;
            u1 /= baseU;
            u2 /= baseU;
        }
        if (baseV !== undefined) {
            v0 /= baseU;
            v1 /= baseU;
            v2 /= baseU;
        }

        this.u0 = u0; // 0~1
        this.v0 = v0; // 0~1
        this.u1 = u1; // 0~1
        this.v1 = v1; // 0~1
        this.u2 = u2; // 0~1
        this.v2 = v2; // 0~1
    }

    setFrameSize(frameWidth, frameHeight) {
        this.frameX0 = this.u0 * frameWidth;
        this.frameY0 = this.v0 * frameHeight;
        this.frameX1 = this.u1 * frameWidth;
        this.frameY1 = this.v1 * frameHeight;
        this.frameX2 = this.u2 * frameWidth;
        this.frameY2 = this.v2 * frameHeight;

        var centerUV = GetInCenter(this.frameX0, this.frameY0, this.frameX1, this.frameY1, this.frameX2, this.frameY2, true);
        this.frameCenterX = centerUV.x;
        this.frameCenterY = centerUV.y;

        return this;
    }

    setFrameUV(frameU0, frameV0, frameU1, frameV1) {
        var frameU = frameU1 - frameU0;
        var frameV = frameV1 = frameV0;
        this.frameU0 = this.u0 * frameU;
        this.frameV0 = this.v0 * frameV;
        this.frameU1 = this.u1 * frameU;
        this.frameV1 = this.v1 * frameV;
        this.frameU2 = this.u2 * frameU;
        this.frameV2 = this.v2 * frameV;
        return this;
    }
}


export default Face;
