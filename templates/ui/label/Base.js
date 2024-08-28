import Sizer from '../sizer/Sizer.js';
import SetDisplaySize from '../../../plugins/utils/size/SetDisplaySize.js';
import Methods from './methods/Methods.js';

class LabelBase extends Sizer {
    /*
    Elements in childrenMap: 
    
    - background
    - icon, iconMask
    - text, 
    - action, actionMask
    */

    // Access text game object
    get text() {
        var textObject = this.childrenMap.text;
        if (!textObject) {
            return '';
        }
        return textObject.text;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (!textObject) {
            return;
        }
        textObject.setText(value);
    }

    setText(value) {
        this.text = value;
        return this;
    }

    // Access icon game object
    setIconTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (!imageObject || !imageObject.setTexture) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if ((this.iconWidth !== undefined) && (this.iconHeight !== undefined)) {
            SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
            this.resetChildScaleState(imageObject);
        }

        return this;
    }

    setTexture(key, frame) {
        this.setIconTexture(key, frame);
        return this;
    }

    setIconSize(width, height) {
        if (height === undefined) {
            height = width;
        }

        this.iconWidth = width;
        this.iconHeight = height;

        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (!imageObject) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (!imageObject) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionTexture(key, frame) {
        var imageObject = this.childrenMap.action;
        if (!imageObject || !imageObject.setTexture) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if ((this.actionWidth !== undefined) && (this.actionHeight !== undefined)) {
            SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
            this.resetChildScaleState(imageObject);
        }

        return this;
    }

    get actionTexture() {
        var imageObject = this.childrenMap.action;
        if (!imageObject) {
            return undefined;
        }
        return imageObject.texture;
    }

    get actionFrame() {
        var imageObject = this.childrenMap.action;
        if (!imageObject) {
            return undefined;
        }
        return imageObject.frame;
    }

    setActionSize(width, height) {
        if (height === undefined) {
            height = width;
        }

        this.actionWidth = width;
        this.actionHeight = height;

        return this;
    }

    preLayout() {
        var icon = this.childrenMap.icon;
        if (icon && (this.iconWidth !== undefined) && (this.iconHeight !== undefined)) {
            SetDisplaySize(icon, this.iconWidth, this.iconHeight);
        }

        var action = this.childrenMap.action;
        if (action && (this.actionWidth !== undefined) && (this.actionHeight !== undefined)) {
            SetDisplaySize(action, this.actionWidth, this.actionHeight);
        }

        super.preLayout();
    }

    postLayout(parent, newWidth, newHeight) {
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        super.postLayout(parent, newWidth, newHeight);
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }
}

Object.assign(
    LabelBase.prototype,
    Methods,
)

export default LabelBase;