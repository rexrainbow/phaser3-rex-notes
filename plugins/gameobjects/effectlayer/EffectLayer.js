const Image = Phaser.GameObjects.Image;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class EffectLayer extends Image {
    constructor(scene, key) {
        // gameObjects -> render-texture -> shader -> image

        // render-texture -> shader
        var w = scene.sys.scale.width,
            h = scene.sys.scale.height;
        var rt = scene.make.renderTexture({ width: w, height: h, add: false });
        var shader = scene.add.shader(key, 0, 0, w, h);
        shader.setSampler2DBuffer('iChannel0', rt.glTexture, w, h, 0);

        // shader -> image
        var textureKey = `el${Date.now()}`;
        shader.setRenderToTexture(textureKey, true);

        super(scene, 0, 0, textureKey);
        this.type = 'rexEffectLayer';

        this.setOrigin(0);

        this.shader = shader;
        this.rt = rt;

        this.children = [];
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.clear(!fromScene);
        super.destroy(fromScene);
    }

    preUpdate(time, delta) {
        this.rt.clear();

        this.children.forEach((gameObject) => {

            this.rt.draw(gameObject, gameObject.x, gameObject.y);

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