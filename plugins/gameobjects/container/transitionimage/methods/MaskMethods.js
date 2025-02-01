import DefaultMaskGraphics from '../../../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics.js';
import { SetMask, ClearMask } from '../../../../utils/mask/MaskMethods.js';

export default {
    setMaskGameObject(gameObject) {
        if (!gameObject) {
            this.removeMaskGameObject();
            return this;
        }

        if (this.maskGameObject) {
            if ((gameObject === true) && (this.maskGameObject instanceof DefaultMaskGraphics)) {
                return this;
            }
            if (this.maskGameObject === gameObject) {
                return this;
            }

            // Remove previous Mask Game Object
            this.removeMaskGameObject();
        }

        // Add new Mask Game Object
        if (gameObject === true) {
            gameObject = new DefaultMaskGraphics(this);
        }

        gameObject
            .resize(this.width, this.height)
            .setOrigin(this.originX, this.originY)
            .setPosition(0, 0)
            .setScale(1)
            .setVisible(false)
        this.addLocal(gameObject);
        this.maskGameObject = gameObject;

        return this;
    },

    removeMaskGameObject(destroyMaskGameObject) {
        if (destroyMaskGameObject === undefined) {
            destroyMaskGameObject = true;
        }

        ClearMask(this.backImage);
        ClearMask(this.frontImage);
        this.remove(this.maskGameObject, destroyMaskGameObject);
        this.maskGameObject = undefined;
        return this;
    },

    setImageMaskEnable(gameObject, enable, invertAlpha) {
        if (enable === undefined) {
            enable = true;
        }
        if (invertAlpha === undefined) {
            invertAlpha = false;
        }

        if (enable) {
            // Use DefaultMaskGraphics if not given
            if (!this.maskGameObject) {
                this.setMaskGameObject(true);
            }
            SetMask(gameObject, this.maskGameObject, invertAlpha);

        } else {
            ClearMask(gameObject);
        }

        return this;
    },

    setCurrentImageMaskEnable(enable, invertAlpha) {
        this.setImageMaskEnable(this.currentImage, enable, invertAlpha);
        return this;
    },

    setNextImageMaskEnable(enable, invertAlpha) {
        this.setImageMaskEnable(this.nextImage, enable, invertAlpha);
        return this;
    },

    setCellImagesMaskEnable(enable, invertAlpha) {
        var cellImages = this.getCellImages();
        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            this.setImageMaskEnable(cellImages[i], enable, invertAlpha);
        }
        return this;
    },

    setMaskEnable(enable, invertAlpha) {
        this.setImageMaskEnable(this.backImage, enable, invertAlpha);
        this.setImageMaskEnable(this.frontImage, enable, invertAlpha);
        this.setCellImagesMaskEnable(enable, invertAlpha);
        return this;
    }
}