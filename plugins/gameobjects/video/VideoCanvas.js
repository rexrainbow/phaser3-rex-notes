import GetBaseClass from './GetBaseClass.js';
import Canvas from '../canvas/Canvas.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class VideoCanvas extends GetBaseClass(Canvas) {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }

        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height;
        }

        super(scene, x, y, width, height);
        this.type = 'rexVideoCanvas';

        this.createVideoElement(config);
        this.load(GetValue(config, 'src', ''));
        this.boot();
    }

    boot() {
        this.scene.events.on('preupdate', this.preupdate, this);
        return this;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.scene.events.off('preupdate', this.preupdate, this);
        super.destroy(fromScene);
    }

    preupdate(time, delta) {
        var width = this.canvas.width,
            height = this.canvas.height;

        if (this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(this.video, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        } else {
            this.context.drawImage(this.video, 0, 0, width, height);
        }
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }
        this.video.width = width;
        this.video.height = height;
        super.resize(width, height);
        return this;
    }
}
export default VideoCanvas;