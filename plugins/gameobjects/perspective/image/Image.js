const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;

class Image extends Phaser.GameObjects.Mesh {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame);
        this.type = 'rexPerspectiveImage';
        this.setSizeToFrame();

        this.setPerspective(this.width, this.height, 45);
        this.panZ(2.4);
        this.hideCCW = GetValue(config, 'hideCCW', false);

        var girdWidth = GetValue(config, 'gridWidth', 32);
        var girdHeight = GetValue(config, 'girdHeight', girdWidth);
        var textureFrame = this.texture.get(frame);
        var frameWidth = textureFrame.cutWidth,
            frameHeight = textureFrame.cutHeight;
        GenerateGridVerts({
            mesh: this,
            texture: texture, frame: frame,

            width: frameWidth / this.height,
            height: frameHeight / this.height,

            widthSegments: Math.ceil(frameWidth / girdWidth),
            heightSegments: Math.ceil(frameHeight / girdHeight)
        });
    }

    get rotationX() {
        return this.modelRotation.x;
    }

    set rotationX(value) {
        this.modelRotation.x = value;
    }

    get angleX() {
        return RadToDeg(this.rotationX);
    }

    set angleX(value) {
        this.rotationX = DegToRad(value);
    }

    get rotationY() {
        return this.modelRotation.y;
    }

    set rotationY(value) {
        this.modelRotation.y = value;
    }

    get angleY() {
        return RadToDeg(this.rotationY);
    }

    set angleY(value) {
        this.rotationY = DegToRad(value);
    }

    get rotationZ() {
        return this.modelRotation.z;
    }

    set rotationZ(value) {
        this.modelRotation.z = value;
    }

    get angleZ() {
        return RadToDeg(this.rotationZ);
    }

    set angleZ(value) {
        this.rotationZ = DegToRad(value);
    }

    get isFlippedY() {
        var angleY = WrapDegrees(this.angleY); // -180 to 180 
        return ((angleY > 90) && (angleY <= 180)) ||
            ((angleY < -90) && (angleY >= -180));
    }

    get isFlippedX() {
        var angleX = WrapDegrees(this.angleX); // -180 to 180 
        return ((angleX > 90) && (angleX <= 180)) ||
            ((angleX < -90) && (angleX >= -180));
    }

    setFlipY(flipY) {
        if (flipY === undefined) {
            flipY = true;
        }
        this.angleY = (flipY) ? 180 : 0;
        return this;
    }

    setFlipX(flipX) {
        if (flipX === undefined) {
            flipX = true;
        }
        this.angleX = (flipX) ? 180 : 0;
        return this;
    }
}

export default Image;