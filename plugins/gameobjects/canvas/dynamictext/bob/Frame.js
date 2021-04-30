import Base from './Base.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Frame extends Base {
    constructor(
        parent,
        key, frame,
        config
    ) {
        super(parent, 'frame');
        this.setTexture(key, frame);
    }

    get scene() {
        return this.parent.scene;
    }

    setTexture(key, frame) {
        this.key = key;
        this.frame = frame;

        this.frameObj = this.scene.textures.getFrame(key, frame);
        this.width = this.frameObj.cutWidth;
        return this;
    }

    draw() {
        if (!this.visible) {
            return this;
        }

        var frame = this.frameObj;

        var context = this.context;
        context.save();

        var x = this.x,
            y = this.y - frame.cutHeight;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        context.translate(x, y);
        context.rotate(this.rotation);

        context.drawImage(
            frame.source.image,              // image
            frame.cutX, frame.cutY,          // sx, sy
            frame.cutWidth, frame.cutHeight, // sWidth, sHeight
        );

        context.restore();
    }

}

export default Frame