import Sizer from '../sizer/Sizer.js';
import SetDisplaySize from '../../../plugins/utils/size/SetDisplaySize.js';
import Methods from './methods/Methods.js';

class LabelBase extends Sizer {
    /*
    Elements in childrenMap: 
    
    - background
    - icon
    - text, 
    - action
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
        if (!imageObject) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if (this.iconWidth !== undefined) {
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
        if (imageObject === undefined) {
            return this;
        }
        imageObject.setTexture(key, frame);

        if (this.actionWidth !== undefined) {
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
        if (icon && (this.iconWidth !== undefined)) {
            SetDisplaySize(icon, this.iconWidth, this.iconHeight);
        }

        var action = this.childrenMap.action;
        if (action && (this.actionWidth !== undefined)) {
            SetDisplaySize(action, this.actionWidth, this.actionHeight);
        }

        super.preLayout();
    }
}

Object.assign(
    LabelBase.prototype,
    Methods,
)

export default LabelBase;