import Container from '../../container/containerlite/ContainerLite';
import CreateRectangle from '../../../utils/gameobject/build/CreateRectangle';
import FlipMethods from '../../container/utils/FlipMethods';
import FitToSize from '../../../utils/size/FitTo';
import ResizeGameObject from '../../../utils/size/ResizeGameObject';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class ImageBoxBase extends Container {
    background: any;
    image: any;

    _colorBottomLeft: any;
    _colorBottomRight: any;
    _colorTopLeft: any;
    _colorTopRight: any;
    _flipX: any;
    _flipY: any;
    add: any;
    displayHeight: any;
    displayWidth: any;
    height: any;
    originX: any;
    originY: any;
    resetChildScaleState: any;
    scaleUp: any;
    scaleX: any;
    scaleY: any;
    scene: any;
    setChildVisible: any;
    width: any;
    x: any;
    y: any;


    setBackground(background?: any) {
        if (IsPlainObject(background)) {
            background = CreateRectangle(this.scene, background);
            this.scene.add.existing(background);
        }
        if (background?: any) {
            this.add(background);
        }
        this.background = background;
        return this;
    }

    setImage(image?: any) {
        if (!image) {
            image = this.scene.add.image(this.x, this.y);
        } else {
            image.setPosition(this.x, this.y).setOrigin(0.5);
        }
        this.add(image);
        this.image = image;

        this.image.setFlipX(this.flipX).setFlipY(this.flipY);
        if (this._colorTopLeft !== undefined) {
            this.image.setTint(this._colorTopLeft, this._colorTopRight, this._colorBottomLeft, this._colorBottomRight);
        }
        return this;
    }

    get texture() {
        return this.image.texture;
    }

    get frame() {
        return this.image.frame;
    }

    get flipX() {
        return this._flipX;
    }

    set flipX(value) {
        if (this._flipX === value) {
            return;
        }

        this._flipX = value;
        this.image.setFlipX(value);
    }

    get flipY() {
        return this._flipY;
    }

    set flipY(value) {
        if (this._flipY === value) {
            return;
        }
        this._flipY = value;
        this.image.setFlipY(value);
    }

    set tint(value) {
        this.image.tint = value;
    }

    get isTinted() {
        return this.image.isTinted;
    }

    setTint(colorTopLeft?: any, colorTopRight?: any, colorBottomLeft?: any, colorBottomRight?: any) {
        this._colorTopLeft = colorTopLeft;
        this._colorTopRight = colorTopRight;
        this._colorBottomLeft = colorBottomLeft;
        this._colorBottomRight = colorBottomRight;
        this.image.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
        return this;
    }

    resizeBackground() {
        var background = this.background;
        if (!background) {
            return this;
        }

        background.setOrigin(this.originX, this.originY);
        background.setPosition(this.x, this.y);
        ResizeGameObject(background, this.displayWidth, this.displayHeight);
        this.resetChildScaleState(background);
        return this;
    }

    scaleImage() {
        var image = this.image;

        if ((!this.scaleUp) &&
            (image.width <= this.width) && (image.height <= this.height)
        ) {
            return this;
        }

        var result = FitToSize(image, this, 'FIT', true);
        image.setDisplaySize(result.width * this.scaleX, result.height * this.scaleY);
        this.resetChildScaleState(image);
        return this;
    }

    resize(width?: any, height?: any) {
        super.resize(width, height);

        this.resizeBackground();
        this.scaleImage();
        return this;
    }

    setTexture(texture?: any, frame?: any) {
        var image = this.image;
        image.setTexture(texture, frame);

        if (texture?: any) {
            this.setChildVisible(image, true);
            this.scaleImage();

        } else {
            this.setChildVisible(image, false);

        }
        return this;
    }
}

Object.assign(
    ImageBoxBase.prototype,
    FlipMethods,
)

export default ImageBoxBase;