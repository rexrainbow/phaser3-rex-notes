import Container from '../../containerlite/ContainerLite.js';
import CreatePerspectiveObject from '../utils/CreatePerspectiveObject.js';
import Flip from './Flip.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const RAD180 = DegToRad(180);

class Card extends Container {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var orientation = GetValue(config, 'orientation', 0)

        var backFace = CreatePerspectiveObject(scene, GetValue(config, 'back'))
            .setPosition(x, y);
        var frontFace = CreatePerspectiveObject(scene, GetValue(config, 'front'))
            .setPosition(x, y);

        if (orientation === 0) { // Flip around Y
            backFace.transformVerts(0, 0, 0, 0, RAD180, 0);
        } else { // Flip around X
            backFace.transformVerts(0, 0, 0, RAD180, 0, 0);
        }

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        if ((width === undefined) || (height === undefined)) {
            if (width === undefined) {
                width = Math.max(frontFace.width, backFace.width);
            }

            if (height === undefined) {
                height = Math.max(frontFace.height, backFace.height);
            }
        }

        super(scene, x, y, width, height);
        this.type = 'rexPerspectiveCard';

        this.addMultiple([backFace, frontFace]);
        this.backFace = backFace;
        this.frontFace = frontFace;

        this.setOrientation(orientation);
        this.setFace(GetValue(config, 'face', 0));

        var flipConfig = GetValue(config, 'flip', undefined);
        if (flipConfig !== false) {
            this.flip = new Flip(this, flipConfig);
        }
    }

    get rotationX() {
        return this.frontFace.rotationX;
    }

    set rotationX(value) {
        this.frontFace.rotationX = value;
        this.backFace.rotationX = value;
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this.frontFace.rotationY;
    }

    set rotationY(value) {
        this.frontFace.rotationY = value;
        this.backFace.rotationY = value;
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this.frontFace.rotationZ;
    }

    set rotationZ(value) {
        this.frontFace.rotationZ = value;
        this.backFace.rotationZ = value;
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    setDebug(graphic, callback) {
        this.frontFace.setDebug(graphic, callback);
        this.backFace.setDebug(graphic, callback);
        return this;
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    get face() {
        return this._face;
    }

    set face(face) {
        if (typeof (face) === 'string') {
            face = FACEMODE[face];
        }
        this._face = face;

        var isBackFace = (face === 1);
        var angle = (isBackFace) ? 180 : 0;
        if (this.orientation === 0) {  // Flip around Y
            this.angleY = angle;
        } else {  // Flip around X
            this.angleX = angle;
        }
    }

    setFace(face) {
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
    y: 1,
    vertical: 1,
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Card;