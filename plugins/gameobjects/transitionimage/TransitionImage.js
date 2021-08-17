import Container from '../containerlite/ContainerLite.js';
import SetTransitionCallbackMethods from './SetTransitionCallbackMethods.js';
import TransitionMethods from './TransitionMethods.js';
import {
    OnStart as DefaultOnStart,
    OnProgress as DefaultOnProgress,
    OnComplete as DefaultOnComplete
} from './DefaultTransitionCallbacks.js';


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
        // Size is equal to initial texture size
        var width = GetValue(config, 'width', frontImage.width);
        var height = GetValue(config, 'height', frontImage.height);
        super(scene, x, y, width, height, [backImage, frontImage]);

        this.type = 'rexTransitionImage';
        this.backImage = backImage;
        this.frontImage = frontImage;

        // Transition parameters
        var onStart = GetValue(config, 'onStart', undefined);
        var onProgress = GetValue(config, 'onProgress', undefined);
        var onComplete = GetValue(config, 'onCompleteScope', undefined);
        if ((onStart === undefined) && (onProgress === undefined) && (onComplete === undefined)) {
            onStart = DefaultOnStart;
            onProgress = DefaultOnProgress;
            onComplete = DefaultOnComplete;
        }

        this.setTransitionStartCallback(
            onStart,
            GetValue(config, 'onStartScope', undefined)
        );
        this.setTransitionProgressCallback(
            onProgress,
            GetValue(config, 'onProgressScope', undefined)
        );
        this.setTransitionCompleteCallback(
            onComplete,
            GetValue(config, 'onCompleteScope', undefined)
        );

        this.setDuration(GetValue(config, 'duration', 1000));
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy(fromScene);

        this.backImage = undefined;
        this.frontImage = undefined;
        this.onStartCallback = undefined;
        this.onStartCallbackScope = undefined;
        this.onProgressCallback = undefined;
        this.onProgressCallbackScope = undefined;
        this.onCompleteCallback = undefined;
        this.onCompleteCallbackScope = undefined;
        this.easeValueTask = undefined;
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
        value = Clamp(value, 0, 1);
        if (this._t === value) {
            return;
        }
        this._t = value;

        if (value === 0) {
            RunCallback(
                this.onStartCallback, this.onStartCallbackScope,
                this.frontImage, this.backImage, value
            );
        }

        RunCallback(
            this.onProgressCallback, this.onProgressCallbackScope,
            this.frontImage, this.backImage, value
        );

        if (value === 1) {
            RunCallback(
                this.onCompleteCallback, this.onCompleteCallbackScope,
                this.frontImage, this.backImage, value
            );

            this.frontImage.setTexture(this.texture.key, this.frame.name);
            this.backImage.setVisible(false);
        }

        this
            .resetChildState(this.frontImage)
            .resetChildState(this.backImage);

        if (value === 1) {
            this.emit('complete');
        }
    }

    setT(value) {
        this.t = value;
        return this;
    }

    setOrigin(originX, originY) {
        super.setOrigin(originX, originY);
        this.frontImage.setOrigin(originX, originY);
        this.backImage.setOrigin(originX, originY);
        return this;
    }

    setTexture(texture, frame) {
        // Without transition
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);
        return this;
    }
}

var RunCallback = function (callback, scope, frontImage, backImage, t) {
    if (scope) {
        callback.callback(scope, frontImage, backImage, t);
    } else {
        callback(frontImage, backImage, t);
    }
}

// mixin
Object.assign(
    TransitionImage.prototype,
    SetTransitionCallbackMethods,
    TransitionMethods
);

export default TransitionImage;