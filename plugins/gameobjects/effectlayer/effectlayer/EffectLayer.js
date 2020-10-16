import RoundUpPowerOf2 from '../../../utils/math/RoundUpPowerOf2.js';

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
        var textureKey = `el${Date.now()}`; // Private texture
        shader.setRenderToTexture(textureKey, true);

        super(scene, x, y, textureKey);
        this.type = 'rexEffectLayer';

        this
            .setScrollFactor(0)
            .setOrigin(0);

        this.shader = shader;
        this.rt = rt;

        this.children = [];

        this.boot();
    }

    boot() {
        this.scene.game.events.on('prerender', this.drawTargets, this);
        this.scene.scale.on('resize', this.onWindowResize, this);
    }

    destroy(fromScene) {
        this.scene.game.events.off('prerender', this.drawTargets, this);
        this.scene.scale.off('resize', this.onWindowResize, this);
        // Private texture will be removed by shader game object
        this.clear();

        super.destroy(fromScene);

        this.shader.destroy(fromScene);
        this.rt.destroy(fromScene);
        this.shader = null;
        this.rt = null;
    }

    drawTargets() {
        // Assume that game objects are displayed on main camera.
        var camera = this.scene.cameras.main;
        var offsetX = camera.scrollX + this.x;
        var offsetY = camera.scrollY + this.y;

        var rt = this.rt;
        rt.clear();
        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            child = this.children[i];
            rt
                .draw(
                    child,
                    child.x - offsetX,
                    child.y - offsetY
                )
        }
    }

    set1f(key, value) {
        this.shader.setUniform(`${key}.value`, value);
        return this;
    }

    set2f(key, x, y) {
        this.shader.setUniform(`${key}.value.x`, x);
        this.shader.setUniform(`${key}.value.y`, y);
        return this;
    }

    set3f(key, x, y, z) {
        this.shader.setUniform(`${key}.value.x`, x);
        this.shader.setUniform(`${key}.value.y`, y);
        this.shader.setUniform(`${key}.value.z`, z);
        return this;
    }

    setFloat4(key, x, y, z, w) {
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

    resize(width, height) {
        width = RoundUpPowerOf2(width);
        height = RoundUpPowerOf2(height);

        var shader = this.shader;
        var rt = this.rt;

        // Free texture
        this.setTexture();

        // Set size of render texture
        rt.setSize(width, height);
        shader.setSampler2DBuffer('iChannel0', rt.glTexture, width, height, 0);

        // Set size of shader
        shader.setSize(width, height);
        // Free old texture
        shader.renderer.deleteFramebuffer(shader.framebuffer);
        shader.texture.destroy();
        shader.framebuffer = null;
        shader.glTexture = null;
        shader.texture = null;
        // call shader.setRenderToTexture again
        shader.renderToTexture = false;
        var textureKey = `el${Date.now()}`; // Create new gl texture
        shader.setRenderToTexture(textureKey, true);

        // Set new texture to image
        this.setTexture(textureKey);
        return this;
    }

    onWindowResize() {

        // Get new window size
        var width = this.scene.sys.scale.width;
        var height = this.scene.sys.scale.height;
        this.resize(width, height);
    }
}

export default EffectLayer;