import SkewImage from '../skewimage/SkewImage.js';

const RT = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class SkewRenderTexture extends SkewImage {
    constructor(scene, x, y, width, height) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // render-texture -> skew-image
        var rt = (new RT(scene, x, y, width, height))
            .setOrigin(0.5);

        super(scene, x, y, rt.texture.key, null);
        this.type = 'rexSkewRenderTexture';
        this.rt = rt;
    }

    destroy(fromScene) {
        super.destroy(fromScene);

        this.rt.destroy();
        this.rt = null;
    }
}

export default SkewRenderTexture;