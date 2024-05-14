import Container from '../containerlite/ContainerLite.js';
import Methods from './methods/Methods.js';
import {
    OnStart as DefaultOnStart,
    OnProgress as DefaultOnProgress,
    OnComplete as DefaultOnComplete
} from './methods/CrossFadeTransition.js';
import OnTextureChange from './methods/OnTextureChange.js';
import FitImages from './methods/FitImages.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class TransitionImage extends Container {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(frame)) {
            config = frame;
            frame = undefined;
        }

        var backImage = GetValue(config, 'back', undefined);
        var frontImage = GetValue(config, 'front', undefined);
        if (!backImage) {
            backImage = scene.add.image(x, y, texture, frame);
        }
        if (!frontImage) {
            frontImage = scene.add.image(x, y, texture, frame);
        }

        var width = GetValue(config, 'width', undefined);
        var height = GetValue(config, 'height', undefined);
        var scaleMode = ((width !== undefined) && (height !== undefined)) ? 1 : 0;

        if (width === undefined) {
            width = frontImage.width;
        }
        if (height === undefined) {
            height = frontImage.height;
        }

        super(scene, x, y, width, height);
        this.type = 'rexTransitionImage';
        this._flipX = false;
        this._flipY = false;

        scaleMode = GetValue(config, 'scaleMode', scaleMode);
        if (typeof (scaleMode) === 'string') {
            scaleMode = ScaleModeMap[scaleMode];
        }
        this.scaleMode = scaleMode;

        backImage.setVisible(false);
        this.addMultiple([backImage, frontImage])

        this.backImage = backImage;
        this.frontImage = frontImage;
        this.images = [this.backImage, this.frontImage];
        this.maskGameObject = undefined;
        this.cellImages = [];
        this.imagesPool = [];
        this.transitionModes = undefined;
        this.currentTransitionMode = undefined;

        // Transition parameters
        var onStart = GetValue(config, 'onStart', undefined);
        var onProgress = GetValue(config, 'onProgress', undefined);
        var onComplete = GetValue(config, 'onComplete', undefined);
        var dir = GetValue(config, 'dir', 0);
        if ((onStart === undefined) && (onProgress === undefined) && (onComplete === undefined)) {
            onStart = DefaultOnStart;
            onProgress = DefaultOnProgress;
            onComplete = DefaultOnComplete;
            dir = 0;
        }

        this
            .setTransitionStartCallback(
                onStart,
                GetValue(config, 'onStartScope', undefined)
            )
            .setTransitionProgressCallback(
                onProgress,
                GetValue(config, 'onProgressScope', undefined)
            )
            .setTransitionCompleteCallback(
                onComplete,
                GetValue(config, 'onCompleteScope', undefined)
            )
            .setTransitionDirection(dir)
            .setDuration(GetValue(config, 'duration', 1000))
            .setEaseFunction(GetValue(config, 'ease', 'Linear'))

        var maskGameObject = GetValue(config, 'mask', undefined);
        if (maskGameObject) {
            this.setMaskGameObject(maskGameObject);
        }
        this.setMaskEnable(false);

        this.ignoreCompleteEvent = false;

        OnTextureChange.call(this, this.frontImage);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.childrenMask) {
            this.childrenMask.destroy();
            this.childrenMask = undefined;
        }
        this.backImage = undefined;
        this.frontImage = undefined;
        this.images.length = 0;
        this.maskGameObject = undefined;
        this.cellImages.length = 0;
        this.imagesPool.length = 0;
        this.transitionModes = undefined;

        super.destroy(fromScene);

        this.onStartCallback = undefined;
        this.onStartCallbackScope = undefined;
        this.onProgressCallback = undefined;
        this.onProgressCallbackScope = undefined;
        this.onCompleteCallback = undefined;
        this.onCompleteCallbackScope = undefined;
        this.easeValueTask = undefined;
    }

    get currentImage() {
        return (this.dir === 0) ? this.frontImage : this.backImage;
    }

    get nextImage() {
        return (this.dir === 0) ? this.backImage : this.frontImage;
    }

    get texture() {
        return this.nextImage.texture;
    }

    get frame() {
        return this.nextImage.frame;
    }

    get tint() {
        return this._tint;
    }

    set tint(value) {
        if (this._tint === value) {
            return;
        }

        this._tint = value;
        this.backImage.setTint(value);
        this.frontImage.setTint(value);
    }

    setTint(value) {
        this.tint = value;
        return this;
    }

    get flipX() {
        return this._flipX;
    }

    set flipX(value) {
        if (this._flipX === value) {
            return;
        }

        this._flipX = value;
        this.backImage.setFlipX(value);
        this.frontImage.setFlipX(value);
    }

    setFlipX(value) {
        this.flipX = value;
        return this;
    }

    toggleFlipX() {
        this.flipX = !this.flipX;
        return this;
    }

    get flipY() {
        return this._flipY;
    }

    set flipY(value) {
        if (this._flipY === value) {
            return;
        }
        this._flipY = value;
        this.backImage.setFlipY(value);
        this.frontImage.setFlipY(value);
    }

    setFlipY(value) {
        this.flipY = value;
        return this;
    }

    toggleFlipY() {
        this.flipY = !this.flipY;
        return this;
    }

    setFlip(flipX, flipY) {
        this.flipX = flipX;
        this.flipY = flipY;
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

        var currentImage = this.currentImage;
        var nextImage = this.nextImage;

        // Start
        if (value === 0) {
            this
                .setChildVisible(this.frontImage, true)
                .setChildVisible(this.backImage, true)

            RunCallback.call(this,
                this.onStartCallback, this.onStartCallbackScope,
                this, currentImage, nextImage, value
            );
        }

        // Progress
        RunCallback.call(this,
            this.onProgressCallback, this.onProgressCallbackScope,
            this, currentImage, nextImage, value
        );

        // Complete
        if (value === 1) {
            RunCallback.call(this,
                this.onCompleteCallback, this.onCompleteCallbackScope,
                this, currentImage, nextImage, value
            );

            var key = nextImage.texture.key,
                frame = nextImage.frame.name;
            this.frontImage.setTexture(key, frame);
            this.backImage.setTexture(key, frame);
            OnTextureChange.call(this, nextImage);

            this
                .setChildVisible(this.frontImage, true)
                .setChildVisible(this.backImage, false)
                .setMaskEnable(false)
                .freeCellImages()
        }

        if ((value === 1) && (!this.ignoreCompleteEvent)) {
            this.emit('complete');
        }
    }

    setT(value) {
        this.t = value;
        return this;
    }

    get isRunning() {
        return (this.easeValueTask) ? this.easeValueTask.isRunning : false;
    }

    setOrigin(originX, originY) {
        super.setOrigin(originX, originY);

        this.backImage.setOrigin(originX, originY);
        this.frontImage.setOrigin(originX, originY);

        if (this.maskGameObject) {
            this.maskGameObject.setOrigin(originX, originY);
        }

        return this;
    }

    setTexture(texture, frame) {
        // Without transition
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);

        OnTextureChange.call(this, this.frontImage);

        return this;
    }

    setSize(width, height) {
        super.setSize(width, height);

        if (this.scaleMode) {
            FitImages.call(this);
        }

        return this;
    }
}

