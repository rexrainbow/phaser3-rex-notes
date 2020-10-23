import FaceContainer from '../utils/FaceContainer.js';
import CreateFaces from '../utils/CreateFaces.js';
import ForEachFace from '../utils/ForEachFace.js';
import LayoutFaces from './LayoutFaces.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

const FaceNames = ['back', 'left', 'right', 'bottom', 'top', 'front'];

class Card extends FaceContainer {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faces = CreateFaces(scene, config, FaceNames);

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        super(scene, x, y, width, height, faces);
        this.type = 'rexPerspectiveCube';

        this.frontFaceRotationX = 0;
        this.frontFaceRotationY = 0;
        this.frontFaceRotationZ = 0;

        ForEachFace(faces, function (face, name) {
            this[`${name}Face`] = face;
        }, this);

        LayoutFaces(this, faces);
    }

    get rotationX() {
        return this.frontFaceRotationX;
    }

    set rotationX(value) {
        this.frontFaceRotationX = value;
        ForEachFace(this.faces, function (face) {
            face.rotationX = value;
        }, null, true);
    }

    get rotationY() {
        return this.frontFaceRotationY;
    }

    set rotationY(value) {
        this.frontFaceRotationY = value;
        ForEachFace(this.faces, function (face) {
            face.rotationY = value;
        }, null, true);
    }

    get rotationZ() {
        return this.frontFaceRotationZ;
    }

    set rotationZ(value) {
        this.frontFaceRotationZ = value;
        ForEachFace(this.faces, function (face) {
            face.rotationZ = value;
        }, null, true);
    }
}

export default Card;