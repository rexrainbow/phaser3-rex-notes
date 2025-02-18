import Container from '../../../container/containerlite/ContainerLite.js';
import RotateMethods from './RotateMethods.js';
import ForEachFace from './ForEachFace.js';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class FaceContainer extends Container {
    constructor(scene, x, y, width, height, faces) {
        super(scene, x, y, width, height);
        this.faces = faces;  // Face Dictionary, or array

        ForEachFace(faces, function (face) {
            face.setPosition(x, y);
            this.add(face);
        }, this, true);
    }

    // Override
    get rotationX() {
        return 0;
    }

    // Override
    set rotationX(value) {
        // rad
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotateX() {
        return RadToDeg(this.rotationX);
    }

    set rotateX(value) {
        this.rotationX = DegToRad(value);
    }

    // Override
    get rotationY() {
        return 0;
    }

    // Override
    set rotationY(value) {
        // rad
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotateY() {
        return RadToDeg(this.rotationY);
    }

    set rotateY(value) {
        this.rotationY = DegToRad(value);
    }

    // Override
    get rotationZ() {
        return 0;
    }

    // Override
    set rotationZ(value) {
        // rad
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    get rotateZ() {
        return RadToDeg(this.rotationZ);
    }

    set rotateZ(value) {
        this.rotationZ = DegToRad(value);
    }

    setDebug(graphic, callback) {
        ForEachFace(this.faces, function (face) {
            face.setDebug(graphic, callback);
        }, null, true);
        return this;
    }

    forEachFace(callback, scope, ignoreInvalid) {
        ForEachFace(this.faces, callback, scope, ignoreInvalid);
        return this;
    }

}

Object.assign(
    FaceContainer.prototype,
    RotateMethods
)

export default FaceContainer;