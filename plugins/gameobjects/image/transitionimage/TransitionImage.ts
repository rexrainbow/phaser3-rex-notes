import Container from '../../container/containerlite/ContainerLite';
import Methods from './methods/Methods';
import {
    OnStart as DefaultOnStart,
    OnProgress as DefaultOnProgress,
    OnComplete as DefaultOnComplete
} from './methods/CrossFadeTransition';
import OnTextureChange from './methods/OnTextureChange';
import FitImages from './methods/FitImages';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

class TransitionImage extends Container {
    backImage: any;
    dir: any;
    frontImage: any;
    getChildLocalScaleX: any;
    scaleMode: any;
    setChildLocalScale: any;

    _flipX: any;
    _flipY: any;
    _t: any;
    _tint: any;
    addMultiple: any;
    cellImages: any;
    currentTransitionMode: any;
    easeValueTask: any;
    emit: any;
    ignoreCompleteEvent: any;
    ignoreDestroy: any;
    images: any;
    imagesPool: any;
    maskGameObject: any;
    onCompleteCallback: any;
    onCompleteCallbackScope: any;
    onProgressCallback: any;
    onProgressCallbackScope: any;
    onStartCallback: any;
    onStartCallbackScope: any;
    scene: any;
    setMaskEnable: any;
    setMaskGameObject: any;
    transitionModes: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, texture?: any, frame?: any, config?: any) {
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
        if (maskGameObject?: any) {
            this.setMaskGameObject(maskGameObject);
        }
        this.setMaskEnable(false);

        this.ignoreCompleteEvent = false;

        OnTextureChange.call(this, this.frontImage);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
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

    setTint(value?: any) {
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

    setFlipX(value?: any) {
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

    setFlipY(value?: any) {
        this.flipY = value;
        return this;
    }

    toggleFlipY() {
        this.flipY = !this.flipY;
        return this;
    }

    setFlip(flipX?: any, flipY?: any) {
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

    setT(value?: any) {
        this.t = value;
        return this;
    }

    get isRunning() {
        return (this.easeValueTask) ? this.easeValueTask.isRunning : false;
    }

    setOrigin(originX?: any, originY?: any) {
        super.setOrigin(originX, originY);

        this.backImage.setOrigin(originX, originY);
        this.frontImage.setOrigin(originX, originY);

        if (this.maskGameObject) {
            this.maskGameObject.setOrigin(originX, originY);
        }

        return this;
    }

    setTexture(texture?: any, frame?: any) {
        // Without transition
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);

        OnTextureChange.call(this, this.frontImage);

        return this;
    }

    setSize(width?: any, height?: any) {
        super.setSize(width, height);

        if (this.scaleMode) {
            FitImages.call(this);
        }

        return this;
    }
}

var RunCallback = function(callback?: any, scope?: any, parent?: any, currentImage?: any, nextImage?: any, t?: any) {
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

    if (scope?: any) {
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