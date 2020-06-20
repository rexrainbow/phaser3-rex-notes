import RoundUpPowerOf2 from '../../utils/math/RoundUpPowerOf2.js';

const Image = Phaser.GameObjects.Image;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class EffectLayer extends Image {
    constructor(scene, key, x, y, width, height) {
        // gameObjects -> render-texture -> shader -> image

        if (typeof (x) === 'object') {
            var config = x;
            ({ x, y, width, height } = config)
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = scene.sys.scale.width; }
        if (height === undefined) { height = scene.sys.scale.height; }

        // render-texture -> shader
        width = RoundUpPowerOf2(width);
        height = RoundUpPowerOf2(height);
        var rt = scene.make.renderTexture({ x: x, y: y, width: width, height: height, add: false });
        var shader = scene.add.shader(key, x, y, width, height);
        shader.setSampler2DBuffer('iChannel0', rt.glTexture, width, height, 0);

        // shader -> image
        var textureKey = `el${Date.now()}`;
        shader.setRenderToTexture(textureKey, true);

        super(scene, x, y, textureKey);
        this.type = 'rexEffectLayer';

        this.setOrigin(0);

        this.shader = shader;
        this.rt = rt;

        this.children = [];

        this.boot();
    }

    boot() {
        this.scene.events.on('postupdate', this.postUpdate, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.scene.events.off('postupdate', this.postUpdate, this);
        this.clear(!fromScene);
        super.destroy(fromScene);
    }

    postUpdate(time, delta) {
        var rt = this.rt;
        rt.clear();
        this.children.forEach(function (gameObject) {
            rt
                .setScrollFactor(gameObject.scrollFactorX, gameObject.scrollFactorY)
                .draw(gameObject, gameObject.x, gameObject.y)
        });
    }

    setUniform(key, value) {
        this.shader.setUniform(`${key}.value`, value);
        return this;
    }

    setUniformXY(key, x, y) {
        this.shader.setUniform(`${key}.value.x`, x);
        this.shader.setUniform(`${key}.value.y`, y);
        return this;
    }

    setUniformXYZ(key, x, y, z) {
        this.shader.setUniform(`${key}.value.x`, x);
        this.shader.setUniform(`${key}.value.y`, y);
        this.shader.setUniform(`${key}.value.z`, z);
        return this;
    }

    setUniformXYZW(key, x, y, z, w) {
        this.shader.setUniform(`${key}.value.x`, x);
        this.shader.setUniform(`${key}.value.y`, y);
        this.shader.setUniform(`${key}.value.z`, z);
        this.shader.setUniform(`${key}.value.w`, w);
        return this;
    }

    contains(gameObject) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects) {
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function (gameObject) {
                gameObject.on('destroy', this.remove, this);
            }, this);
        return this;
    }

    remove(gameObjects, destroyChild) {
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function (gameObject) {
                gameObject.off('destroy', this.remove, this);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
        );
        return this;
    }

    clear(destroyChild) {
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            gameObject = this.children[i];
            gameObject.off('destroy', this.remove, this);
            if (destroyChild) {
                gameObject.destroy();
            }
        }
        this.children.length = 0;
        return this;
    }
}

export default EffectLayer;