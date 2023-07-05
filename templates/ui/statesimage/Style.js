import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';

class Style extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
    }

    setStyle(style) {
        for (var name in style) {
            this[name] = style[name];
        }
        return this;
    }

    get key() {
        return this.parent.texture.key;
    }

    set key(value) {
        this.parent.setTexture(value, this.frame);
    }

    get frame() {
        return this.parent.frame.name;
    }

    set frame(value) {
        this.parent.setFrame(value);
    }

    get tint() {
        return this.parent.tint;
    }

    set tint(value) {
        this.parent.tint = value;
    }

    get tintR() {
        return this.parent.tintR;
    }

    set tintR(value) {
        this.parent.tintR = value;
    }

    get tintG() {
        return this.parent.tintG;
    }

    set tintG(value) {
        this.parent.tintG = value;
    }

    get tintB() {
        return this.parent.tintB;
    }

    set tintB(value) {
        this.parent.tintB = value;
    }

    get tintGray() {
        return this.parent.tintGray;
    }

    set tintGray(value) {
        this.parent.tintGray = value;
    }

}

export default Style;