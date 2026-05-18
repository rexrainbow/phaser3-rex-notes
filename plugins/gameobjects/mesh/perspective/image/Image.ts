import Mesh from '../../mesh/sprite/Sprite';
import Methods from './methods/Methods';
import RotateXYZ from '../../mesh/utils/RotateXYZ';
import IsBackFace from '../../mesh/utils/IsBackFace';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const RadToDeg = PhaserMath.RadToDeg;
const DegToRad = PhaserMath.DegToRad;

class Image extends Mesh {
    frame: any;
    gridHeight: any;
    gridWidth: any;

    _rotationX: any;
    _rotationY: any;
    _rotationZ: any;
    clear: any;
    height: any;
    hideBackFace: any;
    isBackFace: any;
    type: any;
    width: any;

    constructor(scene?: any, x?: any, y?: any, key?: any, frame?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexPerspectiveImage';
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
        this.isBackFace = false;
        this.hideBackFace = GetValue(config, 'hideBackFace', true);

        var gridWidth = GetValue(config, 'gridWidth', 0);
        var gridHeight = GetValue(config, 'gridHeight', gridWidth);
        this.resetVertices(gridWidth, gridHeight);

    }

    resetVertices(gridWidth?: any, gridHeight?: any) {
        if (gridWidth !== undefined) {
            this.gridWidth = gridWidth;
        }
        if (gridHeight !== undefined) {
            this.gridHeight = gridHeight;
        }

        // Clear faces and vertices
        this.clear();
        if ((this.width === 0) || (this.height === 0)) {
            return this;
        }

        // Generate faces and vertices
        var frameWidth = this.frame.cutWidth,
            frameHeight = this.frame.cutHeight;

        var gridWidth, gridHeight;
        if (this.gridWidth === 0) {
            gridWidth = Math.max(frameWidth / 8, 32);
        } else {
            gridWidth = this.gridWidth;
        }
        if (this.gridHeight === 0) {
            gridHeight = Math.max(frameHeight / 8, 32);
        } else {
            gridHeight = this.gridHeight;
        }

        this
            .addGridFaces({
                columns: Math.ceil(frameWidth / gridWidth),
                rows: Math.ceil(frameHeight / gridHeight),
                sharedVertexMode: true
            });

        this.syncRotation();

        return this;
    }

    setSizeToFrame(frame?: any) {
        super.setSizeToFrame(frame);

        if (this._rotationX !== undefined) {
            this.syncRotation();
        }

        return this;
    }

    syncRotation() {
        Rotate(this, this._rotationX, this._rotationY, this._rotationZ);

        return this;
    }

    get rotationX() {
        return this._rotationX;
    }

    set rotationX(value) {
        if (this._rotationX === value) {
            return;
        }

        this._rotationX = value;
        this.syncRotation();
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this._rotationY;
    }

    set rotationY(value) {
        if (this._rotationY === value) {
            return;
        }

        this._rotationY = value;
        this.syncRotation();
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this._rotationZ;
    }

    set rotationZ(value) {
        if (this._rotationZ === value) {
            return;
        }

        this._rotationZ = value;
        this.syncRotation();
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }
}

var Rotate = function(gameObject?: any, rotationX?: any, rotationY?: any, rotationZ?: any) {
    RotateXYZ(gameObject, rotationX, rotationY, rotationZ);
    if (gameObject.faces.length > 0) {
        gameObject.isBackFace = IsBackFace(gameObject.faces[0]);
    } else {
        gameObject.isBackFace = false;
    }
}

Object.assign(
    Image.prototype,
    Methods
)

export default Image;