import PerspectiveRenderTexture from '../rendertexture/RenderTexture.js';

const SPRITE = Phaser.GameObjects.Sprite;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Sprite extends PerspectiveRenderTexture {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        // sprite -> perspective-render-texture
        var sprite = (new SPRITE(scene, x, y, key, frame))
            .setOrigin(0.5);
        var width = GetValue(config, 'width', sprite.width);
        var height = GetValue(config, 'height', sprite.height);

        super(scene, x, y, width, height, config);
        this.type = 'rexPerspectiveSprite';
        this.sprite = sprite;

        var rt = this.rt;
        sprite.on('animationupdate', function (currentAnim, currentFrame, sprite) {
            DrawSprite(rt, sprite);
        });

        DrawSprite(rt, sprite);
    }

    destroy(fromScene) {
        super.destroy(fromScene);

        this.sprite.destroy();
        this.sprite = null;
    }

    preUpdate(time, delta) {
        this.sprite.preUpdate(time, delta);
        super.preUpdate(time, delta);
    }
}

var DrawSprite = function (rt, sprite) {
    rt
        .clear()
        .draw(sprite, rt.width / 2, rt.height / 2)
}

export default Sprite;