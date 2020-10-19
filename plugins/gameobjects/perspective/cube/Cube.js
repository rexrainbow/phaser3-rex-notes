import Container from '../../containerlite/ContainerLite.js';
import CreatePerspectiveObject from '../utils/CreatePerspectiveObject.js';
import CreateFaceConfig from './CreateFaceConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Card extends Container {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faces = [];
        var face, createFaceConfig, faceConfig;
        for (var i = 0, cnt = CreateFaceConfig.length; i < cnt; i++) {
            createFaceConfig = CreateFaceConfig[i];
            faceConfig = GetValue(config, createFaceConfig.name);
            if (faceConfig) {
                face = CreatePerspectiveObject(scene, faceConfig)
                    .transformVerts(
                        createFaceConfig.translateX,
                        createFaceConfig.translateY,
                        createFaceConfig.translateZ,

                        createFaceConfig.rotateX,
                        createFaceConfig.rotateY,
                        0
                    )
                    .panZ(0.5)
                    .setPosition(x, y)
            } else {
                face = null;
            }
            faces.push(face);
        }

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        super(scene, x, y, width, height);
        this.type = 'rexPerspectiveCube';

        this.faces = faces;
        this.forEahcFace(function (face) {
            this.add(face);
        }, this);
        this.frontFace = faces[0];
        this.backFace = faces[1];
        this.leftFace = faces[2];
        this.rightFace = faces[3];
        this.topFace = faces[4];
        this.bottomFace = faces[5];
    }

    get rotationX() {
        return this.frontFace.rotationX;
    }

    set rotationX(value) {
        this.forEahcFace(function (face) {
            face.rotationX = value;
        });
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
        this.forEahcFace(function (face) {
            face.rotationY = value;
        });
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
        this.forEahcFace(function (face) {
            face.rotationZ = value;
        });
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    forEahcFace(callback, scope) {
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            var face = this.faces[i];
            if (!face) {
                continue;
            }

            if (scope) {
                callback.call(scope, face);
            } else {
                callback(face);
            }
        }
        return this;
    }

    setDebug(graphic, callback) {
        for (var i = 0, cnt = this.faces.length; i < cnt; i++) {
            this.faces[i].setDebug(graphic, callback);
        }
        return this;
    }
}

const RAD90 = DegToRad(90);

export default Card;