import FaceContainer from '../utils/FaceContainer.js';
import CreateFaces from '../utils/CreateFaces.js';
import ForEachFace from '../utils/ForEachFace.js';
import GetFirstFace from './GetFirstFace.js';
import LayoutFaces from './LayoutFaces.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

class Carousel extends FaceContainer {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        var faceConfig = GetValue(config, 'faces', undefined);
        if (!faceConfig) {
            faceConfig = [];
        }
        var faces = CreateFaces(scene, faceConfig);
        var firstFace = GetFirstFace(faces);

        var width = GetValue(config, 'width');
        var height = GetValue(config, 'height');
        if (width === undefined) {
            width = (firstFace) ? firstFace.width : 0;
        }
        if (height === undefined) {
            height = (firstFace) ? firstFace.height : 0;
        }

        super(scene, x, y, width, height, faces);
        this.type = 'rexPerspectiveCarousel';

        this.face0RotationY = 0;

        // Face angle
        this.faceAngle = DegToRad(360 / faces.length);

        // Face width, face radius
        var faceWidth = GetValue(config, 'faceWidth', undefined);
        if (faceWidth === undefined) {
            faceWidth = (firstFace) ? firstFace.width : 0;
        }
        this.faceWidth = faceWidth;
        this.faceRadius = (this.faceWidth / 2) / Math.tan(this.faceAngle / 2);

        LayoutFaces(this, faces);
    }

    get rotationY() {
        return this.face0RotationY;
    }

    set rotationY(value) {
        this.face0RotationY = value;
        var deltaAngle = this.faceAngle;
        ForEachFace(this.faces, function (face, i) {
            face.rotationY = value + (deltaAngle * i);
        }, null, true);
    }
}

export default Carousel;