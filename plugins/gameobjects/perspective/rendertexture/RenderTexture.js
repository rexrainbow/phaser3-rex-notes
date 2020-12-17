import PerspectiveImage from '../image/Image.js';

const RT = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderTexture extends PerspectiveImage {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // render-texture -> perspective-image
        var rt = (new RT(scene, x, y, width, height))
            .setOrigin(0.5);

        super(scene, x, y, rt.texture.key, null, config);
        this.type = 'rexPerspectiveRenderTexture';
        this.rt = rt;
    }

    destroy(fromScene) {
        super.destroy(fromScene);

        this.rt.destroy(fromScene);
        this.rt = null;
    }
}

export default RenderTexture;