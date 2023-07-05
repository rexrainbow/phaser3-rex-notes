import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';

class Style extends ComponentBase {
    constructor(gameObject, style) {
        super(gameObject);
        // this.parent = gameObject;
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

    get scale() {
        return this.parent.scaleX;
    }

    set scale(value) {
        this.parent.setScale(value);
    }

    get tint() {
        return this.parent.tint;
    }

    set tint(value) {
        this.parent.tint = value;
    }
}

export default Style;