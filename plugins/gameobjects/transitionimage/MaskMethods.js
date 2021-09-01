import DefaultMaskGraphics from '../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics.js';

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

        this.maskGameObject = gameObject;
        this.maskGameObject
            .resize(this.width, this.height)
            .setOrigin(this.originX, this.originY)
            .setPosition(0, 0)
            .setScale(1)
            .setVisible(false)
        this.addLocal(this.maskGameObject);

        this.childrenMask = this.maskGameObject.createGeometryMask();
        return this;
    },

    removeMaskGameObject() {
        this.backImage.clearMask();
        this.frontImage.clearMask();
        this.childrenMask = undefined;
        this.remove(this.maskGameObject, true);
        this.maskGameObject = undefined;
        return this;
    },

    setCurrentImageMaskEnable(enable, invertAlpha) {
        if (enable === undefined) {
            enable = true;
        }

        // Use DefaultMaskGraphics if not given
        if (!this.childrenMask) {
            this.setMaskGameObject(true);
        }

        if (enable) {
            this.currentImage.setMask(this.childrenMask);
            if (invertAlpha) {
                this.childrenMask.setInvertAlpha();
            }
        } else {
            this.currentImage.clearMask();
        }

        return this;
    },

    setNextImageMaskEnable(enable, invertAlpha) {
        if (enable === undefined) {
            enable = true;
        }

        // Use DefaultMaskGraphics if not given
        if (!this.childrenMask) {
            this.setMaskGameObject(true);
        }

        if (enable) {
            this.nextImage.setMask(this.childrenMask);
            if (invertAlpha) {
                this.childrenMask.setInvertAlpha();
            }
        } else {
            this.nextImage.clearMask();
        }

        return this;
    },

    setMaskEnable(enable, invertAlpha) {
        if (enable === undefined) {
            enable = true;
        }

        // Use DefaultMaskGraphics if not given
        if (!this.childrenMask) {
            this.setMaskGameObject(true);
        }

        if (enable) {
            this.backImage.setMask(this.childrenMask);
            this.frontImage.setMask(this.childrenMask);
            if (invertAlpha) {
                this.childrenMask.setInvertAlpha();
            }
        } else {
            this.backImage.clearMask();
            this.frontImage.clearMask();
        }

        return this;
    }
}