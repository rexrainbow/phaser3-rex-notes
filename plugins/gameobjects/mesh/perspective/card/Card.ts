import FaceContainer from '../utils/FaceContainer';
import CreateFaces from '../utils/CreateFaces';
import ForEachFace from '../utils/ForEachFace';
import LayoutFaces from './LayoutFaces';
import Flip from './Flip';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

const FaceNames = ['back', 'front'];

class Card extends FaceContainer {
    orientation: any;

    angleX: any;
    angleY: any;
    currentFaceIndex: any;
    faces: any;
    flip: any;
    frontFaceRotationX: any;
    frontFaceRotationY: any;
    frontFaceRotationZ: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faces = CreateFaces(scene, config, FaceNames);
        var backFace = faces.back;
        var frontFace = faces.front;

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        if ((width === undefined) || (height === undefined)) {
            if (width === undefined) {
                var frontFaceWidth = (frontFace) ? frontFace.width : 0;
                var backFaceWidth = (backFace) ? backFace.width : 0;
                width = Math.max(frontFaceWidth, backFaceWidth);
            }

            if (height === undefined) {
                var frontFaceHeight = (frontFace) ? frontFace.height : 0;
                var backFaceHeight = (backFace) ? backFace.height : 0;
                height = Math.max(frontFaceHeight, backFaceHeight);
            }
        }

        super(scene, x, y, width, height, faces);
        this.type = 'rexPerspectiveCard';

        this.frontFaceRotationX = 0;
        this.frontFaceRotationY = 0;
        this.frontFaceRotationZ = 0;

        ForEachFace(faces, function(face?: any, name?: any) {
            this[`${name}Face`] = face;
        }, this);

        var flipConfig = GetValue(config, 'flip', undefined);
        if (flipConfig !== false) {
            this.flip = new Flip(this, flipConfig);
        }

        this.setOrientation(GetValue(config, 'orientation', 0));
        LayoutFaces(this, faces);

        this.setFace(GetValue(config, 'face', 0));
    }

    get rotationX() {
        return this.frontFaceRotationX;
    }

    set rotationX(value) {
        if (this.frontFaceRotationX === value) {
            return;
        }

        var delta = value - this.frontFaceRotationX;
        this.frontFaceRotationX = value;
        ForEachFace(this.faces, function(face?: any) {
            face.rotationX += delta;
        }, null, true);
    }

    get rotationY() {
        return this.frontFaceRotationY;
    }

    set rotationY(value) {
        if (this.frontFaceRotationY === value) {
            return;
        }

        var delta = value - this.frontFaceRotationY;
        this.frontFaceRotationY = value;
        ForEachFace(this.faces, function(face?: any) {
            face.rotationY += delta;
        }, null, true);
    }

    get rotationZ() {
        return this.frontFaceRotationZ;
    }

    set rotationZ(value) {
        if (this.frontFaceRotationZ === value) {
            return;
        }

        var delta = value - this.frontFaceRotationZ;
        this.frontFaceRotationZ = value;
        ForEachFace(this.faces, function(face?: any) {
            face.rotationZ += delta;
        }, null, true);
    }

    setOrientation(orientation?: any) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    get face() {
        return this.currentFaceIndex;
    }

    set face(index) {
        if (typeof (index) === 'string') {
            index = FACEMODE[index];
        }
        this.currentFaceIndex = index;

        var isBackFace = (index === 1);
        var angle = (isBackFace) ? 180 : 0;
        if (this.orientation === 0) {  // Flip around Y
            this.angleY = angle;
        } else {  // Flip around X
            this.angleX = angle;
        }
    }

    setFace(face?: any) {
        this.face = face;
        return this;
    }

    toggleFace() {
        var newFace = (this.face === 0) ? 1 : 0;
        this.setFace(newFace);
        return this;
    }
}

const ORIENTATIONMODE = {
    x: 0,
    horizontal: 0,
    h: 0,

    y: 1,
    vertical: 1,
    v: 1
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Card;