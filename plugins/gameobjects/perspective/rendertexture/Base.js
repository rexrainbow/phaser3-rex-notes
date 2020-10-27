import PerspectiveImage from '../image/Image.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

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
        var rt = GetValue(config, 'renderTexture', undefined);
        if (!rt) {
            rt = scene.make.renderTexture({ width: width, height: height, add: false })
        }
        rt
            .setPosition(x, y)
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