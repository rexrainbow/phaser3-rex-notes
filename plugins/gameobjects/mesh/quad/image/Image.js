import Mesh2DSprite from '../../mesh2dwrapper/sprite/Sprite.js';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class Image extends Mesh2DSprite {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        if (config === undefined) {
            config = {};
        }
        if (config.renderAsTriangles === undefined) {
            config.renderAsTriangles = true;
        }
        if (config.useOrderedIndices === undefined) {
            config.useOrderedIndices = false;
        }

        super(scene, x, y, key, frame, config);
        this.type = 'rexQuadImage';
        this.isNinePointMode = GetValue(config, 'ninePointMode', false);
        this.fourPointsModeRTL = GetValue(config, 'rtl', false);

        this.initVertices();
    }

    initVertices() {
        var isNinePointMode = this.isNinePointMode;
        var pointsPerSide = (isNinePointMode) ? 3 : 2;
        var vertices = [];

        for (var r = 0; r < pointsPerSide; r++) {
            for (var c = 0; c < pointsPerSide; c++) {
                var vertex = this.createVertex(c / (pointsPerSide - 1), r / (pointsPerSide - 1));
                vertices.push(vertex);
            }
        }

        if (isNinePointMode) {
            this.setFaceIndices(NinePointsIndices);

            this.topLeft = vertices[0];
            this.topCenter = vertices[1];
            this.topRight = vertices[2];
            this.centerLeft = vertices[3];
            this.center = vertices[4];
            this.centerRight = vertices[5];
            this.bottomLeft = vertices[6];
            this.bottomCenter = vertices[7];
            this.bottomRight = vertices[8];
        } else {
            this.setFaceIndices((!this.fourPointsModeRTL) ? FourPointsIndices : FourPointsIndicesRTL);

            this.topLeft = vertices[0];
            this.topRight = vertices[1];
            this.bottomLeft = vertices[2];
            this.bottomRight = vertices[3];
        }

        return this;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);
    }
}

/*
0, 1,
2, 3,
*/
const FourPointsIndices = [
    0, 2, 3,
    0, 3, 1
];

const FourPointsIndicesRTL = [
    1, 3, 2,
    1, 2, 0
];

/*
0, 1, 2,
3, 4, 5,
6, 7, 8
*/
const NinePointsIndices = [
    0, 3, 4,
    0, 4, 1,
    1, 4, 2,
    4, 5, 2,
    3, 6, 4,
    6, 7, 4,
    4, 7, 8,
    4, 8, 5
];

export default Image;
