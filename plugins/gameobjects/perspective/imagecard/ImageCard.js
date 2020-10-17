import Container from '../../containerlite/ContainerLite.js';
import PerspectiveImage from '../image/Image.js';
import Flip from './Flip.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const DefaultFrameConfig = { key: '__WHITE' };
const RAD180 = DegToRad(180);

class ImageCard extends Container {
    constructor(scene, x, y, config) {
        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        var frontFace = GetValue(config, 'front', DefaultFrameConfig);
        var backFace = GetValue(config, 'back', DefaultFrameConfig);

        if ((width === undefined) || (height === undefined)) {
            var frontFaceFrame = scene.textures.getFrame(frontFace.key, frontFace.frame);
            var backFaceFrame = scene.textures.getFrame(backFace.key, backFace.frame);

            if (width === undefined) {
                width = Math.max(frontFaceFrame.cutWidth, backFaceFrame.cutWidth);
            }

            if (height === undefined) {
                height = Math.max(frontFaceFrame.cutHeight, backFaceFrame.cutHeight);
            }
        }

        super(scene, x, y, width, height);
        this.type = 'rexPerspectiveImageCard';

        this.setOrientation(GetValue(config, 'orientation', 0));

        this.backImage = new PerspectiveImage(scene,
            x, y,
            backFace.key, backFace.frame,
            { hideCCW: true }
        );
        scene.add.existing(this.backImage);

        this.frontImage = new PerspectiveImage(scene,
            x, y,
            frontFace.key, frontFace.frame,
            { hideCCW: true }
        );
        scene.add.existing(this.frontImage);

        this
            .add(this.frontImage)
            .add(this.backImage);

        this.setFace(GetValue(config, 'face', 0))
        this.backImage.forceUpdate();
        this.frontImage.forceUpdate();

        this.flip = new Flip(this, GetValue(config, 'flip', undefined));
    }

    get rotationX() {
        return this.frontImage.rotationX;
    }

    set rotationX(value) {
        this.frontImage.rotationX = value;

        if (this.orientation === 1) {
            this.backImage.rotationX = value - RAD180;
        }
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this.frontImage.rotationY;
    }

    set rotationY(value) {
        this.frontImage.rotationY = value;
        if (this.orientation === 0) {
            this.backImage.rotationY = value - RAD180;
        }
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this.frontImage.rotationZ;
    }

    set rotationZ(value) {
        this.frontImage.rotationZ = value;
        this.backImage.rotationZ = value;
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    setDebug(graphic, callback) {
        this.frontImage.setDebug(graphic, callback);
        this.backImage.setDebug(graphic, callback);
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

        var angle = (face) ? 180 : 0;
        if (this.orientation === 0) {
            this.angleY = angle;
        } else {
            this.angleY = angle;
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

export default ImageCard;