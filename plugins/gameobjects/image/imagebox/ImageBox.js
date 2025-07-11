import ImageBoxBase from './ImageBoxBase.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class ImageBox extends ImageBoxBase {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(frame)) {
            config = frame;
            frame = undefined;
        }

        super(scene, x, y, 1, 1);
        this.type = 'rexImageBox';

        var background = GetValue(config, 'background');
        this.setBackground(background);

        var image = GetValue(config, 'image');
        this.setImage(image);
        image = this.image;
        // Size has not assigned yet
        if (texture === undefined) {
            this.setChildVisible(image, false);
        } else {
            image.setTexture(texture, frame);
        }

        this.scaleUp = GetValue(config, 'scaleUp', false);

        var width = GetValue(config, 'width', image.width);
        var height = GetValue(config, 'height', image.height);
        this.resize(width, height);

    }
}

export default ImageBox;