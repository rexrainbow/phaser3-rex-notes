import Image from '../image/Image.js';
import Snapshot from '../../../../utils/rendertexture/Snapshot.js';

const RT = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderTexture extends Image {
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

        this.rt.destroy();
        this.rt = null;
    }

    snapshot(gameObjects, padding) {
        if (padding === undefined) {
            padding = 0;
        }

        Snapshot({
            gameObjects: gameObjects,
            renderTexture: this.rt,
            padding: padding
        })

        if ((this.width !== this.frame.realWidth) || (this.height !== this.frame.realHeight)) {
            this.syncSize();
        }

        return this;
    }
}

export default RenderTexture;