import Carousel from '../carousel/Carousel.js';
import RenderTexture from '../rendertexture/Base.js';
import GetFaceSize from './GetFaceSize.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Wrap = Phaser.Math.Wrap;

class ImageCarousel extends Carousel {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        if (config === undefined) {
            config = {};
        }

        var faceWidth, faceHeight;
        var images = GetValue(config, 'images');
        var faceSize = GetFaceSize(scene, images);
        if (faceSize) {
            faceWidth = faceSize.width;
            faceHeight = faceSize.height;
        } else {
            faceWidth = GetValue(config, 'width');
            faceHeight = GetValue(config, 'height');
        }

        // Create 4 render-texture faces
        var face, faces = [];
        for (var i = 0; i < 4; i++) {
            face = new RenderTexture(scene, 0, 0, faceWidth, faceHeight, config);
            scene.add.existing(face);
            faces.push(face);
        }

        config.faces = faces;
        super(scene, x, y, config);
        this.type = 'rexPerspectiveImageCarousel';

        this.images = images;
        this.repeat = GetValue(config, 'repeat', true);
        this
            .setImageIndex(GetValue(config, 'index', 0))
            .updateTexture();
    }

    setImageIndex(index) {
        this.currentImageIndex = Wrap(index, 0, this.images.length);
        return this;
    }

    updateTexture() {
        var totalKeys = this.images.length;
        var totalFaces = this.faces.length;

        IndexOffsetMap.forEach(function (indexOffset) {
            var textureIndex = Wrap(this.currentImageIndex + indexOffset, 0, totalKeys);
            var faceIndex = Wrap(this.currentFaceIndex + indexOffset, 0, totalFaces);

            var textureKey = this.images[textureIndex];
            this.faces[faceIndex].rt.drawFrame(textureKey.key, textureKey.frame);
        }, this)

        return this;
    }

    toNext(duration) {
        if (this.roll.isRunning) {
            return this;
        }

        this.setImageIndex(this.currentImageIndex + 1);
        this.roll
            .toNext(duration)
            .once('complete', this.updateTexture, this)

        return this;
    }

    toPrevious(duration) {
        if (this.roll.isRunning) {
            return this;
        }

        this.setImageIndex(this.currentImageIndex - 1);
        this.roll
            .toPrevious(duration)
            .once('complete', this.updateTexture, this)

        return this;
    }

}

const IndexOffsetMap = [0, 1, -1];

export default ImageCarousel;