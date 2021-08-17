import Container from '../containerlite/ContainerLite.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class TransitionImage extends Container {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'key', '');
            frame = GetValue(config, 'frame', '');
        }

        var backImage = scene.add.image(x, y, texture, frame).setVisible(false);
        var frontImage = scene.add.image(x, y, texture, frame);
        super(scene, x, y, frontImage.width, frontImage.height, [backImage, frontImage]);
        this.type = 'rexTransitionImage';
        this.backImage = backImage;
        this.frontImage = frontImage;
        this.setDuration(GetValue(config, 'duration', 1000));
        this.setTransitionStartCallbacks(
            GetValue(config, 'onStart', undefined),
            GetValue(config, 'onStartScope', undefined)
        );
        this.setTransitionProgressCallbacks(
            GetValue(config, 'onProgress', undefined),
            GetValue(config, 'onProgressScope', undefined)
        );
        this.setTransitionCompleteCallbacks(
            GetValue(config, 'onComplete', undefined),
            GetValue(config, 'onCompleteScope', undefined)
        );
        this._t = 0;
    }

    get texture() {
        return this.backImage.texture;
    }

    get frame() {
        return this.backImage.frame;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    get t() {
        return this._t;
    }

    set t(value) {
        this._t = Clamp(value, 0, 1);
    }

    setTransitionStartCallbacks(callback, scope) {
        this.onStartCallback = callback;  // function(frontImage, backImage) {}
        this.onStartCallbackScope = scope;
        return this;
    }

    setTransitionProgressCallback(callback, scope) {
        this.onProgressCallback = callback;  // function(frontImage, backImage, t) {}
        this.onProgressCallbackScope = scope;
        return this;
    }

    setTransitionCompleteCallback(callback, scope) {
        this.onCompleteCallback = callback; // function(frontImage, backImage) {}
        this.onProgressCallbackScope = scope;
        return this;
    }

    setOrigin(originX, originY) {
        this.changeOrigin(originX, originY);
        return this;
    }

    setTexture(texture, frame, duration) {
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);
        return this;
    }

    onComplete() {
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);
    }
}

export default TransitionImage;