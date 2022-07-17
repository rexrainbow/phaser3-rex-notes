import TextBase from '../textbase/TextBase.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const AddToDOM = Phaser.DOM.AddToDOM;
const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const GameObject = Phaser.GameObjects.GameObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;

class CanvasInput extends TextBase {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }

        super(scene, 'rexCanvasInput');

        this.renderer = scene.sys.game.renderer;

        this.setPosition(x, y);
        this.setOrigin(0, 0);
        this.initPipeline();

        this.canvas = CanvasPool.create(this);

        this.context = this.canvas.getContext('2d');

        this.style = new TextStyle(this, config);

        this.autoRound = true;

        this.width = 1;

        this.height = 1;

        this.dirty = false;

        //  If resolution wasn't set, force it to 1
        if (this.style.resolution === 0) {
            this.style.resolution = 1;
        }

        this._crop = this.resetCropObject();

        //  Create a Texture for this Text object
        this.texture = scene.sys.textures.addCanvas(null, this.canvas, true);

        //  Get the frame
        this.frame = this.texture.get();

        //  Set the resolution
        this.frame.source.resolution = this.style.resolution;

        if (this.renderer.gl) {
            //  Clear the default 1x1 glTexture, as we override it later

            this.renderer.deleteTexture(this.frame.source.glTexture);

            this.frame.source.glTexture = null;
        }

        this.initRTL();

        scene.sys.game.events.on('contextrestored', this.onContextRestored, this);
    }

    onContextRestored() {
        this.dirty = true;
    }

    preDestroy() {
        if (this.style.rtl) {
            RemoveFromDOM(this.canvas);
        }

        this.scene.sys.game.events.off('contextrestored', this.onContextRestored, this);

        CanvasPool.remove(this.canvas);

        this.texture.destroy();
    }

    initRTL() {
        if (!this.style.rtl) {
            return;
        }

        //  Here is where the crazy starts.
        //
        //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
        //  that is not part of the DOM. It just completely ignores the direction property.

        this.canvas.dir = 'rtl';

        //  Experimental atm, but one day ...
        this.context.direction = 'rtl';

        //  Add it to the DOM, but hidden within the parent canvas.
        this.canvas.style.display = 'none';

        AddToDOM(this.canvas, this.scene.sys.canvas);

        //  And finally we set the x origin
        this.originX = 1;
    }

}

Object.assign(
    CanvasInput.prototype,
    Render
)

export default CanvasInput;