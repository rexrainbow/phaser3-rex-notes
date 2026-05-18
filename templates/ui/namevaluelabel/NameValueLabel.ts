import Sizer from '../sizer/Sizer';
import Build from './methods/Build';
import SetValueMethods from './methods/SetValueMethods';

class NameValueLabel extends Sizer {
    childrenMap: any;
    resetChildPositionState: any;
    setEaseValueDuration: any;
    type: any;

    constructor(scene?: any, config?: any) {
        // Create sizer
        super(scene, config);
        this.type = 'rexNameValueLabel';

        Build.call(this, scene, config);

        this.setEaseValueDuration(1000);
    }

    // Access nameText game object
    get nameText() {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set nameText(value) {
        var textObject = this.childrenMap.name;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setNameText(value?: any) {
        this.nameText = value;
        return this;
    }

    // Access valueText game object
    get valueText() {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return '';
        }
        return textObject.text;
    }

    set valueText(value) {
        var textObject = this.childrenMap.value;
        if (textObject === undefined) {
            return;
        }
        textObject.setText(value);
    }

    setValueText(value?: any) {
        this.valueText = value;
        return this;
    }

    // Accrss bar game object
    get barValue() {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return;
        }
        return bar.value;
    }

    set barValue(value) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return;
        }
        bar.setValue(value);
    }

    setBarValue(value?: any, min?: any, max?: any) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return this;
        }
        bar.setValue(value, min, max);
        return this;
    }

    easeBarValueTo(value?: any, min?: any, max?: any) {
        var bar = this.childrenMap.bar;
        if (bar === undefined) {
            return this;
        }
        bar.easeValueTo(value, min, max);
        return this;
    }

    // Access icon game object
    setTexture(key?: any, frame?: any) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return;
        }
        imageObject.setTexture(key, frame);
        return this;
    }

    get texture() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.texture;
    }

    get frame() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
            return undefined;
        }
        return imageObject.frame;
    }

    postLayout(parent?: any, newWidth?: any, newHeight?: any) {
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask?: any) {
            iconMask.setPosition();
            this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask?: any) {
            actionMask.setPosition();
            this.resetChildPositionState(actionMask);
        }
        super.postLayout(parent, newWidth, newHeight);
        return this;
    }

    resize(width?: any, height?: any) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask?: any) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask?: any) {
            actionMask.resize();
        }
        return this;
    }
}

Object.assign(
    NameValueLabel.prototype,
    SetValueMethods,
)

export default NameValueLabel;