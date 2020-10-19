import Container from '../../containerlite/ContainerLite.js';
import CreatePerspectiveObject from '../utils/CreatePerspectiveObject.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

const RAD90 = DegToRad(90);

class Card extends Container {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var backFace = CreatePerspectiveObject(scene, GetValue(config, 'back'))
            .setPosition(x, y);
        var frontFace = CreatePerspectiveObject(scene, GetValue(config, 'front'))
            .setPosition(x, y);
        var leftFace = CreatePerspectiveObject(scene, GetValue(config, 'left'))
            .setPosition(x, y);
        var rightFace = CreatePerspectiveObject(scene, GetValue(config, 'right'))
            .setPosition(x, y);

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        super(scene, x, y, width, height);
        this.type = 'rexPerspectiveCube';

        this.faces = [frontFace, leftFace, backFace, rightFace];
        this.addMultiple(this.faces);
        this.frontFace = frontFace;
        this.leftFace = leftFace;
        this.backFace = backFace;
        this.rightFace = rightFace;

        frontFace.modelRotation.y = 0;
        leftFace.modelRotation.y = RAD90;
        backFace.modelRotation.y = RAD90 * 2;
        rightFace.modelRotation.y = -RAD90;

        var face;
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            face = this.faces[i];
            face.modelPosition.z = 1;
            face.panZ(1);
            // face.forceUpdate();
        }
    }

    get rotationX() {
        return this.frontFace.rotationX;
    }

    set rotationX(value) {
        var delta = value - this.frontFace.rotationX;
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            this.faces[i].rotationX += delta;
        }
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
        var delta = value - this.frontFace.rotationY;
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            this.faces[i].rotationY += delta;
        }
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
        var delta = value - this.frontFace.rotationZ;
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            this.faces[i].rotationZ += delta;
        }
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    setDebug(graphic, callback) {
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            this.faces[i].setDebug(graphic, callback);
        }
        return this;
    }
}

export default Card;