var RunCallback = function (callback, scope, parent, currentImage, nextImage, t) {
    if (!callback) {
        return;
    }

    if (this.scaleMode) {
        var localScale;
        if (currentImage.biasScale > 0) {
            localScale = this.getChildLocalScaleX(currentImage);
            localScale = localScale / currentImage.biasScale;
            this.setChildLocalScale(currentImage, localScale);
        }
        if (nextImage.biasScale) {
            localScale = this.getChildLocalScaleX(nextImage);
            localScale = localScale / nextImage.biasScale;
            this.setChildLocalScale(nextImage, localScale);
        }
    }

    if (scope) {
        callback.call(scope, parent, currentImage, nextImage, t);
    } else {
        callback(parent, currentImage, nextImage, t);
    }

    if (this.scaleMode) {
        var localScale;
        if (currentImage.biasScale > 0) {
            localScale = this.getChildLocalScaleX(currentImage);
            localScale = localScale * currentImage.biasScale;
            this.setChildLocalScale(currentImage, localScale);
        }
        if (nextImage.biasScale) {
            localScale = this.getChildLocalScaleX(nextImage);
            localScale = localScale * nextImage.biasScale;
            this.setChildLocalScale(nextImage, localScale);
        }
    }
}

// mixin
Object.assign(
    TransitionImage.prototype,
    Methods
);

const ScaleModeMap = {
    fit: 1,
    FIT: 1,
    envelop: 2,
    ENVELOP: 2
}

export default TransitionImage;