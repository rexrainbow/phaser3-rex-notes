import DefaultMaskGraphics from '../../../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics';
import { SetMask, ClearMask } from '../../../../utils/mask/MaskMethods';

export default {
    setMaskGameObject(gameObject?: any) {
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

    removeMaskGameObject(destroyMaskGameObject?: any) {
        if (destroyMaskGameObject === undefined) {
            destroyMaskGameObject = true;
        }

        ClearMask(this.backImage);
        ClearMask(this.frontImage);
        this.remove(this.maskGameObject, destroyMaskGameObject);
        this.maskGameObject = undefined;
        return this;
    },

    setImageMaskEnable(gameObject?: any, enable?: any, invertAlpha?: any) {
        if (enable === undefined) {
            enable = true;
        }
        if (invertAlpha === undefined) {
            invertAlpha = false;
        }

        if (enable?: any) {
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

    setCurrentImageMaskEnable(enable?: any, invertAlpha?: any) {
        this.setImageMaskEnable(this.currentImage, enable, invertAlpha);
        return this;
    },

    setNextImageMaskEnable(enable?: any, invertAlpha?: any) {
        this.setImageMaskEnable(this.nextImage, enable, invertAlpha);
        return this;
    },

    setCellImagesMaskEnable(enable?: any, invertAlpha?: any) {
        var cellImages = this.getCellImages();
        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            this.setImageMaskEnable(cellImages[i], enable, invertAlpha);
        }
        return this;
    },

    setMaskEnable(enable?: any, invertAlpha?: any) {
        this.setImageMaskEnable(this.backImage, enable, invertAlpha);
        this.setImageMaskEnable(this.frontImage, enable, invertAlpha);
        this.setCellImagesMaskEnable(enable, invertAlpha);
        return this;
    }
}