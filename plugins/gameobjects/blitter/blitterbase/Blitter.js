import Render from './render/Render.js';
import Bob from './Bob.js';

const GameObject = Phaser.GameObjects.GameObject;
const Frame = Phaser.Textures.Frame;
const List = Phaser.Structs.List;

class Blitter extends GameObject {
    constructor(scene, x, y, texture, frame) {
        super(scene, 'Blitter');

        this.setTexture(texture, frame);
        this.setPosition(x, y);
        this.initPipeline();

        this.children = new List();

        this.renderList = [];

        this.dirty = false;
    }

    create(x, y, frame, visible, index) {
        if (visible === undefined) { visible = true; }
        if (index === undefined) { index = this.children.length; }

        if (frame === undefined) {
            frame = this.frame;
        }
        else if (!(frame instanceof Frame)) {
            frame = this.texture.get(frame);
        }

        var bob = new Bob(this, x, y, frame, visible);

        this.children.addAt(bob, index, false);

        this.dirty = true;

        return bob;
    }

    createFromCallback(callback, quantity, frame, visible) {
        var bobs = this.createMultiple(quantity, frame, visible);

        for (var i = 0; i < bobs.length; i++) {
            var bob = bobs[i];

            callback.call(this, bob, i);
        }

        return bobs;
    }

    createMultiple(quantity, frame, visible) {
        if (frame === undefined) { frame = this.frame.name; }
        if (visible === undefined) { visible = true; }

        if (!Array.isArray(frame)) {
            frame = [frame];
        }

        var bobs = [];
        var _this = this;

        frame.forEach(function (singleFrame) {
            for (var i = 0; i < quantity; i++) {
                bobs.push(_this.create(0, 0, singleFrame, visible));
            }
        });

        return bobs;
    }

    childCanRender(child) {
        return (child.visible && child.alpha > 0);
    }

    getRenderList() {
        if (this.dirty) {
            this.renderList = this.children.list.filter(this.childCanRender, this);
            this.dirty = false;
        }

        return this.renderList;
    }

    clear() {
        this.children.removeAll();
        this.dirty = true;
    }

    preDestroy() {
        this.children.destroy();

        this.renderList = [];
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(
    Blitter,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Mask,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Size,
        Components.Texture,
        Components.Transform,
        Components.Visible,
        Render
    ]
)

export default Blitter;
